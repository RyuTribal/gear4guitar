const { query } = require('express')
const db = require('../db/auth_db')

exports.addComment = function (req, res) {
    id = req.params.id
    db.query(`INSERT INTO comments (user_id, comment, product_id, parent_comment)
            VALUES (2, 'balls007', '${id}', null)`)
        .then(result => res.send(result.rows))
        .catch(err => console.error('Error: ', err))
}

exports.addCommentSecure = function (req, res) {
    id = req.params.id
    db.query(`INSERT INTO comments (user_id, comment, product_id, parent_comment)
            VALUES ($1, $2, $3, $4)`,
            [
                req.user,
                req.body.comment,
                id,
                null
            ])
        .then(result => res.status(200).send({ message: 'Comment added' }))
        .catch(err => res.status(500).send({ error: 'Internal server error' }))
}
