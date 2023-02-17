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
      WHERE id = (SELECT category_id FROM categories WHERE product_id = ${id} LIMIT 1)
      UNION ALL
      SELECT pc.id, pc.category_name, pc.parent_id
      FROM cte
      JOIN product_categories pc ON cte.parent_id = pc.id
      )
      SELECT products.*, AVG(grades.grade) AS average_grade, COUNT(grades.grade) AS total_ratings, ARRAY(
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
      ) as category_ids
      FROM products
      LEFT JOIN grades ON products.id = grades.product_id
      WHERE products.id = ${id}
      GROUP BY products.id;`
  )
    .then((result) => res.status(200).send(result.rows[0]))
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
  db.query(
    `SELECT comments.*, users.first_name, users.last_name
            FROM comments
            JOIN users ON comments.user_id = users.id
            WHERE comments.product_id = '${id}'`
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

exports.addProduct = function (req, res) {
  id = req.params.id;
  db.query(
    `INSERT INTO products (title, price, description, in_stock, color, images, brand) 
    VALUES ('${req.body.title}', ${req.body.price}, '${req.body.description}', ${req.body.in_stock}, '${req.body.color}', '${JSON.stringify(req.body.images)}', '${req.body.brand}')`
  )
    .then((result) => res.status(200).send({ message: "Product Added" }))
    .catch((err) => console.error("Error: ", err));
};

exports.deleteProduct = function (req, res) {
  id = req.params.id;
  db.query(`DELETE FROM products WHERE id = ${req.body.id}`)
    .then((result) => res.status(200).send({ message: "Product deleted" }))
    .catch((err) => res.status(500).send({ error: "Internal server error" }));
};

exports.editProduct = function (req, res) {
  db.query(
    `UPDATE products SET title='${req.body.title}', price=${req.body.price}, description='${req.body.description}', in_stock=${req.body.in_stock}, color='${req.body.color}', images='${JSON.stringify(req.body.images)}', brand='${req.body.brand}' WHERE id=${req.body.id}`
  )
    .then((result) => res.status(200).send({ message: "Product Edited" }))
    .catch((err) => console.error("Error: ", err));
};

exports.addRating = function (req, res) {
  id = req.params.id;
  db.query(
    `INSERT INTO grades (grade, user_id, product_id) 
    VALUES (${req.body.rating}, ${req.body.user_id}, ${id})`
  )
    .then((result) => res.status(200).send({ message: "Rating Added" }))
    .catch((err) => console.error("Error: ", err));
};

exports.getGrades = async function (req, res) {
  id = req.params.id;
  db.query(
    `SELECT * FROM grades WHERE product_id = ${id} AND user_id = ${req.body.user_id}`
  )

    .then((result) => res.status(200).send(result.rows))
    .catch((err) => console.error("Error: ", err));
};