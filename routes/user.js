const express =require("express");
const usercontroller = require("../controllers/user")
const checkjwt = require("../utils/checkjwt")

const router = express.Router()

router.get("/",checkjwt,usercontroller.getAllUsers)

router.post("/",usercontroller.createUser)

router.post("/login",usercontroller.login)




module.exports = router