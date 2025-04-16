from flask import Flask, request, jsonify
from transformers import pipeline, set_seed
import re
import json

app = Flask(__name__)

generator = pipeline('text-generation', model='gpt2')
set_seed(42)

FEW_SHOT_PROMPT = """
Convert this to a MongoDB query and respond ONLY with a JSON object with key 'query'.

Example 1:
Input: Find all electronics cheaper than 500
Output: {"query": "Electronics.find({'price': {'$lt': 500}})"}

Example 2:
Input: Show food items with price equal to 300
Output: {"query": "Food.find({'price': 300})"}

Example 3:
Input: List groceries more expensive than 1000
Output: {"query": "Groceries.find({'price': {'$gt': 1000}})"}

Now do:
Input: {user_input}
Output:
"""

def generate_query_hf(sentence):
    try:
        prompt = FEW_SHOT_PROMPT.format(user_input=sentence)
        response = generator(prompt, max_length=150, num_return_sequences=1, pad_token_id=50256)
        generated_text = response[0]['generated_text']

        matches = re.findall(r'\{"query":\s*".*?"\}', generated_text, re.DOTALL)
        if matches:
            return json.loads(matches[-1])

        return {"query": "Failed to generate valid MongoDB query."}

    except Exception as e:
        return {"query": f"Error generating query: {str(e)}"}

@app.route("/generate-query", methods=["POST"])
def generate_query():
    data = request.get_json()
    sentence = data.get("sentence", "")
    result = generate_query_hf(sentence)
    return jsonify(result)

if __name__ == "__main__":
    app.run(port=8082)
