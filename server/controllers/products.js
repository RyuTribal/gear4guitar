const { query } = require("express");
const db = require("../db/auth_db");

function buildQuery(query, params, first_query) {
  let query_string = first_query;
  let first_statement = true;
  if (params) {
    if (params.categories && params.categories.length > 0) {
      if (!first_statement) {
        query_string += ` AND `;
      }
      first_statement = false;
      query_string += `categories.category_id IN (`;
      for (let i = 0; i < params.categories.length; i++) {
        query_string += `${params.categories[i].id}`;
        if (i !== params.categories.length - 1) {
          query_string += `, `;
        }
      }
      query_string += `)`;
    }
    if (query !== null && query !== "null") {
      if (first_statement) {
        query_string += `LOWER(title) LIKE '%${query.toLowerCase()}%'`;
        first_statement = false;
      } else {
        query_string += ` AND LOWER(title) LIKE '%${query.toLowerCase()}%'`;
      }
    }
    if (params.brands && params.brands.length > 0) {
      if (!first_statement) {
        query_string += ` AND `;
      }
      first_statement = false;
      query_string += `LOWER(products.brand) IN (`;
      for (let i = 0; i < params.brands.length; i++) {
        query_string += `'${params.brands[i].toLowerCase()}'`;
        if (i !== params.brands.length - 1) {
          query_string += `, `;
        }
      }
      query_string += `)`;
    }
    if (params.colors && params.colors.length > 0) {
      if (!first_statement) {
        query_string += ` AND `;
      }
      first_statement = false;
      query_string += `LOWER(products.color) IN (`;
      for (let i = 0; i < params.colors.length; i++) {
        query_string += `'${params.colors[i].toLowerCase()}'`;
        if (i !== params.colors.length - 1) {
          query_string += `, `;
        }
      }
      query_string += `)`;
    }
    if (
      params.price_min &&
      params.price_max &&
      params.price_min < params.price_max
    ) {
      if (!first_statement) {
        query_string += ` AND `;
      }
      first_statement = false;
      query_string += `products.price BETWEEN ${params.price_min} AND ${params.price_max}`;
    }
  }
  return query_string;
}

exports.search = function (req, res) {
  let query = req.params.query;
  let params = req.body.params;
  let start_query;
  if (params.categories && params.categories.length > 0) {
    start_query = `SELECT products.*, COALESCE(AVG(grades.grade), 0.0) as average_grade, COUNT(grades.grade) AS total_ratings
    FROM products
    INNER JOIN categories ON products.id = categories.product_id
    LEFT JOIN grades ON products.id = grades.product_id
    WHERE `;
    start_query = buildQuery(query, params, start_query);
    start_query += ` GROUP BY products.id
    HAVING COUNT(DISTINCT categories.category_id) = ${params.categories.length} 
    `;
  } else {
    start_query = `SELECT products.*, COALESCE(AVG(grades.grade), 0.0) as average_grade, COUNT(grades.grade) AS total_ratings
    FROM products
    LEFT JOIN grades ON products.id = grades.product_id
    WHERE `;
    start_query = buildQuery(query, params, start_query);
    start_query += ` GROUP BY products.id
    `;
  }

  if (params.order_by === "price_asc") {
    start_query += ` ORDER BY products.price ASC`;
  } else if (params.order_by === "price_desc") {
    start_query += ` ORDER BY products.price DESC`;
  } else if (params.order_by === "newest") {
    start_query += ` ORDER BY products.id DESC`;
  } else if (params.order_by === "oldest") {
    start_query += ` ORDER BY products.id ASC`;
  } else {
    start_query += ` ORDER BY products.price ASC`;
  }
  start_query += ` LIMIT 15 OFFSET ${req.body.offset};`;

  db.query(start_query)
    .then((result) => res.status(200).send(result.rows))
    .catch((err) => res.status(500).send({ message: "Error: " + err }));
};

exports.get_categories = function (req, res) {
  let parent_id = req.params.parent_id;
  if (parent_id === "undefined") {
    db.query(
      `SELECT * FROM product_categories WHERE parent_id IS NULL ORDER BY category_name;`
    )
      .then((result) => res.status(200).send(result.rows))
      .catch((err) => res.status(500).send({ message: "Error: " + err }));
  } else {
    db.query(
      `SELECT * FROM product_categories WHERE parent_id = ${parent_id} ORDER BY category_name;`
    )
      .then((result) => res.status(200).send(result.rows))
      .catch((err) => res.status(500).send({ message: "Error: " + err }));
  }
};

