//definition of constants
const saltRounds = 10;
const connect = require('../config/connect');


//function that return the result of callback
function readID(req, res) {

    const idUser = req.sanitize('idUser').escape();

    //create and execute the read query in the database
    connect.con.query('SELECT * from user where idUser =? ', idUser, function (err, rows, fields) {
        if (!err) {
            //checks the results, if the number of rows is 0 returns data not found, otherwise sends the results (rows).
            if (rows.length == 0) {
                res.status(404).send("Data not found");
            } else {
            res.status(200).send(rows);
        }
    } else
    console.log('Error while performing Query.', err);
    });
}

//export functions
module.exports = {
    readID : readID,

};
