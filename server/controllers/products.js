const db = require('../db/auth_db')

exports.search = function (req, res) {
    query = req.params.query
    db.query(`SELECT * FROM products WHERE title LIKE '%${query}%'`)
        .then(result => res.send(result.rows))
        .catch(err => console.error('Error: ', err))
}

exports.product = function (req, res) {
    id = req.params.id
    db.query(`SELECT * FROM products WHERE id = '${id}'`)
        .then(result => res.send(result.rows))
        .catch(err => console.error('Error: ', err))
}

exports.comment = function (req, res) {
    id = req.params.id
    db.query(`SELECT comments.*, users.first_name, users.last_name
            FROM comments
            JOIN users ON comments.user_id = users.id
            WHERE comments.product_id = '${id}'`)
        .then(result => res.send(result.rows))
        .catch(err => console.error('Error: ', err))
}
