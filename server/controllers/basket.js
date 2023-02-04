const db = require('../db/auth_db')

exports.addtobasket = function (req, res) {
    
    db.query("INSERT INTO basket (user_id, product_id, quantity) VALUES ($1, $2, $3)",
    [
        req.body.customer,
        req.body.product_id,
        req.body.quantity,
    ], (err) =>{

        if (err && err.code==="23505") {
            db.query("UPDATE basket SET quantity = quantity + $3 WHERE product_id = $2 AND user_id = $1",[
                req.body.customer, 
                req.body.product_id, 
                req.body.quantity])
                .catch(err => console.error('Error: ', err))
        }
        else{
            console.log("error" , err)
        }
    })
         
    res.send("added to basket")
}

exports.deletefrombasket = function (req, res) {
    db.query("DELETE FROM basket WHERE product_id = $1 AND user_id = $2",[
        req.body.product_id, 
        req.body.customer], 
    ).catch(err => console.error('Error: ', err))
    res.send("deleted from basket")
}

exports.completeorder = function (req, res) {
    db.query("INSERT INTO orders (user_id, product_id, quantity) SELECT user_id, product_id, quantity FROM basket WHERE user_id = $1 ", [req.body.customer])
    .catch(err => console.error('Error: ', err))
    db.query("DELETE FROM basket WHERE user_id = $1", [req.body.customer])
    .catch(err => console.error('Error: ', err))
    res.send("order completed")
}
