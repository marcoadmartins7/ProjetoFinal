//definition of constants
const saltRounds = 10;
const connect = require('../config/connect');


//JOIN PRODUTO COM INFO CARRINHOO
function readJoin(req, res) {

    const idCarrinho = req.sanitize('idCarrinho').escape();                                                                                                                                        


    //Create and execute the read query in the database
    connect.con.query('SELECT * from produtoscarrinho JOIN produtos ON produtoscarrinho.idProdutos=produtos.idProdutos WHERE idCarrinho =?', idCarrinho
    , function (err, rows, fields) {
        console.log(rows);


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


//function that counts the 5 most common crime_nature
function saveProdutoCarrinho(req, res) {
 //INSERT 
 const idProdutos = req.sanitize('idProdutos').escape();
 const idCarrinho = req.sanitize('idCarrinho').escape();
 const quantidade = req.sanitize('quantidade').escape();



 var query = "";
 var query1="";



     var post = {
        idProdutos: idProdutos,
        idCarrinho: idCarrinho,
        quantidade: quantidade,

     };

     query = connect.con.query('INSERT INTO produtosCarrinho SET ?', post, function (err, rows, fields) {
         console.log(query.sql);

        if (!err) {
             
            res.status(200).location(rows.insertId).send({
                "msg": "inserted with success"
            });

            query1 = connect.con.query('UPDATE produtos SET stock = stock - ? where idProdutos=? ',[quantidade, idProdutos], function(err1, rows1, fields){
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
    readJoin : readJoin,
    saveProdutoCarrinho : saveProdutoCarrinho,

};
