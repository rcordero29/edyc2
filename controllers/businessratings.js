const express =require("express");
const pool = require("../sql/connection");

const router = express.Router()

const getAllRatings = (req, res) =>{
  pool.query('SELECT * FROM  businessreviews', (err, rows)=>{
    res.json(rows);
  });
};

const thumbsup = (req,res) =>{
  let sql = 'INSERT INTO businessreviews ( userid, businessid, thumbsup) VALUES (?, ?, ?);'
  let {user_id} = req
  let {businessid} = req.params
  let body = [user_id, businessid, 1]

  pool.query(sql,body,(err,rows)=>{
    if(err){
      return res.status(400).json({error: err, msg:"ERROR"})
  }
  return res.status(200).json(rows)
})
}
const thumbsdown = (req,res) =>{
  let sql = 'INSERT INTO businessreviews ( userid, businessid, thumbsdown) VALUES (?, ?, ?);'
  let {user_id} = req
  let {businessid} = req.params
  let body = [user_id, businessid, 1]

  pool.query(sql,body,(err,rows)=>{
    if(err){
      return res.status(400).json({error: err, msg:"ERROR"})
  }
  return res.status(200).json(rows)
})
}






module.exports = {getAllRatings,thumbsup, thumbsdown}