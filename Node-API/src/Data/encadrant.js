const connection = require('../Data/Connection');

exports.getEncadrants = async (req, res) => {
    connection.query('SELECT * FROM encadrant', (err, rows) => {
        if (err) throw err;
        console.log('Data received from Db:');
        console.log(rows);
        res.send(rows);
    });
}

exports.getEncadrant = async (req, res) => {
    connection.query('SELECT * FROM encadrant WHERE id = ?', [req.body.id], (err, rows) => {
        if (err) throw err;
        console.log('Data received from Db:');
        console.log(rows);
        res.send(rows);
    });
    
}

exports.addEncadrant = async (req, res) => {
    connection.query('INSERT INTO encadrant SET ?', req.body, (err, rows) => {
        if (err) throw err;
        console.log('Data received from Db:');
        console.log(rows);
        res.send(rows);
    });
}

exports.updateEncadrant = async (req, res) => {
    connection.query('UPDATE encadrant SET ? WHERE id = ?', [req.body, req.body.id], (err, rows) => {
        if (err) throw err;
        console.log('Data received from Db:');
        console.log(rows);
        res.send(rows);
    });
}

exports.deleteEncadrant = async (req, res) => {
    connection.query('DELETE FROM encadrant WHERE id = ?', [req.body.id], (err, rows) => {
        if (err) throw err;
        console.log('Data received from Db:');
        console.log(rows);
        res.send(rows);
    });
}

