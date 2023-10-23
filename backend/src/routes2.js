const express = require('express')
const router = express.Router()
const authMiddleware = require('./auth');
const jwt = require('jsonwebtoken');

const ClientController = require('./controllers/ClientController')
const ProcController = require('./controllers/ProcController')
const MaestrinController = require('./controllers/MaestrinController')
const CaixaController = require('./controllers/CaixaController')
const CrediController = require('./controllers/CrediController')
const MobileController = require('./controllers/MobileController')

router.get('/clients', ClientController.buscarTodos)

router.get('/getVendas/:id_cliente', ClientController.getVendas)
router.get('/buscarProcs', ProcController.buscarProcs)
router.get('/procs/:id', ProcController.buscarTodos)
router.get('/maestrins/:data/:atendente/:unidade', MaestrinController.buscarTodos)
router.get('/buscarBloqueio/:data/:unidade', MaestrinController.buscarBloqueio)
router.get('/buscarPDF/:data/:atendente/:unidade', MaestrinController.buscarPDF)
router.get('/buscarClientes', MaestrinController.buscarClientes)
router.get('/buscarDesativados/:unidade', MaestrinController.buscarDesativados)
router.get('/buscar_p', MaestrinController.buscar_p)

router.get('/getAgenda/:data/:atendente/:unidade', MobileController.getAgenda)
router.get('/getEvos/:id_cliente/:id_venda_sub', MobileController.getEvos)


router.get('/buscarUltimo/:user', MaestrinController.buscarUltimo)
router.get('/buscarPDFcli/:id_cliente/:inicio/:fim', MaestrinController.buscarPDFcli)
router.get('/buscarSalas/:unidade', MaestrinController.buscarSalas)

router.get('/buscarVenda/:data/:fim/:unidade', CaixaController.buscarVenda)
router.get('/buscarPagamento/:id_venda', CaixaController.buscarPagamento)
router.get('/buscarFormas/:id', CaixaController.buscarFormas)
router.get('/getCred', CrediController.buscarCrediarios)
router.get('/buscarParcelas/:id_pagamento', CaixaController.buscarParcelas)

router.get('/atendentes/:unidade', MaestrinController.buscarAtendentes)
router.get('/atendente/:nome', MaestrinController.buscarAtendente)
router.get('/disp/:data/:hora/:hora_fim/:sala/:unidade/:atendente', MaestrinController.disp)
router.get('/getAss/:id_venda_sub', ClientController.getAss)

router.post('/insertAtend', MaestrinController.insertAtend)
router.post('/insertSala', MaestrinController.insertSala)
router.post('/insertBlockSala', MaestrinController.insertBlockSala)
router.post('/maestrin', MaestrinController.inserir)
router.post('/gerarParcelas/:value', CrediController.gerarParcelas)
router.post('/insertSub', ClientController.insertSub)

router.put('/alterarAcompanhamento', ClientController.alterarAcompanhamento)
router.put('/agruparCadastros/:neww/:old', ClientController.agruparCadastros)
router.put('/agruparCadastros/:old', ClientController.agruparCadastros)
router.put('/update/:id', ClientController.alterar)
router.put('/confirmarAgenda/:id_cliente/:data/:value/:id_venda_sub', MaestrinController.confirmarAgenda)
router.put('/alterar', MaestrinController.alterar)
router.put('/alterarAgenda/:id', MaestrinController.alterarAgenda)
router.put('/alterarA/:atendente/:unidade', MaestrinController.alterarA)
router.put('/alterarS/:nome', MaestrinController.alterarS)
router.put('/alterarSala', MaestrinController.alterarSala)
router.put('/desativarRegistro', MaestrinController.desativarRegistro)

router.put('/agendar/:id/:data/:confirm/:atendente', ProcController.agendar)
router.put('/desmarcar/:id_venda_sub/:data/', ProcController.desmarcar)

router.put('/attAssinado', MaestrinController.attAssinado)
router.get('/attAssinado0', MaestrinController.attAssinado0)

router.put('/putP', MaestrinController.temp)
router.put('/updateEnvio/:id/:value', ClientController.updateEnvio)
router.put('/evoluir', MobileController.evoluir)
router.post('/insertPg', CaixaController.insertPg)
router.put('/alterarFechamento', CaixaController.alterarFechamento)
router.put('/alterarPg', CaixaController.alterarPg)
router.delete('/deletePg/:id', CaixaController.deletePg)

router.delete('/delete5/:id', MaestrinController.excluir)
router.delete('/delete/:id', ClientController.excluir)
router.delete('/deleteSala/:id', MaestrinController.excluirSala)


module.exports = router;