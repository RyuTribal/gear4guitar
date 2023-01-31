const db = require('../db/auth_db')

exports.search = function (req, res) {
    query = req.params.query
    db.query(`SELECT * FROM products WHERE title LIKE '%${query}%'`)
        .then(result => res.send(result.rows))
        .catch(err => console.error('Error: ', err))
}
