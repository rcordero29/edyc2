require('dotenv').config();
const express = require('express');
const req = require('express/lib/request');
const userRoute = require('./routes/user');
const businessRoute = require('./routes/business');
const businessRatings = require('./routes/businessratings.js')
const cors = require("cors")

const app = express();

const port = process.env.PORT || 3000;

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/user', userRoute);
app.use('/businesses', businessRoute)
app.use('/ratings', businessRatings)

app.get('/', (req, res) => {
  res.json('hello world');
});

app.listen(port, () => {
  console.log('listening on port ' + port);
});
