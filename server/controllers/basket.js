const db = require("../db/auth_db");

exports.addtobasket = function (req, res) {
  db.query(
    "INSERT INTO basket (user_id, product_id, quantity) VALUES ($1, $2, $3)",
    [req.user, req.params.id, req.body.quantity],
    (err) => {
      if (err && err.code === "23505") {
        return db
          .query(
            "UPDATE basket SET quantity = quantity + $3 WHERE product_id = $2 AND user_id = $1",
            [req.user, req.body.product_id, req.body.quantity]
          )
          .catch((err) => res.status(500).send("Error: " + err));
      } else if (err) {
        return res.status(500).send("Error: " + err);
      }
      res.status(200).send("added to basket");
    }
  );
};

exports.deletefrombasket = function (req, res) {
  db.query("DELETE FROM basket WHERE product_id = $1 AND user_id = $2", [
    req.params.id,
    req.user,
  ])
    .then((result) => res.status(200).send("deleted from basket"))
    .catch((err) => res.status(500).send("Error: ", err));
};

exports.completeorder = async function (req, res) {
  await db
    .query(
      "INSERT INTO orders (user_id, product_id, quantity) SELECT user_id, product_id, quantity FROM basket WHERE user_id = $1 ",
      [req.body.customer]
    )
    .catch((err) => res.status(500).send("Error: ", err));
  await db
    .query("DELETE FROM basket WHERE user_id = $1", [req.body.customer])
    .catch((err) => res.status(500).send("Error: ", err));
  res.status(200).send("order completed");
};

exports.getbasket = function (req, res) {
  db.query(
    `SELECT * FROM products WHERE id IN (SELECT product_id FROM basket WHERE user_id = ${req.user})`
  )
    .then((result) => res.status(200).send(result.rows))
    .catch((err) => res.status(500).send("Error: " + err));
};
