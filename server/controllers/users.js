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
      is_admin
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
  for (let key of Object.keys(req.body)) {
    if (key === "password") {
      const encryptedPassword = await bcrypt.hash(
        req.body.password,
        saltRounds
      );
      query += `hashed_password = ${encryptedPassword}, `;
    } else {
      query += `${key} = '${req.body[key]}', `;
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
      console.log(comparison);
      if (err) {
        return res.status(500).send({ error: "Internal server error" });
      }
      if (!result || !comparison) {
        return res.status(400).send({ error: "Invalid email or password" });
      }
      let id = result.rows[0].id;
      const accessToken = jwt.sign({ id }, process.env.JWT_TOKEN_SECRET, {
        expiresIn: "86400s",
      });
      return res.status(200).send({ message: "Logged in", token: accessToken });
    }
  );
};

exports.get_user = async function (req, res) {
  connection.query(
    "SELECT * FROM users WHERE id = $1",
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
  return res.status(200).send({ message: "Logged in" });
};
