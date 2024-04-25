const bcrypt = require('bcrypt');
const jwt = require('./JWTconf');
const connection = require('../Data/Connection');



exports.login = async (req, res) => {
  // req contains the email and password
  console.log("Login request");
  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    return res.status(400).send('Invalid email or password');
  }

  if (email === 'admin@tta.tn' && password === 'admin') {
    try {
      const accessToken = jwt.createToken({ name: 'admin', email, role: 'admin' });
      console.log("Admin Connected");
      // return res.status(200).send(token);
      return res.header('auth-token', accessToken).json({ accessToken, user: { nom: 'admin', role: 'admin', email } });
    } catch (err) {
      console.error(err);
      return res.status(400).send('Invalid email or password');
    }
  }

  try {
    const user = await searchUser(email);

    if (user !== null) {
      const hashedPassword = user.password;
      if (await bcrypt.compare(password, hashedPassword)) {
        const accessToken = jwt.createToken({ name: user.nom, email, role: user.role });
        console.log("User Connected");
        user.password = undefined;
        return res.header('auth-token', accessToken).json({ accessToken, user: user });
      } else {
        console.log("Invalid password");
        return res.status(400).send('Invalid password');
      }
    } else {
      return res.status(400).send('Invalid email or password');
    }

  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal Server Error');
  }
};

async function searchUser(email) {
  try {
    let dt = ['user', 'entreprise'];
    let returned = null;

    await Promise.all(dt.map(async (role) => {
      try {
        const rows = await new Promise((resolve, reject) => {
          connection.query('SELECT * FROM ' + role, (err, rows) => {
            if (err) {
              console.log("There is an error in select: " + err);
              reject(err);
            } else {
              resolve(rows);
            }
          });
        });
        if (rows.length > 0) {
          for (let j = 0; j < rows.length; j++) {
            if (rows[j].email === email) {
              console.log("request to connect to " + email);
              let data = rows[j];
              // delete data.password;
              data.role = role;
              returned = data;
            }
            // console.log(JSON.stringify(rows[j]) + " " + role + " " + email);
          }
        }
      } catch (error) {
        console.log("Error in query:", error);
      }
    }));

    return returned; // Return null if no matching user found in any table


  } catch (error) {
    console.log(error);
    return null;
  }
}
