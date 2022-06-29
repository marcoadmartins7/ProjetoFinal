const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const bCrypt = require('bcrypt-nodejs');
var generator = require('generate-password');
const connect = require('../config/connect');
const axios = require('axios');


const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "mail");
const got = require('got');

//const controllerUser = require('../controllers/UsersController');

function sendMail(req, res) {


    //ADMINISTRATOR EMAIL- CAN CHANGE THIS VALUE
    let email= "marcoadmartins7@gmail.com";
    const vendingStamp = "(VENDING MACHINE LDA.)"
  
    const idCarrinho = req.sanitize('idCarrinho').escape();                                                                                                                                        


    //Create and execute the read query in the database
    query2 = connect.con.query('SELECT * from produtoscarrinho JOIN produtos ON produtoscarrinho.idProdutos=produtos.idProdutos WHERE idCarrinho =?', idCarrinho
    , function (err, rows, fields) {
        if (!err) {
            //checks the results, if the number of rows is 0 returns data not found, otherwise sends the results (rows).
            if (rows.length == 0) {
                console.log("Data not found");
            } else {
                let bodycontent = "";

                res.send(rows);

                //STYLE
            
              bodycontent += '<br> <br> <h1 style="text-align: center !important"> COMPRA: '+ idCarrinho+'</h1>'
              bodycontent += '<p style="text-align: center !important" > Caro Administrador, </p>' ;
              bodycontent += '<p style="text-align: center !important" >Foi realizada uma nova compra (carrinho): '+ idCarrinho +' na seguinte máquina (código): 1  </p> ';
              bodycontent += '<p style="text-align: center !important" >Recomendamos que verifique o stock junto dos produtos selecionados.</p>';
              bodycontent += '<p style="text-align: center !important" >Agradecemos a sua preferência,</p>' ;
              bodycontent += '</i></blockquote>';
              bodycontent += '<br> <br>'

              bodycontent += '<table style="text-align: center !important; float: center !important;  margin-left: auto; margin-right: auto;" ><thead style="background-color: #f3f3f3">  <tr> <td style="width: 150px !important; text-align: center !important;  font-weight: bold">Imagem</td> <td style="width: 250px !important; text-align: center !important; font-weight: bold">Produto</td> <td style="width: 150px !important; text-align: center !important; font-weight: bold;">Quantidade</td> <td style="width: 150px !important; text-align: center !important; font-weight: bold;">Preço</td>  </tr>       </thead>     <tbody style="background-color:#fdfafa">';
                
                let totalCompra = 0;
                //ADD PRODUCTS TO TABLE
                for(let i=0; i< rows.length; i++){

                  bodycontent += '<tr> <td style="text-align: center !important"><img style="max-width: 100px !important; max-height: 80px !important; text-align: center !important" src='+ rows[i].imagem +' alt=""></td> <td style="text-align: center !important">'+rows[i].nome+'</td> <td style="text-align: center !important">'+rows[i].quantidade.toString()+'</td><td style="text-align: center !important">'+ rows[i].preco + ' € </tr>' ;

                  let temp= parseInt(rows[i].quantidade) * parseFloat(rows[i].preco)
                  totalCompra += temp;
  
                }

                bodycontent+=    '<tfoot ><tr> <td> </td> <td> </td> <td> </td> <td id="total" colspan="1" style="font-weight: bold; font-size: 20 px; margin-top: 10px">Total: '+ totalCompra +' € </td> </tfoot> </table>'

                bodycontent += '<br>'
                bodycontent += '<img src="https://i.ibb.co/vY9YBfm/2022-06-25-12h30-32.png" alt="logo" height="42" width="220">' + '<br>';
                bodycontent += vendingStamp + '<br> <br>';
             
  
  
  //SENDING EMAIL. DO NOT CHANGE!!!
              const transporter = nodemailer.createTransport(smtpTransport({
                  service: 'Gmail',
                  auth: {
                      user: 'vendingmachinechica',
                      pass: "udxfarnibdfevamb",
  
                  },
                  tls: {
                      rejectUnauthorized: false
                  }
              }));
  
              transporter.verify(function(error, success) {
                  if (error) {
                      console.log(error);
                     console.log(jsonMessages.mail.serverError);
                  }
                  else {
                      console.log('Server is ready to take our messages');
                  }
              });
  
              console.log(email);
  
              const mailOptions = {
                  from: email,
                  to: email,
                  cc: email,
                  subject: 'Vending Machine: Compra Efetuada com Sucesso!',
                  html: bodycontent
              };
  
              transporter.sendMail(mailOptions);
        }
    } else
    console.log('Error while performing Query.', err);
    });
  

  
}


module.exports = {
    sendMail: sendMail
};

    

