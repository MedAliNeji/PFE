const bcrypt = require('bcrypt');
const connection = require('../Data/Connection');

exports.getEntreprises = async (req, res) => {
    connection.query('SELECT * FROM entreprise', (err, rows) => {
        if (err) throw err;
        console.log('Data received from Db:');
        console.log(rows);
        res.send(rows);
    });
}

exports.getEntreprise = async (req, res) => {
    connection.query('SELECT * FROM entreprise WHERE id_ent = ?', [req.body.id_ent], (err, rows) => {
        if (err) throw err;
        console.log('Data received from Db:');
        console.log(rows);
        res.send(rows);
    });
    
}

exports.addEntreprise = async (req, res) => {
    let data = req.body;
    data.password = await bcrypt.hash(data.password, 10);
    connection.query('INSERT INTO entreprise SET ?', data, (err, rows) => {
        if (err) throw err;
        console.log('Data received from Db:');
        console.log(rows);
        res.send(rows);
    });
}

exports.updateEntreprise = async (req, res) => {
    let data = req.body;
    if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
    }
    connection.query('UPDATE entreprise SET ? WHERE id_ent = ?', [data, req.body.id_ent], (err, rows) => {
        if (err) throw err;
        console.log('Data received from Db:');
        console.log(rows);
        res.send(rows);
    });
}

exports.deleteEntreprise = async (req, res) => {
    connection.query('DELETE FROM entreprise WHERE id_ent = ?', [req.body.id], (err, rows) => {
        if (err) throw err;
        console.log('Data received from Db:');
        console.log(rows);
        res.send(rows);
    });
}



