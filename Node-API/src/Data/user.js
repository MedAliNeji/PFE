const bcrypt = require('bcrypt');
const connection = require('./Connection');

exports.getUsers = async (req, res) => {
  connection.query('SELECT * FROM user', (err, rows) => {
    if (err) throw err;
    console.log('Data received from Db:');
    console.log(rows);
    res.send(rows);
  });
}

exports.getUser = async (req, res) => {
  connection.query('SELECT * FROM user WHERE id_ent = ?', [req.body.id_ent], (err, rows) => {
    if (err) throw err;
    console.log('Data received from Db:');
    console.log(rows);
    res.send(rows);
  });

}

exports.addUser = async (req, res) => {
  let data = req.body;
  data.password = await bcrypt.hash(data.password, 10);
  connection.query('INSERT INTO user SET ?', data, (err, rows) => {
    if (err) throw err;
    console.log('Data received from Db:');
    console.log(rows);
    res.send(rows);
  });
}

exports.updateUser = async (req, res) => {
  let data = req.body;
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }
  connection.query('UPDATE user SET ? WHERE id_ent = ?', [data, req.body.id_ent], (err, rows) => {
    if (err) throw err;
    console.log('Data received from Db:');
    console.log(rows);
    res.send(rows);
  });
}

exports.deleteUser = async (req, res) => {
  connection.query('DELETE FROM user WHERE id_user = ?', [req.body.id], (err, rows) => {
    if (err) throw err;
    console.log('Data received from Db:');
    console.log(rows);
    res.send(rows);
  });
}



