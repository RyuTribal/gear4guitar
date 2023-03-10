import json

products = json.load(open('products.json', 'r'))

list_of_ids = [product["id"] for product in products]

for product in products:
    if "variations" in product:
        for variation in product["variations"]:
            if variation["id"] not in list_of_ids:
                product["variations"].remove(variation)

json.dump(products, open('products_clean.json', 'w'))
