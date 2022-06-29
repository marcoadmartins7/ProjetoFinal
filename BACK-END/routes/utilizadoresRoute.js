const app = require('../server');
const controllerUtilizadores = require('../controllers/utilizadoresController');


app.get('/Users/', controllerUtilizadores.readID);
