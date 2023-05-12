const express = require('express')
const router = express.Router()
const authMiddleware = require('./auth');
const jwt = require('jsonwebtoken');

const UserController = require('./controllers/UserController')
const RecordController = require('./controllers/RecordController')
const SessionsController = require('./controllers/SessionsController')
const ControlController = require('./controllers/ControlController')
const SummarysController = require('./controllers/SummarysController')
const LoginController = require('./controllers/LoginController')

router.get('/users', UserController.buscarTodos)
router.get('/records', RecordController.buscarTodos)
router.get('/sessions/:id', SessionsController.buscarTodos)
router.get('/control/:id', ControlController.buscarTodos)
router.get('/summarys/:id', SummarysController.buscarTodos)
router.post('/signin/:user/:pass', LoginController.verificar)

router.get('/user/:id', UserController.buscarUm)
router.get('/record/:id', RecordController.buscarUm)

router.post('/user', UserController.inserir)
router.post('/session', SessionsController.inserir)
router.post('/record', RecordController.inserir)
router.post('/control', ControlController.inserir)
router.post('/summary', SummarysController.inserir)

router.put('/update/:id', UserController.alterar)
router.put('/update2/:id', RecordController.alterar)
router.put('/update3/:id', ControlController.alterar)

router.delete('/delete/:id', UserController.excluir)
router.delete('/delete2/:id', SessionsController.excluir)
router.delete('/delete3/:id', ControlController.excluir)
router.delete('/delete4/:id', SummarysController.excluir)

router.put('/confirm/:id', ControlController.confirmar)



router.post('/verif', (req, res) => {
  const user = {
    id: 1,
    name: 'Mateus Silva',
    company: 'DevAcademy',
    website: 'https://devacademy.com.br',
  };

  return res.json({
    user,
    token: jwt.sign(user, 'PRIVATEKEY'),
  });
});

/**
 * Private route
 */
//router.use(authMiddleware);

module.exports = router;