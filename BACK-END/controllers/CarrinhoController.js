//definition of constants
const connect = require('../config/connect');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const axios = require('axios');

const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "mail");
const got = require('got');


//function that counts the 5 most common crime_nature
function saveCarrinho(req, res) {
 //INSERT 
 const data = req.sanitize('data').escape();
 const precoTotal = req.sanitize('precoTotal').escape();
 const idUser = req.sanitize('idUser').escape();


let idRowInsert;

 var query = "";
 var query1="";


     var post = {
         data: data,
         precoTotal: precoTotal,
         idUser: idUser,

     };


     query = connect.con.query('INSERT INTO carrinho SET ?', post, function (err, rows, fields) {
         console.log(query.sql);
         console.log(rows);
         console.log(rows.insertId);
         var msgFinal={  
            successID: rows.insertId,
        }



        if (!err) {
            res.send(msgFinal);

            query1 = connect.con.query('UPDATE user SET saldo = saldo - ? where idUser =? ',[precoTotal, idUser], function(err1, rows1, fields){
                console.log(query1.sql);
                if (!err1) {
                    //checks the results, if the number of rows is 0 returns data not found, otherwise sends the results (rows).
                    if (rows1.length == 0) {
                        console.log("Data not found");
                    } else {
                        console.log(200);                }


            } else
            console.log('Error while performing Query.', err1);
            })

                  console.log("Number of records inserted: " + rows.affectedRows);

                  let email= "miguelitoamorimgeral@gmail.com";
                  const vendingStamp = "(VENDING MACHINE LDA.)"
                











     } else {
         if (err.code == "ER_DUP_ENTRY") {
             res.status(409).send({"msg": err.code});
             console.log('Error while performing Query.', err);
         } else res.status(400).send({"msg": err.code});
     }
 });


}



//export functions
module.exports = {
    saveCarrinho : saveCarrinho,

};
