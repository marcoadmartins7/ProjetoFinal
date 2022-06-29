const app = require('../server');
const controllerProdutos = require('../controllers/ProdutosController');

//routes
app.get('/Produtos/', controllerProdutos.read);
app.get('/ProdutosSnacks/', controllerProdutos.readSnacks);
app.get('/ProdutosCovid/', controllerProdutos.readCovid);
app.get('/ProdutosBebidas/', controllerProdutos.readBebidas);
app.get('/ProdutosMaterial/', controllerProdutos.readMaterial);
app.get('/ProdutosProdutos/', controllerProdutos.readProdutos);
app.post('/ProdutosInsert/', controllerProdutos.saveCarrinho);
app.post('/ProdutosInsertCarrinho/', controllerProdutos.saveProdutos);
app.put('/UpdateStock/', controllerProdutos.updateStock);

