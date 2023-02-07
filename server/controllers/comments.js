const { query } = require('express')
const db = require('../db/auth_db')

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

exports.deleteCommentSecure = function (req, res) {
    id = req.params.id
    db.query(`DELETE FROM comments WHERE id = ${id}`)
        .then(result => res.status(200).send({ message: 'Comment deleted' }))
        .catch(err => res.status(500).send({ error: 'Internal server error' }))
}

exports.editCommentSecure = function (req, res) {
    id = req.params.id
    db.query(`UPDATE comments SET comment = '${req.body.comment}' WHERE id = ${id}`)
        .then(result => res.status(200).send({ message: 'Comment edited' }))
        .catch(err => res.status(500).send({ error: 'Internal server error' }))
}