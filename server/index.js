const dotenv = require('dotenv');
dotenv.config();

const express = require('express')
const app = express()
const product_routes = require('./routes/products')

const port = process.env.PORT || 8080

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use("/api/products/", product_routes);

app.listen(port, () => { console.log("Listening on port: " + port) })
