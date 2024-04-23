const connection = require('../Data/Connection');
exports.addDepot = async (req, res) => {
    connection.query('INSERT INTO depot_stage SET ?', req.body, (err, rows) => {
        if (err) throw err;
        console.log('Data received from Db:');
        console.log(rows);
        res.send(rows);
    });
}