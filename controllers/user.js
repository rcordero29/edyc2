const pool = require('../sql/connection');

const argon2 = require('argon2');

const jwt = require('jsonwebtoken');

const getAllUsers = (req, res) => {
  console.log(req);
  pool.query('SELECT * FROM users', (err, rows) => {
    res.json(rows);
  });
};

const createUser = async (req, res) => {
  let { username, userpassword, email, firstname, lastname } = req.body;
  let hash = await argon2.hash(userpassword);

  let body = [username, hash, email, firstname, lastname];

  let sql = `INSERT INTO users (username, userpassword, email, firstname,lastname) 
              VALUES (?, ?, ?, ?, ?)`;

  pool.query(sql, body, (err, results) => {
    if (err) {
      return res.status(400).json({ error: err, msg: 'ERROR' });
    }
    console.log(results);
    return res.status(200).json({
      msg: 'user created',
      insertId: results.insertId,
    });
  });
};

const login = async (req, res) => {
  let { username, userpassword } = req.body;
  let sql = `SELECT * FROM users WHERE username = ?`;
  pool.query(sql, [username], async (err, rows) => {
    if (err) {
      return res.status(400).json({ error: err, msg: 'ERROR' });
    }
    if (!rows[0]) {
      res.status(500).json({
        msg: 'user doesnt exist',
      });
    } else {
      const hash = rows[0].userpassword;
      let match = await argon2.verify(hash, userpassword);
      if (!match) {
        return res.status(401).send({ msg: 'your password does not match' });
      } else {
        const unsignedToken = {
          username: rows[0].username,
          user_id: rows[0].user_id,
        };
        const token = jwt.sign(unsignedToken, process.env.SECRET);
        res.json({ token });
      }
    }
  });
};

module.exports = { getAllUsers, createUser, login };
