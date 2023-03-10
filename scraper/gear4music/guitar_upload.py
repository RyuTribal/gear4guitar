import pandas as pd
import psycopg2
import json


def mogrify_insert_variations(cursor, products):
    
        arg_str = ','.join(cursor.mogrify("(%s, %s, %s)", (product["id"], variation["id"], variation["image"])).decode("utf-8") for product in products for variation in product["variations"])
        insert_q = "INSERT INTO variations (product_id, variation_id, variation_image) VALUES{0}".format(arg_str)
        cursor.execute(insert_q)

def mogrify_insert_products(cursor, products):

    arg_str = ','.join(cursor.mogrify("(%s, %s, %s, %s, %s, %s, %s, %s)", (product["id"], product["title"], float(product["price"]) * 12.46, json.dumps(
        product["images"]), product["description"], json.dumps(product["specs"]), product["brand"], product["color"] if "color" in product else None)).decode("utf-8") for product in products)
    cursor.execute(
        "INSERT INTO products (id, title, price, images, description, specs, brand, color) VALUES".format(table="products") + arg_str)


products = json.load(open('products_clean.json', 'r'))

connection = psycopg2.connect(dbname="epic_database",
                              user="root",
                              password="5'7sigma",
                              host="157.245.68.252",
                              port="5432")

cursor = connection.cursor()
# mogrify_insert_products(cursor, products)
mogrify_insert_variations(cursor, products)

connection.commit()
connection.close()

# for product in products:
#     try:
#         connection = psycopg2.connect(dbname="epic_database",
#                                       user="root",
#                                       password="5'7sigma",
#                                       host="157.245.68.252",
#                                       port="5432")

#         for variation in product["variations"]:

#             try:
#                 cursor = connection.cursor()
#                 cursor.execute("INSERT INTO variations (product_id, variation_id, variation_image) VALUES (%s, %s, %s)", (
#                     product["id"], variation["id"], variation["image"]))

#                 connection.commit()
#                 cursor.close()
#             except(Exception, psycopg2.Error) as error:
#                 print("Failed to insert variation", error)
#                 cursor.close()

#         connection.close()
#     except:
#         print("Some haram")
