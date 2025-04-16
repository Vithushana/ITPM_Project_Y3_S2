from flask import Flask, request, jsonify
import re

app = Flask(__name__)

def identify_entity(sentence):
    entities = ['electronics', 'medicine', 'groceries', 'food']
    for entity in entities:
        if entity in sentence.lower():
            return entity.capitalize()
    return None

def generate_mongoose_query(sentence):
    entity = identify_entity(sentence)
    if not entity:
        return "// Entity not recognized"

    sentence = sentence.lower()
    filters = {}

    if entity == "Electronics":
        # Price conditions
        if match := re.search(r"cheaper than (\d+)", sentence):
            filters["price"] = {"$lt": int(match.group(1))}
        elif match := re.search(r"more than (\d+)", sentence):
            filters["price"] = {"$gt": int(match.group(1))}

        # Quantity / Stock
        if match := re.search(r"(?:stock|quantity) (?:less|under) than (\d+)", sentence):
            filters["quantity"] = {"$lt": int(match.group(1))}
        elif match := re.search(r"(?:stock|quantity) (?:more|over) than (\d+)", sentence):
            filters["quantity"] = {"$gt": int(match.group(1))}

        # Category
        if match := re.search(r"in category (\w+)", sentence):
            filters["category"] = match.group(1).capitalize()

        # Name contains
        if match := re.search(r"name.*(?:containing|with|includes) (\w+)", sentence):
            filters["name"] = {"$regex": match.group(1), "$options": "i"}

        # Usage
        if match := re.search(r"for (\w+)", sentence):
            filters["usage"] = {"$regex": match.group(1), "$options": "i"}

        # Date
        if match := re.search(r"after (\d{4})", sentence):
            filters["addedDate"] = {"$gt": {"$date": f"{match.group(1)}-01-01T00:00:00Z"}}

    elif entity == "Medicine":
        # Illness type
        if match := re.search(r"for (\w+)", sentence):
            filters["illnessType"] = {"$regex": match.group(1), "$options": "i"}

        # Availability
        if re.search(r"(available|in stock)", sentence):
            filters["available"] = True

    if not filters:
        return f"// Could not parse condition for {entity}"

    return f"{entity}.find({filters})"

@app.route("/generate-query", methods=["POST"])
def generate_query():
    data = request.get_json()
    sentence = data.get("sentence", "")
    query = generate_mongoose_query(sentence)
    return jsonify({"query": query})

if __name__ == "__main__":
    app.run(port=8082)
