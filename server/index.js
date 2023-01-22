const express= require('express')
const app= express()

app.get("/api", (req, res) => {
    res.json("dahello")
})

app.listen(8080, () => {console.log("Server started on port 8080 // press this link http://localhost:8080/api to access")})