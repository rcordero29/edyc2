const express = require('express');
const pool = require('../sql/connection');

const router = express.Router();


const getAllBusinesses = (req, res) =>{
  pool.query('SELECT * FROM  businesses', (err, rows)=>{
    res.json(rows);
  });
};

const createBusiness = async (req, res) => {
  console.log(req.body);
  
  let {businessname, address, phonenumber} = req.body;

  let body = [businessname, address, phonenumber];

  let sql = `INSERT INTO businesses (businessname, address, phonenumber) VALUES (?, ?, ?)`;


  pool.query(sql,body,(err, results) =>{
    if(err){
      return res.status(400).json({error: err, msg:"ERROR"})
    }
    console.log(results);
    return res.status(200).json({
      msg: "business Created",
      insertId: results.insertId
    })
  });
}

const editBusiness = (req, res) => {

  let {businessname, address, phonenumber} = req.body;
  
  let {idbusinesses} = req.params 
  
  let sql = `UPDATE businesses SET businessname = ?, address = ?, phonenumber = ? WHERE (idbusinesses = ?);`

  let body = [businessname, address, phonenumber, idbusinesses];


  pool.query(sql,body, (err, rows) =>{
    res.json(rows);
  });
}


const deleteBusiness = (req, res) => {

  let {idbusinesses} = req.params 

  pool.query('DELETE FROM businesses WHERE (idbusinesses = ?)',[idbusinesses], (err,rows)=>{
    res.json(rows)
  })
}










module.exports = {createBusiness,getAllBusinesses, editBusiness, deleteBusiness};