exports.get_category_brands_colors = function (req, res) {
  if (req.params.id === "undefined") {
    db.query(
      `SELECT ARRAY(SELECT DISTINCT brand FROM products WHERE brand is not null) AS distinct_brands,
    ARRAY(SELECT DISTINCT color FROM products WHERE color is not null) AS distinct_colors`
    )
      .then((result) => res.status(200).send(result.rows))
      .catch((err) => res.status(500).send({ message: "Error: " + err }));
  } else {
    let category_id = req.params.id;
    db.query(
      `SELECT category_id,
  ARRAY(SELECT DISTINCT brand
FROM products
WHERE id IN (SELECT id FROM categories WHERE category_id = ${category_id}) and brand is not null) AS distinct_brands,
  ARRAY(SELECT DISTINCT color
FROM products
WHERE id IN (SELECT id FROM categories WHERE category_id = ${category_id}) and color is not null) AS distinct_colors
FROM categories c
WHERE category_id = ${category_id}
GROUP BY category_id;`
    )
      .then((result) => res.status(200).send(result.rows))
      .catch((err) => res.status(500).send({ message: "Error: " + err }));
  }
};

exports.total_results = function (req, res) {
  let query = req.params.query;
  let params = req.body.params;
  let start_query;
  if (params.categories && params.categories.length > 0) {
    start_query = `SELECT COUNT(*) as total_results
  FROM (
    SELECT products.id
    FROM products
    LEFT JOIN categories ON products.id = categories.product_id
    WHERE `;
    start_query = buildQuery(query, params, start_query);
    start_query += ` GROUP BY products.id
  HAVING COUNT(DISTINCT categories.category_id) = ${params.categories.length}
) as products_with_categories;`;
  } else {
    start_query = `SELECT COUNT(*) as total_results
    FROM products
    WHERE `;
    start_query = buildQuery(query, params, start_query);
  }
  db.query(start_query)
    .then((result) => res.status(200).send(result.rows))
    .catch((err) => res.status(500).send({ message: "Error: " + err }));
};

exports.product = function (req, res) {
  id = req.params.id;
  db.query(
    `WITH RECURSIVE cte AS (
      SELECT id, category_name, parent_id
      FROM product_categories
      WHERE id = (SELECT MAX(category_id) FROM categories WHERE product_id = ${id} LIMIT 1)
      UNION ALL
      SELECT pc.id, pc.category_name, pc.parent_id
      FROM cte
      JOIN product_categories pc ON cte.parent_id = pc.id
      )
      SELECT products.*, AVG(grades.grade) AS average_grade, COUNT(DISTINCT grades.grade) AS total_ratings, ARRAY(
      SELECT category_name
      FROM (
      SELECT category_name, id
      FROM cte
      ORDER BY id
      ) subq
      ) as category_names,
      ARRAY(
      SELECT id
      FROM (
      SELECT category_name, id
      FROM cte
      ORDER BY id
      ) subq
      ) as category_ids,
      COUNT(DISTINCT comments.id) AS total_comments
      FROM products
      LEFT JOIN grades ON products.id = grades.product_id
      LEFT JOIN comments ON products.id = comments.product_id
      WHERE products.id = ${id}
      GROUP BY products.id;`
  )
    .then((result) => {
      res.status(200).send(result.rows[0]);
    })
    .catch((err) => res.status(500).send({ message: "Error: " + err }));
};

exports.get_category_path = function (req, res) {
  id = req.params.id;
  db.query(
    `WITH RECURSIVE cte AS (
    SELECT id, category_name, parent_id
    FROM product_categories
    WHERE id = ${id}
    UNION ALL
    SELECT pc.id, pc.category_name, pc.parent_id
    FROM cte
    JOIN product_categories pc ON cte.parent_id = pc.id
    )
    SELECT *
    FROM cte
    ORDER BY id;`
  )
    .then((result) => res.status(200).send(result.rows))
    .catch((err) => res.status(500).send({ message: "Error: " + err }));
};

exports.get_variants = function (req, res) {
  id = req.params.id;
  db.query(
    `SELECT products.*, COALESCE(AVG(grades.grade), 0.0) as average_grade, COUNT(grades.grade) AS total_ratings
    FROM products 
    JOIN variations ON products.id = variations.variation_id 
    LEFT JOIN grades ON products.id = grades.product_id
    WHERE variations.product_id = ${id}
    GROUP BY products.id;`
  )
    .then((result) => res.status(200).send(result.rows))
    .catch((err) => res.status(500).send({ message: "Error: " + err }));
};

exports.comment = function (req, res) {
  id = req.params.id;
  offset = req.body.offset;
  db.query(
    `SELECT comments.*, users.first_name, users.last_name
            FROM comments
            JOIN users ON comments.user_id = users.id
            WHERE comments.product_id = '${id}' ORDER BY comments.id DESC LIMIT 10 OFFSET ${offset};`
  )
    .then((result) => res.send(result.rows))
    .catch((err) => console.error("Error: ", err));
};

