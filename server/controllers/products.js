const { query } = require("express");
const db = require("../db/auth_db");

exports.search = function (req, res) {
  let query = req.params.query;

  db.query(
    `SELECT * FROM products WHERE LOWER(title) LIKE '%${query.toLowerCase()}%'`
  )
    .then((result) => res.send(result.rows))
    .catch((err) => console.error("Error: ", err));
};

exports.product = function (req, res) {
  id = req.params.id;
  db.query(
    `SELECT products.*, COALESCE(AVG(grades.grade), 0.0) as average_grade
  FROM products
  LEFT JOIN grades ON products.id = grades.product_id
  WHERE products.id = ${id}
  GROUP BY products.id;`
  )
    .then((result) => res.status(200).send(result.rows[0]))
    .catch((err) => res.status(500).send({ message: "Error: " + err }));
};

exports.get_variants = function (req, res) {
  id = req.params.id;
  db.query(
    "SELECT products.* FROM products JOIN variations ON products.id = variations.variation_id WHERE variations.product_id = $1",
    [id]
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
      `SELECT products.id, products.title, products.price, products.description, products.images, COUNT(orders.product_id) as sales
    FROM orders
    JOIN products ON orders.product_id = products.id
    GROUP BY products.id
    ORDER BY sales DESC LIMIT 4`
    )
    .then((result) => {
      return result.rows;
    })
    .catch((err) => res.status(500).send({ message: "Error: " + err }));
  if (results.length > 0) {
    results.status(200).send(res);
  } else {
    let results = await db
      .query(
        `SELECT products.id, products.title, products.price, products.description, products.images from products LIMIT 4`
      )
      .then((result) => {
        return result.rows;
      })
      .catch((err) => res.status(500).send({ message: "Error: " + err }));
    res.status(200).send(results);
  }
};
