const bcrypt = require('bcrypt');
const connection = require('./Connection');

// Handle incoming logs
exports.getLogs = async (req, res) => {
  // Process incoming log data
  console.log('Received log request:', req);

  console.log('Received log:', req.body);
  // Add your processing logic here
  res.status(200).send('Log received successfully');
};
exports.getUsers = async (req, res) => {
  connection.query('SELECT * FROM user', (err, rows) => {
    if (err) throw err;
    console.log('Data received from Db:');
    console.log(rows);
    res.send(rows);
  });
}
/*
exports.getDepartments = async (req, res) => {
  connection.query('SELECT departement FROM user', (err, rows) => {
    if (err) throw err;
    console.log('Data received from Db:');
    console.log(rows);
    const departments = rows.map(row => row.departement);
    res.json(departments); // This line sends the response
  });
}*/
exports.getUser = async (req, res) => {
  connection.query('SELECT * FROM user WHERE id_user = ?', [req.body.id_user], (err, rows) => {
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
  connection.query('UPDATE user SET ? WHERE id_user = ?', [data, req.body.id_user], (err, rows) => {
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



