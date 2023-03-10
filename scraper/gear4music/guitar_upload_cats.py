import psycopg2
from psycopg2.extras import execute_values
import json

products = json.load(open('products.json', 'r'))
indirect_cats = json.load(open('indirect_categories.json', 'r'))
cats = json.load(open('categories.json', 'r'))
dir_cats = json.load(open('dir_cats.json', 'r'))

# 14934 products

connection = psycopg2.connect(dbname="epic_database",
                              user="root",
                              password="5'7sigma",
                              host="157.245.68.252",
                              port="5432")


def mogrify_insert_indirect_categories(cursor, products):
    arg_str = ""
    for product in products:
        if "category" in product:
            indirect_cat_id = None
            if "indirect_category" in product:
                for indirect_cat in indirect_cats:
                    if product["indirect_category"] == indirect_cat["category_name"]:
                        indirect_cat_id = indirect_cat["id"]
                        break
            arg_str += cursor.mogrify("(%s, %s)", (product["category"], indirect_cat_id)).decode(
                "utf-8") + ","
    arg_str = arg_str[:-1]
    insert_q = "INSERT INTO product_categories (category_name, parent_id) VALUES{0} ON CONFLICT DO NOTHING;".format(
        arg_str)
    cursor.execute(insert_q)


# def mogrify_insert_categories(cursor, products):
#     arg_str = ','.join(cursor.mogrify("(%s, %s)", (product["category"], for indirect_cat in indrect_cats)).decode(
#         "utf-8") for product in products)
#     insert_q = "INSERT INTO product_categories (category_name, parent_id) VALUES{0}".format(
#         arg_str)
#     cursor.execute(insert_q)


def mogrify_insert_direct_categories(cursor, products):
    arg_str = ""
    for product in products:
        if "direct_category" in product:
            indirect_cat_id = None
            if "indirect_category" in product:
                for indirect_cat in indirect_cats:
                    if product["indirect_category"] == indirect_cat["category_name"]:
                        indirect_cat_id = indirect_cat["id"]
                        break
            cat_id = None
            if "category" in product:
                for cat in cats:
                    if product["category"] == cat["category_name"] and cat["parent_id"] == indirect_cat_id:
                        cat_id = cat["id"]
                        break
            arg_str += cursor.mogrify("(%s, %s)", (product["direct_category"], cat_id)).decode(
                "utf-8") + ","
    arg_str = arg_str[:-1]
    insert_q = "INSERT INTO product_categories (category_name, parent_id) VALUES{0} ON CONFLICT DO NOTHING;".format(
        arg_str)
    cursor.execute(insert_q)


def mogrify_insert_product_categories(cursor, products):
    arg_str = []
    for product in products:
        if "direct_category" in product:
            for dir_cat in dir_cats:
                if product["direct_category"] == dir_cat["category_name"]:
                    arg_str.append(cursor.mogrify("(%s, %s)", (product["id"], dir_cat["id"])).decode(
                        "utf-8"))

        if "category" in product:
            for cat in cats:
                if product["category"] == cat["category_name"]:
                    arg_str.append(cursor.mogrify("(%s, %s)", (product["id"], cat["id"])).decode(
                        "utf-8"))
        if "indirect_category" in product:
            for indir_cat in indirect_cats:
                if product["indirect_category"] == indir_cat["category_name"]:
                    arg_str.append(cursor.mogrify("(%s, %s)", (product["id"], indir_cat["id"])).decode(
                        "utf-8"))
    print(len(arg_str))
    arg_str = ','.join(arg_str)
    insert_q = "INSERT INTO categories (product_id, category_id) VALUES{0}".format(
        arg_str)
    cursor.execute(insert_q)


cursor = connection.cursor()
mogrify_insert_product_categories(cursor, products)

connection.commit()
connection.close()


# for product in products:

#     try:
#         indirect_cat_id = None
#         cursor = connection.cursor()
#         cursor.execute(
#             "Select id from product_categories where category_name = %s and parent_id is null", (product["indirect_category"],))
#         indirect_cat_id = cursor.fetchone()
#         if indirect_cat_id is not None:
#             indirect_cat_id = indirect_cat_id[0]

#         cursor.close()
#         cursor = connection.cursor()
#         if indirect_cat_id is not None:
#             cursor.execute("Select id from product_categories where category_name = %s and parent_id = %s",
#                             (product["category"], indirect_cat_id))
#         else:
#             cursor.execute("Select id from product_categories where category_name = %s and parent_id is null",
#                             (product["category"],))
#         cat_id = cursor.fetchone()
#         if cat_id is not None:
#             cat_id = cat_id[0]
#         cursor.close()
#         cursor = connection.cursor()
#         cursor.execute("Select id from product_categories where category_name = %s and parent_id = %s",
#                         (product["direct_category"], cat_id))
#         direct_cat_id = cursor.fetchone()
#         if direct_cat_id is not None:
#             direct_cat_id = direct_cat_id[0]

#         cursor.close()

#         try:
#             cursor = connection.cursor()
#             cursor.execute("INSERT INTO categories (category_id, product_id) VALUES (%s, %s)", (direct_cat_id, product["id"]))
#             connection.commit()
#             cursor.close()
#         except (Exception, psycopg2.Error) as error:
#             print("Failed to insert direct category", error)
#             connection.rollback()
#             cursor.close()
#         try:
#             cursor = connection.cursor()
#             cursor.execute("INSERT INTO categories (category_id, product_id) VALUES (%s, %s)", (cat_id, product["id"]))
#             connection.commit()
#             cursor.close()
#         except (Exception, psycopg2.Error) as error:
#             print("Failed to insert category", error)
#             connection.rollback()
#             cursor.close()
#         try:
#             cursor = connection.cursor()
#             cursor.execute("INSERT INTO categories (category_id, product_id) VALUES (%s, %s)", (indirect_cat_id, product["id"]))
#             connection.commit()
#             cursor.close()
#         except(Exception, psycopg2.Error) as error:
#             print("Failed to insert indirect category", error)
#             connection.rollback()
#             cursor.close()

# for spec in product["specs"]:
#     if spec['title'] == 'Specifications':
#         continue
#     try:
#         cursor = connection.cursor()
#         cursor.execute("INSERT INTO product_categories (product_id, category_name, parent_id) VALUES (%s, %s, %s) RETURNING id", (
#             product["id"], spec["title"], direct_cat_id))

#         id_of_new_row = cursor.fetchone()[0]
#         cursor.close()
#         for spec_options in spec["content"]:
#             try:
#                 cursor = connection.cursor()
#                 new_cat_name = spec_options.split(":")
#                 if len(new_cat_name) > 1:
#                     new_cat_name = new_cat_name[1].strip()
#                 else:
#                     new_cat_name = new_cat_name[0].strip()

#                 cursor.execute("INSERT INTO product_categories (product_id, category_name, parent_id) VALUES (%s, %s, %s)", (
#                     product["id"], new_cat_name, id_of_new_row))
#                 connection.commit()
#                 cursor.close()
#             except (Exception, psycopg2.Error) as error:
#                 print("Failed to insert inner category", error)
#                 cursor.close()
#     except (Exception, psycopg2.Error) as error:
#         print("Failed to insert category", error)
#         cursor.close()
connection.close()
