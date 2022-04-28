const express = require('express');
const checkjwt = require("../utils/checkjwt");

const businessRatings = require("../controllers/businessratings")

const router = express.Router();

// router.post("/review",checkjwt,usercontroller.review)

router.get("/reviews",businessRatings.getAllRatings);

router.post("/thumbsup/:businessid",checkjwt, businessRatings.thumbsup)

router.post("/thumbsdown/:businessid", checkjwt, businessRatings.thumbsdown)



module.exports = router;
