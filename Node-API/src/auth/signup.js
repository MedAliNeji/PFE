const bcrypt = require('bcrypt');
// const jwt = require('./JWTconf');
const connection = require('../Data/Connection');


exports.signup = async (req, res) => {
  /*let firstname=req.body.firstname;
  let lastname=req.body.lastname;
  let email=req.body.email;
  let departement=req.body.departement;
  let pwd=req.body.pwd;
  let rpwd= req.body.rpwd;
  let mobile=req.body.mobile;*/
  // const { firstname, lastname, email, departement, pwd, rpwd, mobile } = req.body;
  let data = req.body;
  // console.log("sign up request", data);

  //testing passwosds
  if (data.password !== data.rpassword) {
    return res.status(400).send("Passwors do not match");
  }
  //testing existing user
  try {
    const existingUser = await searchUser(data.email);
    if (existingUser.length > 0) {
      return res.status(400).send("User already exists");
    }
    //hash the password
    data.password = await bcrypt.hash(data.password, 10);
    delete data.rpassword;
    console.log(data);
    //insert new user
    connection.query('INSERT INTO user SET ?', data, (err, rows) => {
      if (err) throw err;
      console.log('Data received from Db:');
      console.log(rows);
      res.send(rows);
    });

  } catch (err) {
    console.error("Signup error", err);
    return res.status(500).send('Internal Server Error');
  }
}

async function searchUser(email) {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM user WHERE email = ?', [email], (err, result) => {
      if (err) {
        console.log("Search user error", err);
        reject(err);
      } else { resolve(result) }
    })
  })
}

