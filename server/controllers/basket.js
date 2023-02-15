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
  // Two scenarios, user logged in or not
  await db.query('BEGIN');
  for (let i = 0; i < req.body.cart.length; i++) {
    let query = `INSERT INTO orders(product_id, first_name, last_name, email, 
      street_name, house_number, 
      user_id, price_at_payment, 
      country, city, postal_code, quantity) 
      VALUES(${req.body.cart[i].id}, '${req.body.user.first_name}', '${req.body.user.last_name}', '${req.body.user.email}', '${req.body.address.street}', '${req.body.address.number}', ${req.body.user.id}, ${req.body.cart[i].price}, '${req.body.address.country}', '${req.body.address.city}', ${req.body.address.zip}, ${req.body.cart[i].quantity})`;
    let order_res = await db.query(query).catch((err) => {
      return err;
    });
    if (order_res.severity === "ERROR") {
      await db.query("ROLLBACK");
      return res.status(500).json({ error: order_res.stack });
    }
    let delete_res = await db
      .query(
        `UPDATE products SET in_stock = in_stock - ${req.body.cart[i].quantity} 
      WHERE id = ${req.body.cart[i].id}`
      )
      .catch((err) => {
        return err;
      });
    if (delete_res.severity === "ERROR") {
      await db.query("ROLLBACK");
      return res.status(500).json({ error: delete_res.stack });
    }
  }
  if (req.body.user.id) {
    // User is logged in
    let basket_del_res = await db
      .query(`DELETE FROM basket WHERE user_id = ${req.body.user.id}`)
      .catch((err) => {
        return err;
      });
    if (basket_del_res.severity === "ERROR") {
      await db.query("ROLLBACK");
      return res.status(500).json({ error: basket_del_res.stack });
    }
  }
  await db.query('COMMIT');
  return res.status(200).send("Order completed");
};

exports.getbasket = function (req, res) {
  db.query(
    `SELECT * FROM products WHERE id IN (SELECT product_id FROM basket WHERE user_id = ${req.user})`
  )
    .then((result) => res.status(200).send(result.rows))
    .catch((err) => res.status(500).send("Error: " + err));
};
