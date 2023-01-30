const db = require('../db/auth_db')

exports.search = function (req, res) {
    db.connect();
    db.query('SELECT * FROM products')
        .then(result => res.send(result.rows))
        .catch(err => console.error('Error: ', err))
}
