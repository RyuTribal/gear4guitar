const connection = require("../db/auth_db");
const saltRounds = 10;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async function (req, res) {
  if (
    !req.body.email ||
    !req.body.password ||
    !req.body.first_name ||
    !req.body.last_name
  ) {
    return res.status(400).send({ error: "Missing credentials" });
  }
  if (req.body.password.length < 8) {
    return res
      .status(400)
      .send({ error: "Password must be at least 8 characters" });
  }

  let validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!validRegex.test(req.body.email)) {
    return res
      .status(400)
      .send({ error: "Please enter a valid email address" });
  }
  if (req.body.first_name.length < 1) {
    return res.status(400).send({ error: "Please enter a first name" });
  }
  if (req.body.last_name.length < 1) {
    return res.status(400).send({ error: "Please enter a last name" });
  }

  let is_admin = false;
  if (req.body.is_admin) {
    is_admin = true;
  }

  const encryptedPassword = await bcrypt.hash(req.body.password, saltRounds);
  connection.query(
    "INSERT INTO users(email, hashed_password, first_name, last_name, is_admin) VALUES($1, $2, $3, $4, $5)",
    [
      req.body.email.toLowerCase(),
      encryptedPassword,
      req.body.first_name.toLowerCase(),
      req.body.last_name.toLowerCase(),
      is_admin,
    ],
    (err, result) => {
      if (err && err.code === "23505") {
        return res.status(400).send({ error: "Email already exists" });
      }
      if (err) {
        return res.status(500).send({ error: "Internal server error" });
      }
      res.status(200).send({ message: "User created" });
    }
  );
};

exports.edit_creds = async function (req, res) {
  let query = "UPDATE users SET ";
  for (let key of Object.keys(req.body.user)) {
    if (key === "password") {
      if (req.body.user.password) {
        if (req.body.user.password.length < 8) {
          return res
            .status(400)
            .send({ error: "Password must be at least 8 characters" });
        }
        const encryptedPassword = await bcrypt.hash(
          req.body.user.password,
          saltRounds
        );
        query += `hashed_password = '${encryptedPassword}', `;
      }
    } else {
      if (typeof req.body.user[key] === "string") {
        req.body.user[key] = "'" + req.body.user[key].toLowerCase() + "'";
      }
      query += `${key} = ${req.body.user[key]}, `;
    }
  }
  query = query.slice(0, -2);
  query += ` WHERE id = ${req.user}`;
  connection.query(query, (err, result) => {
    if (err && err.code === "23505") {
      return res.status(400).send({ error: "Email already exists" });
    }
    if (err) {
      return res.status(500).send({ error: "Internal server error: " + err });
    }
    return res.status(200).send({ message: "User updated" });
  });
};

exports.login = async function (req, res) {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ error: "Missing email or password" });
  }
  connection.query(
    "SELECT * FROM users WHERE email = $1",
    [req.body.email.toLowerCase()],
    async (err, result) => {
      if (err) {
        return res.status(500).send({ error: "Internal server error" });
      }
      if (result.rows.length === 0) {
        return res.status(400).send({ error: "Invalid email or password" });
      }
      const comparison = await bcrypt.compare(
        req.body.password,
        result.rows[0].hashed_password
      );
      if (err) {
        return res.status(500).send({ error: "Internal server error" });
      }
      if (!result || !comparison) {
        return res.status(400).send({ error: "Invalid email or password" });
      }
      let id = result.rows[0].id;
      let is_admin = result.rows[0].is_admin;
      let email = result.rows[0].email;
      const accessToken = jwt.sign(
        { id, is_admin, email },
        process.env.JWT_TOKEN_SECRET,
        {
          expiresIn: "86400s",
        }
      );
      return res
        .status(200)
        .send({ message: "Logged in", token: accessToken, is_admin: is_admin });
    }
  );
};

exports.get_user = async function (req, res) {
  connection.query(
    "SELECT email, first_name, last_name, id, is_admin FROM users WHERE id = $1",
    [req.user],
    (err, result) => {
      if (err) {
        return res.status(500).send({ error: "Internal server error" });
      }
      if (result.rows.length === 0) {
        return res.status(400).send({ error: "User does not exist" });
      }
      return res.status(200).send(result.rows[0]);
    }
  );
};