exports.best_sellers = async function (req, res) {
  let results = await db
    .query(
      `SELECT products.*, SUM(orders.quantity) as sales, COALESCE(AVG(grades.grade), 0.0) as average_grade, COUNT(grades.grade) AS total_ratings
    FROM orders
    JOIN products ON orders.product_id = products.id
    LEFT JOIN grades ON products.id = grades.product_id
    GROUP BY products.id
    ORDER BY sales DESC LIMIT 4`
    )
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      return err;
    });

  if (results.length > 0) {
    res.status(200).send(results);
  } else {
    let results = await db
      .query(
        `SELECT products.*, COALESCE(AVG(grades.grade), 0.0) as average_grade, COUNT(grades.grade) AS total_ratings
        FROM products
        LEFT JOIN grades ON products.id = grades.product_id
        GROUP BY products.id
        LIMIT 4`
      )
      .then((result) => {
        return result.rows;
      })
      .catch((err) => res.status(500).send({ message: "Error: " + err }));
    res.status(200).send(results);
  }
};

exports.addProduct = async function (req, res) {
  if (
    req.body.product.images.length === 0 ||
    req.body.product.images[0] === "" ||
    req.body.product.images[0] === " "
  ) {
    res.status(404).send({ message: "No images provided" });
    return;
  } else if (
    !req.body.product.brand ||
    !req.body.product.title ||
    !req.body.product.price ||
    !req.body.product.in_stock ||
    !req.body.product.color
  ) {
    res.status(404).send({ message: "Missing required fields" });
    return;
  }
  let categories = req.body.product.categories;
  await db.query("BEGIN");
  let products_res = await db
    .query(
      `INSERT INTO products (title, price, description, in_stock, color, images, brand, specs) 
    VALUES ('${req.body.product.title}', ${req.body.product.price}, '${
        req.body.product.description
      }', ${req.body.product.in_stock}, '${
        req.body.product.color
      }', '${JSON.stringify(req.body.product.images)}', '${
        req.body.product.brand
      }', '${JSON.stringify(req.body.product.specs)}') RETURNING id`
    )
    .then((result) => {
      return result.rows[0].id;
    })
    .catch((err) => {
      return err;
    });
  if (products_res instanceof Error) {
    await db.query("ROLLBACK");
    return res.status(500).json({ error: res });
  } else {
    let prev_cat_id = null;
    for (let i = 0; i < categories.length; i++) {
      let product_categories_res = null;
      if (i !== 0) {
        product_categories_res = await db
          .query(
            `SELECT id FROM product_categories WHERE category_name = '${categories[i]}' AND parent_id = ${prev_cat_id};`
          )
          .then((result) => {
            return result.rows[0].id;
          })
          .catch((err) => {
            return err;
          });
        if (
          product_categories_res instanceof Error ||
          typeof product_categories_res !== "number"
        ) {
          product_categories_res = await db
            .query(
              `INSERT INTO product_categories (category_name, parent_id) VALUES ('${categories[i]}', ${prev_cat_id}) RETURNING id;`
            )
            .then((result) => {
              return result.rows[0].id;
            })
            .catch((err) => {
              return err;
            });
        }
      } else {
        product_categories_res = await db
          .query(
            `SELECT id FROM product_categories WHERE category_name = '${categories[i]}' AND parent_id IS NULL;`
          )
          .then((result) => {
            return result.rows[0].id;
          })
          .catch((err) => {
            return err;
          });
        if (typeof product_categories_res !== "number") {
          product_categories_res = await db
            .query(
              `Insert INTO product_categories (category_name) VALUES ('${categories[i]}') RETURNING id;`
            )
            .then((result) => {
              return result.rows[0].id;
            })
            .catch((err) => {
              return err;
            });
        }
      }
      if (typeof product_categories_res !== "number") {
        product_categories_res = await db
          .query(
            `SELECT id FROM product_categories WHERE category_name = '${categories[i]}' AND parent_id = ${prev_cat_id};`
          )
          .then((result) => {
            return result.rows[0].id;
          })
          .catch((err) => {
            return err;
          });
        if (
          product_categories_res instanceof Error ||
          typeof product_categories_res !== "number"
        ) {
          db.query("ROLLBACK");
          return res.status(500).json({ error: product_categories_res });
        }
      } else {
        prev_cat_id = product_categories_res;
        let product_categories_id = product_categories_res;
        let categories_res = await db
          .query(
            `INSERT INTO categories (product_id, category_id) VALUES (${products_res}, ${product_categories_id})`
          )
          .then((result) => {
            return result;
          })
          .catch((err) => {
            return err;
          });

        if (categories_res instanceof Error) {
          await db.query("ROLLBACK");
          return res.status(500).json({ error: product_categories_res });
        }
      }
    }
  }
  await db.query("COMMIT");
  res.status(200).json({ id: products_res });
};

