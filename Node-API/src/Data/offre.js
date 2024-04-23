const connection = require('../Data/Connection');

exports.getOffres = async (req, res) => {
    connection.query('SELECT o.*,e.* FROM offre_stage o join entreprise e on e.id_ent=o.id_ent', (err, rows) => {
        if (err) throw err;
        console.log('Data received from Db:');
        console.log(rows);
        res.send(rows);
    });
}

exports.getOffresEntreprise = async (req, res) => {
    connection.query('SELECT o.*,e.* FROM offre_stage o join entreprise e on e.id_ent=o.id_ent where e.id_ent = ?' , [req.body.id_ent], (err, rows) => {
        if (err) throw err;
        console.log('Data received from Db:');
        console.log(rows);
        res.send(rows);
    });
}

exports.getOffre = async (req, res) => {
    connection.query('SELECT * FROM offre_stage WHERE id_os = ?', [req.body.id], (err, rows) => {
        if (err) throw err;
        console.log('Data received from Db:');
        console.log(rows);
        res.send(rows);
    });
    
}

exports.addOffre = async (req, res) => {
    connection.query('INSERT INTO offre_stage SET ?', req.body, (err, rows) => {
        if (err) throw err;
        console.log('Data received from Db:');
        console.log(rows);
        res.send(rows);
    });
}

exports.updateOffre = async (req, res) => {
    connection.query('UPDATE offre_stage SET ? WHERE id_os = ?', [req.body, req.body.id], (err, rows) => {
        if (err) throw err;
        console.log('Data received from Db:');
        console.log(rows);
        res.send(rows);
    });
}

exports.deleteOffre = async (req, res) => {
    connection.query('DELETE FROM offre_stage WHERE id_os = ?', [req.body.id], (err, rows) => {
        if (err) throw err;
        console.log('Data received from Db:');
        console.log(rows);
        res.send(rows);
    });
}