exports.is_logged_in = async function (req, res) {
  if (!req.user) {
    return res.status(401).send({ error: "Not logged in" });
  }
  return res
    .status(200)
    .send({ message: "Logged in", is_admin: req.user_admin, id: req.user });
};

exports.save_user_data = async function (req, res) {
  connection
    .query("UPDATE users SET is_saved = $1 WHERE id = $2", [
      req.body.is_saved,
      req.body.id,
    ])
    .catch((err) => console.error("Error: ", err));
  return res.status(200).send({ message: "Saved" });
};

exports.get_orders = async function (req, res) {
  connection.query(
    `SELECT products.*, COALESCE(AVG(grades.grade), 0.0) as average_grade, COUNT(grades.grade) AS total_ratings, 
    COALESCE(orders.price_at_payment, products.price) AS price,
    COALESCE(orders.status, 'pending') AS status,
    COALESCE(orders.id, 0) AS order_id,
    COALESCE(orders.quantity, 0) AS quantity,
    COALESCE(orders.added, '1970-01-01') AS order_date
  FROM products
  LEFT JOIN grades ON products.id = grades.product_id
  LEFT JOIN orders ON products.id = orders.product_id AND orders.user_id = $1
  WHERE products.id IN (SELECT product_id FROM orders WHERE user_id = $1)
  GROUP BY products.id, orders.price_at_payment, products.price, orders.status, orders.id, orders.quantity, orders.added`,
    [req.user],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.stack });
      }
      return res.status(200).send(result.rows);
    }
  );
};

exports.get_order = async function (req, res) {
  if (!req.user_admin) {
    return res.status(401).send({ error: "Not an admin" });
  }
  connection.query(
    `SELECT * FROM orders WHERE id = ${req.params.id}`,
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.stack });
      }
      return res.status(200).send(result.rows);
    }
  );
};

exports.get_status = async function (req, res) {
  if (!req.user_admin) {
    return res.status(401).send({ error: "Not an admin" });
  }

  connection.query(
    `SELECT unnest(enum_range(NULL::order_status))`,
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.stack });
      }
      return res.status(200).send(result.rows);
    }
  );
};

exports.update_order = async function (req, res) {
  if (!req.user_admin) {
    return res.status(401).send({ error: "Not an admin" });
  }
  if (!req.body.order) {
    return res.status(400).send({ error: "Missing order" });
  }
  await connection.query("BEGIN");
  if (
    req.body.order.status === "cancelled" &&
    req.body.order.og_status !== req.body.order.status
  ) {
    let update_product_qty = await connection.query(
      "UPDATE products SET in_stock = in_stock + $1 WHERE id = $2",
      [req.body.order.quantity, req.body.order.product_id]
    );

    if (update_product_qty instanceof Error) {
      await connection.query("ROLLBACK");
      return res.status(500).json({ error: update_product_qty.stack });
    }
  } else if (
    req.body.order.status !== "cancelled" &&
    req.body.order.og_status === "cancelled"
  ) {
    let update_product_qty = await connection.query(
      "UPDATE products SET in_stock = in_stock - $1 WHERE id = $2",
      [req.body.order.quantity, req.body.order.product_id]
    );
    if (update_product_qty instanceof Error) {
      await connection.query("ROLLBACK");
      return res.status(500).json({ error: update_product_qty.stack });
    }
  }
  let update_order = await connection.query(
    "UPDATE orders SET email = $1, first_name = $2, last_name = $3, street_name = $4, house_number = $5, city = $6, postal_code = $7, country = $8, status = $9 WHERE id = $10",
    [
      req.body.order.email.toLowerCase(),
      req.body.order.first_name.toLowerCase(),
      req.body.order.last_name.toLowerCase(),
      req.body.order.street_name.toLowerCase(),
      req.body.order.house_number.toLowerCase(),
      req.body.order.city.toLowerCase(),
      req.body.order.postal_code,
      req.body.order.country.toLowerCase(),
      req.body.order.status.toLowerCase(),
      req.params.id,
    ]
  );
  if (update_order instanceof Error) {
    await connection.query("ROLLBACK");
    return res.status(500).json({ error: update_order.stack });
  }
  await connection.query("COMMIT");
  return res.status(200).send({ message: "Updated" });
};
