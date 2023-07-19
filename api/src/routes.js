const express = require('express')
const router = express.Router()
const authMiddleware = require('./auth');
const jwt = require('jsonwebtoken');

const ClientController = require('./controllers/ClientController')
const ProcController = require('./controllers/ProcController')
const MaestrinController = require('./controllers/MaestrinController')

router.get('/clients', ClientController.buscarTodos)
router.get('/procs/:id', ProcController.buscarTodos)
router.get('/maestrins/:data/:atendente/:unidade', MaestrinController.buscarTodos)
router.get('/atendentes/:unidade', MaestrinController.buscarAtendentes)
router.get('/atendente/:nome', MaestrinController.buscarAtendente)
router.get('/disp/:data/:hora/:hora_fim/:sala/:unidade', MaestrinController.disp)
router.get('/user/:id', ClientController.buscarUm)


router.post('/user', ClientController.inserir)
router.post('/maestrin', MaestrinController.inserir)

router.put('/update/:id', ClientController.alterar)
router.put('/alterarS/:nome', MaestrinController.alterarS)
router.put('/alterarA/:atendente/:unidade', MaestrinController.alterarA)
router.put('/agendar/:id/:data', ProcController.agendar)

router.delete('/delete5/:id', MaestrinController.excluir)
router.delete('/delete/:id', ClientController.excluir)


module.exports = router;