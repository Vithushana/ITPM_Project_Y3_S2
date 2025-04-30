from flask import Flask, request, jsonify
import re
from datetime import datetime

app = Flask(__name__)

def identify_entity(sentence):
    """Identifies the entity (category) in a sentence."""
    entities = ['electronics', 'medicine', 'groceries', 'food']
    for entity in entities:
        if entity in sentence.lower():
            return entity.capitalize()
    return None

def generate_electronics_query(sentence):
    """Generates a Mongoose query for electronics based on the sentence."""
    filters = {}

    # Price conditions
    if match := re.search(r"cheaper than (\d+)", sentence):                   # get electronics cheaper than 500
        filters["price"] = {"$lt": int(match.group(1))}
    elif match := re.search(r"more than (\d+)", sentence):                    # get electronics more than 500
        filters["price"] = {"$gt": int(match.group(1))}

    # Quantity / Stock
    if match := re.search(r"(?:stock|quantity) (?:less|under) than (\d+)", sentence):        # Find electronics with stock less than 15
        filters["quantity"] = {"$lt": int(match.group(1))}
    elif match := re.search(r"(?:stock|quantity) (?:more|over) than (\d+)", sentence):       # Show me electronics with quantity over than 15
        filters["quantity"] = {"$gt": int(match.group(1))}

    # Category
    if match := re.search(r"in category (\w+)", sentence):          # Find all electronics in category Displays
        filters["category"] = match.group(1).capitalize()

    # Name contains
    if match := re.search(r"name.*(?:containing|with|includes) (\w+)", sentence):          # Find electronics with name containing Wireless
        filters["name"] = {"$regex": match.group(1), "$options": "i"}

    # Usage
    if match := re.search(r"for (\w+)", sentence):
        filters["usage"] = {"$regex": match.group(1), "$options": "i"}

    # Date
    if match := re.search(r"after (\d{4})", sentence):
        filters["addedDate"] = {"$gt": {"$date": f"{match.group(1)}-01-01T00:00:00Z"}}

    return f"Electronics.find({filters})" if filters else "// Could not parse condition for Electronics"

def generate_medicine_query(sentence):
    """Generates a Mongoose query for medicine based on the sentence."""
    filters = {}
    today = datetime.now().strftime("%Y-%m-%d")

    # Illness type                                                           # show me medicines for pain
    if match := re.search(r"for (\w+)", sentence):
        filters["illnessType"] = {"$regex": match.group(1), "$options": "i"}

    # Availability                                                           # show me available medicines
    if re.search(r"(available|in stock)", sentence):
        filters["available"] = True
    elif re.search(r"(not available|out of stock)", sentence):
        filters["available"] = False

    # Expiry                                                                 # show me medicines expired
    if re.search(r"expired", sentence):
        filters["expirationDate"] = {"$lt": today}
    elif re.search(r"not expired", sentence):
        filters["expirationDate"] = {"$gte": today}
    elif match := re.search(r"expires (before|after) (\d{4}-\d{2}-\d{2})", sentence):
        operator = "$lt" if match.group(1) == "before" else "$gt"
        filters["expirationDate"] = {operator: match.group(2)}

    # Category                                                               # Are there any medicines in category Vitamins available?
    if match := re.search(r"in (?:category|group) (\w+)", sentence):
        filters["category"] = match.group(1).capitalize()

    return f"Medicine.find({filters})" if filters else "// Could not parse condition for Medicine"

def generate_mongoose_query(sentence):
    """Generates a Mongoose query based on the identified entity in the sentence."""
    entity = identify_entity(sentence)
    sentence = sentence.lower()

    if entity == "Electronics":
        return generate_electronics_query(sentence)
    elif entity == "Medicine":
        return generate_medicine_query(sentence)
    else:
        return "// Entity not recognized"

@app.route("/generate-query", methods=["POST"])
def generate_query_endpoint():
    """Endpoint to receive a sentence and return a generated Mongoose query."""
    data = request.get_json()
    sentence = data.get("sentence", "")
    query = generate_mongoose_query(sentence)
    return jsonify({"query": query})

if __name__ == "__main__":
    app.run(port=8082)