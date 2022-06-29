const app = require('../server');
const controllerProdutosCarrinho = require('../controllers/ProdutosCarrinhoController');


app.post('/InsertProdutoCarrinho/', controllerProdutosCarrinho.saveProdutoCarrinho);
app.get('/ReadJoin/:idCarrinho', controllerProdutosCarrinho.readJoin);