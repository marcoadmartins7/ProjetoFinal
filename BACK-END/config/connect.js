var mysql = require('mysql');
var mysql2 = require('mysql2');

//Export the functions
module.exports = {
    con: mysql2.createConnection({
        host    : '127.0.0.1',
        user    : 'root',
        password: 'projetofinal1',
        database: 'mydb'
    })
};