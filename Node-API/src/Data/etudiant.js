const connection = require('../Data/Connection');

exports.getEtudiants = async (req, res) => {
    connection.query('SELECT * FROM etudiant', (err, rows) => {
        if (err) throw err;
        console.log('Data received from Db:');
        console.log(rows);
        res.send(rows);
    });
}

exports.getEtudiant = async (req, res) => {
    connection.query('SELECT * FROM etudiant WHERE id = ?', [req.body.id], (err, rows) => {
        if (err) throw err;
        console.log('Data received from Db:');
        console.log(rows);
        res.send(rows);
    });
    
}

exports.addEtudiant = async (req, res) => {
    connection.query('INSERT INTO etudiant SET ?', req.body, (err, rows) => {
        if (err) throw err;
        console.log('Data received from Db:');
        console.log(rows);
        res.send(rows);
    });
}

exports.updateEtudiant = async (req, res) => {
    connection.query('UPDATE etudiant SET ? WHERE id = ?', [req.body, req.body.id], (err, rows) => {
        if (err) throw err;
        console.log('Data received from Db:');
        console.log(rows);
        res.send(rows);
    });
}

exports.deleteEtudiant = async (req, res) => {
    connection.query('DELETE FROM etudiant WHERE id = ?', [req.body.id], (err, rows) => {
        if (err) throw err;
        console.log('Data received from Db:');
        console.log(rows);
        res.send(rows);
    });
}

