const jwt = require("jsonwebtoken")

const checkjwt = (req,res, next) =>{
  if (!req.headers.authorization){
    res.status(401).json({msg:'you are not authorized'})
  }
  else {
    let token = req.headers.authorization.split(' ')[1]
    jwt.verify(token,process.env.SECRET,(err, decoded)=>{
      if (err){
        res.status(401).json({msg:'you are not authorized'})
      }
      else {
        // console.log(decoded);
        req.username = decoded.username
        req.user_id = decoded.user_id
        next()
      }
    })
  }
}

module.exports = checkjwt