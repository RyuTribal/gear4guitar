const { query } = require('express')
const db = require('../db/auth_db')

exports.search = function (req, res) {
    let query = req.params.query
    
    db.query(`SELECT * FROM products WHERE LOWER(title) LIKE '%${query.toLowerCase()}%'`)
        .then(result => res.send(result.rows))
        .catch(err => console.error('Error: ', err))
}

exports.product = function (req, res) {
    id = req.params.id
    db.query(`SELECT * FROM products WHERE id = '${id}'`)
        .then(result => res.send(result.rows))
        .catch(err => console.error('Error: ', err))
}
