const express =require("express");
const { append } = require("express/lib/response");
const checkjwt = require("../utils/checkjwt");
const businessController = require("../controllers/business")

const router = express.Router()

//create busniess
router.post("/create",checkjwt,businessController.createBusiness)



//edit business
router.put("/editbusiness/:idbusinesses", checkjwt, businessController.editBusiness)


//delete business
router.delete("/delete/:idbusinesses", checkjwt, businessController.deleteBusiness)


//get all businesses
router.get("/", businessController.getAllBusinesses)


// get business ID



//get business by rating





module.exports = router;