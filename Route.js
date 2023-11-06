const Route = require("express").Router()

Route.get("/",(req,res)=>{
    res.send("Api is running")
})

module.exports = Route;