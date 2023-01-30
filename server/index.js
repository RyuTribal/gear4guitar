const dotenv = require('dotenv');
dotenv.config();

const express= require('express')
const app= express()
const product_routes = require('./routes/products')

const port = process.env.PORT || 8080

app.use("/api/products/", product_routes);

app.listen(port, () => {console.log("Listening on port: "+ port)})