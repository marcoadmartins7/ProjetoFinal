//definition of constants
const saltRounds = 10;
const connect = require('../config/connect');

//RETURNS ALL PRODUCTS
function read(req, res) {
    //Create and execute the read query in the database
    connect.con.query('SELECT idProdutos,nome ,categoria,preco,stock ,informacao ,validade, imagem from produtos', function (err, rows, fields) {
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

//RETURNS ONLY SNACK
function readSnacks(req, res) {
    //Create and execute the read query in the database
    connect.con.query('SELECT idProdutos,nome ,categoria,preco,stock ,informacao ,validade, imagem from produtos WHERE categoria="snacks"', function (err, rows, fields) {
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

//RETURNS ONLY MATERIAL ESCOLAR
function readMaterial(req, res) {
    //Create and execute the read query in the database
    connect.con.query('SELECT idProdutos,nome ,categoria,preco,stock ,informacao ,validade, imagem from produtos WHERE categoria="Material Escolar"', function (err, rows, fields) {
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

//RETURNS ONLY COVID
function readCovid(req, res) {
    //Create and execute the read query in the database
    connect.con.query('SELECT idProdutos,nome ,categoria,preco,stock ,informacao ,validade, imagem from produtos WHERE categoria="COVID"', function (err, rows, fields) {
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

//RETURNS ONLY Produtos
function readProdutos(req, res) {
    //Create and execute the read query in the database
    connect.con.query('SELECT idProdutos,nome ,categoria,preco,stock ,informacao ,validade, imagem from produtos WHERE categoria="Produtos"', function (err, rows, fields) {
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

//RETURNS ONLY bebidas frias
function readBebidas(req, res) {
    //Create and execute the read query in the database
    connect.con.query('SELECT idProdutos,nome ,categoria,preco,stock ,informacao ,validade, imagem from produtos WHERE categoria="bebidas frias"', function (err, rows, fields) {
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

var nrCarrinho;

function saveCarrinho(req, res) {
    const quantidadeTotal = req.sanitize('quantidadeTotal').escape();
    const precoTotal = req.sanitize('precoTotal').escape();


    var query = "";
        var post = {
            quantidadeTotal: quantidadeTotal,
            precoTotal: precoTotal,
            idUser: 1,
        };

        query = connect.con.query('INSERT INTO carrinho SET ?', post, function (err, rows, fields) {
            console.log(query.sql);
           /* if (!err) {
                res.status(200).location(rows.insertId).send({
                "msg": "inserted with success"
            });*/
            console.log("Number of records inserted: " + rows.affectedRows);
        /*} else {
            if (err.code == "ER_DUP_ENTRY") {
                res.status(409).send({"msg": err.code});
                console.log('Error while performing Query.', err);
            } else res.status(400).send({"msg": err.code});
        }*/
    });


connect.con.query('SELECT idCarrinho FROM carrinho ORDER BY idCarrinho DESC LIMIT 1', function (err, rows, fields) {
    if (!err) {
        //checks the results, if the number of rows is 0 returns data not found, otherwise sends the results (rows).
        if (rows.length == 0) {
            res.status(404).send("Data not found");
        } else {
        res.status(200).send(rows);
        nrCarrinho = rows[0].idCarrinho;
        console.log("Carrinho:" + nrCarrinho);
        }
} else
console.log('Error while performing Query.', err);
});
}


//UPDATE STOCK

function updateStock(req, res) {
    const idProdutos = req.sanitize('idProdutos').escape();
    const subtrairStock = req.sanitize('subtrairStock').escape();
    var query="";
  
        query = connect.con.query('UPDATE produtos SET stock = stock - ? where idProdutos=? ',[subtrairStock, idProdutos], function(err, rows, fields){
            console.log(query.sql);
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


//INSERT PRODUCTS
 function saveProdutos(req, res) {
    

    //INSERT 
    const idProdutos = req.sanitize('idProdutos').escape();
    const desconto = req.sanitize('desconto').escape();
    const quantidade = req.sanitize('quantidade').escape();



    var query = "";
        var post = {
            idProdutos: idProdutos,
            desconto: desconto,
            quantidade: quantidade,

        };

        query = connect.con.query('INSERT INTO produtoscarrinho SET ?', post, function (err, rows, fields) {
            console.log(query.sql);
           if (!err) {
                res.status(200).location(rows.insertId).send({
                "msg": "inserted with success"
            });
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
    read: read,
    readSnacks: readSnacks,
    saveCarrinho: saveCarrinho,
    saveProdutos: saveProdutos,
    updateStock : updateStock,
    readBebidas : readBebidas,
    readProdutos : readProdutos,
    readCovid :readCovid,
    readMaterial : readMaterial,



};
