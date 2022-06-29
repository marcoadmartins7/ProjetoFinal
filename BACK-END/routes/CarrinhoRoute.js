const app = require('../server');
const controllerCarrinho = require('../controllers/CarrinhoController');


app.post('/InsertCarrinho/', controllerCarrinho.saveCarrinho);
