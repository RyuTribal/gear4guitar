const express = require('express')
const app = express()
let bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dotenv = require('dotenv');
dotenv.config();

const product_routes = require('./routes/products')
const comments_routes = require('./routes/comments')
const user_routes = require('./routes/users')
const basket= require('./routes/basket')


const port = process.env.PORT || 8080

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-Auth-Token, Content-Type, Accept");
    next();
});

app.use("/api/products/", product_routes);
app.use("/api/comments/", comments_routes);
app.use("/api/users/", user_routes);
app.use("/api/basket/", basket);

app.listen(port, () => { console.log("Listening on port: " + port) })