exports.deleteProduct = function (req, res) {
  id = req.params.id;
  db.query(`DELETE FROM products WHERE id = ${req.body.id}`)
    .then((result) => res.status(200).json({ message: "Product deleted" }))
    .catch((err) => res.status(500).json({ error: err }));
};

exports.editProduct = async function (req, res) {
  if (
    req.body.product.images.length === 0 ||
    req.body.product.images[0] === "" ||
    req.body.product.images[0] === " "
  ) {
    res.status(404).send({ message: "No images provided" });
    return;
  } else if (
    !req.body.product.brand ||
    !req.body.product.title ||
    !req.body.product.price ||
    !req.body.product.in_stock ||
    !req.body.product.color
  ) {
    res.status(404).send({ message: "Missing required fields" });
    return;
  }
  let categories = req.body.product.categories;
  await db.query("BEGIN");
  let del_res = await db
    .query(`DELETE FROM categories WHERE product_id = ${req.body.product.id}`)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
  if (del_res instanceof Error) {
    await db.query("ROLLBACK");
    return res.status(500).json({ error: del_res });
  }

  let prev_cat_id = null;
  for (let i = 0; i < categories.length; i++) {
    let product_categories_res = null;
    if (i !== 0) {
      product_categories_res = await db
        .query(
          `SELECT id FROM product_categories WHERE category_name = '${categories[i]}' AND parent_id = ${prev_cat_id};`
        )
        .then((result) => {
          return result.rows[0].id;
        })
        .catch((err) => {
          return err;
        });
      if (
        product_categories_res instanceof Error ||
        typeof product_categories_res !== "number"
      ) {
        product_categories_res = await db
          .query(
            `INSERT INTO product_categories (category_name, parent_id) VALUES ('${categories[i]}', ${prev_cat_id}) RETURNING id;`
          )
          .then((result) => {
            return result.rows[0].id;
          })
          .catch((err) => {
            return err;
          });
      }
    } else {
      product_categories_res = await db
        .query(
          `SELECT id FROM product_categories WHERE category_name = '${categories[i]}' AND parent_id IS NULL;`
        )
        .then((result) => {
          return result.rows[0].id;
        })
        .catch((err) => {
          return err;
        });
      if (typeof product_categories_res !== "number") {
        product_categories_res = await db
          .query(
            `Insert INTO product_categories (category_name) VALUES ('${categories[i]}') RETURNING id;`
          )
          .then((result) => {
            return result.rows[0].id;
          })
          .catch((err) => {
            return err;
          });
      }
    }
    if (typeof product_categories_res !== "number") {
      product_categories_res = await db
        .query(
          `SELECT id FROM product_categories WHERE category_name = '${categories[i]}' AND parent_id = ${prev_cat_id};`
        )
        .then((result) => {
          return result.rows[0].id;
        })
        .catch((err) => {
          return err;
        });
      if (
        product_categories_res instanceof Error ||
        typeof product_categories_res !== "number"
      ) {
        db.query("ROLLBACK");
        return res.status(500).json({ error: product_categories_res });
      }
    } else {
      prev_cat_id = product_categories_res;
      let product_categories_id = product_categories_res;
      let categories_res = await db
        .query(
          `INSERT INTO categories (product_id, category_id) VALUES (${req.body.product.id}, ${product_categories_id})`
        )
        .then((result) => {
          return result;
        })
        .catch((err) => {
          return err;
        });

      if (categories_res instanceof Error) {
        await db.query("ROLLBACK");
        return res.status(500).json({ error: product_categories_res });
      }
    }
  }

  let update_res = await db
    .query(
      `UPDATE products SET title='${req.body.product.title}', price=${
        req.body.product.price
      }, description='${req.body.product.description}', in_stock=${
        req.body.product.in_stock
      }, color='${req.body.product.color}', images='${JSON.stringify(
        req.body.product.images
      )}', brand='${req.body.product.brand}', specs='${JSON.stringify(
        req.body.product.specs
      )}' WHERE id=${req.body.product.id}`
    )
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
  if (update_res instanceof Error) {
    await db.query("ROLLBACK");
    return res.status(500).json({ error: update_res });
  }
  await db.query("COMMIT");
  res.status(200).json({ message: "Product updated" });
};

exports.addRating = function (req, res) {
  id = req.params.id;
  db.query(
    `INSERT INTO grades (grade, user_id, product_id) 
    VALUES (${req.body.rating}, ${req.user}, ${id})`
  )
    .then((result) => res.status(200).send({ message: "Rating Added" }))
    .catch((err) => console.error("Error: ", err));
};

exports.getGrades = async function (req, res) {
  id = req.params.id;
  db.query(
    `SELECT * FROM grades WHERE product_id = ${id} AND user_id = ${req.user}`
  )

    .then((result) => res.status(200).send(result.rows))
    .catch((err) => console.error("Error: ", err));
};
