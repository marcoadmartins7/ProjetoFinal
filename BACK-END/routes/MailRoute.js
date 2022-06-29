const app = require('../server');
const controllerMail = require('../controllers/MailController');
//routes
app.post('/SendMail/', controllerMail.sendMail);