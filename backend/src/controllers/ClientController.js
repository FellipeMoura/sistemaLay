const ClientService = require('../services/ClientService')
const MaestrinService = require('../services/MaestrinService')
const moment = require('moment')

module.exports = {
    buscarTodos: async (req, res) => {
        let json = []

        let users = await ClientService.buscarTodos()

        for (let i in users) {
            json.push({
                id: users[i].id,
                nome: users[i].nome_l,
                telefone: users[i].telefone_l,
                envio_confirmacao: users[i].envio_confirmacao

            })
        }

        res.json(json)
    },
    alterarAcompanhamento: async (req, res) => {
        let json = false

        let cadastro = req.body
        let result = await ClientService.getTelDuplicado(cadastro)

        if (result.length > 0) {

            json = {
                id: result[0].id,
                nome: result[0].nome_l,
                telefone: result[0].telefone_l,

            }
        } else {
            await ClientService.alterarAcompanhamento(cadastro)
            await MaestrinService.attCliente(cadastro)
        }

        res.json(json)
    },
    agruparCadastros: async (req, res) => {
        let json = true

        let neww = req.params.neww
        let old = req.params.old
        if(neww){
        await ClientService.agruparEvent(neww, old)
        await ClientService.agruparVenda(neww, old)
        await ClientService.agruparVendaSub(neww, old)
        await ClientService.agruparAP(neww, old)
    }
        await ClientService.zerarTelefone(old)
        console.log('agrupado')
        res.json(json)
    },
  
    getVendas: async (req, res) => {
        let json = { vendas0: [], vendas1: [] }
        let id_cliente = req.params.id_cliente
        console.log('start')
        let vendas = await ClientService.getVendas(id_cliente)



        let get0 = await ClientService.get0(id_cliente)
        for (let k in get0) {
            let c = await ClientService.getCount0(get0[k].id)
            get0[k].realizadas = c[0].count

            get0[k].nome_procedimento = get0[k].nome_procedimento.indexOf('(') > 0 ? get0[k].nome_procedimento.substr(0, get0[k].nome_procedimento.indexOf('(')) : get0[k].nome_procedimento
            if (get0[k].venda == 'Sim') {
                parseInt(get0[k].qnt_sessao) > parseInt(get0[k].realizadas) ?
                    get0[k].status = 1 : get0[k].status = 2
            } else {
                get0[k].status = 0
            }
            // ? result[0].status = '' : result[0].status =  : result[0].status = 
            json.vendas0.push(get0[k])
        }


        for (let i in vendas) {

            let idList = await ClientService.get1(vendas[i].id)
            let vendasSub = []
            let vendido = false
            let count = 0
            for (let j in idList) {

                let result = await ClientService.getVendasSub(idList[j].id)
                result[0].nome_procedimento = result[0].nome_procedimento.indexOf('(') > 0 ? result[0].nome_procedimento.substr(0, result[0].nome_procedimento.indexOf('(')) : result[0].nome_procedimento
                if (result[0].venda == 'Sim') {
                    vendido = true
                    count += parseInt(result[0].qnt_sessao) - parseInt(result[0].realizadas)
                    parseInt(result[0].qnt_sessao) > parseInt(result[0].realizadas) ?
                        result[0].status = 1 : result[0].status = 2
                } else {
                    result[0].status = 0
                }
                // ? result[0].status = '' : result[0].status =  : result[0].status = 
                vendasSub.push(result[0])
            }
            json.vendas1.push({
                id: vendas[i].id,
                data: vendas[i].data,
                data_venda: vendas[i].data_venda,
                avaliadora: vendas[i].avaliadora,
                caixa: vendas[i].caixa,
                unidade: vendas[i].unidade,
                status: vendido ? count > 0 ? 1 : 2 : 0,
                vendas_sub: vendasSub

            })
        }

        res.json(json)
    },

    getAss: async (req, res) => {

        let json = []
        let id_venda_sub = req.params.id_venda_sub
        let result = await ClientService.getAss(id_venda_sub)

        for (let i in result) {
            json.push({
                data: result[i].data,
                status: result[i].cancelado.substr(2, 1) == 'm' ? { color: '#b60000', status: 'Cancelado' }
                    : result[i].anulado.substr(2, 1) == 'm' ? { color: '#222', status: 'Anulado' }
                        : result[i].evolucao.length > 0 ? { color: '#0f8f2f', status: 'Evoluído' }
                            : { color: '#696969', status: 'Assinado' },
                status1: result[i].status,
                evolucao: result[i].evolucao,
                data_evolucao: result[i].data_evolucao,
                unidade: result[i].unidade,
                atendente: result[i].atendente
            })
        }

        res.json(json)
    },
    insertSub: async (req, res) => {
        let json = { error: '', result: {} }

        let vendaServico = {
            id_event: 1,
            periodo_tratamento: moment().format('YYYY-MM-DD'),
            id_cliente: req.body.id_cliente,
            caixa: req.body.user,
            unidade: req.body.unidade,
        }
        //console.log(vendaSub)
        let vendaServicoID = await ClientService.insertVenda(vendaServico);

        let vendaSub = {
            id_vendas: vendaServicoID,
            id_event: 1,
            data_baixa: moment().format('YYYY-MM-DD'),
            id_vendas_1: req.body.az,
            vendido: 3,
            idproduto: req.body.id_produto,
            id_cliente: req.body.id_cliente,
            total: req.body.total,
            usuario: req.body.user,
            unidade: req.body.unidade,
            venda: 'Sim'

        }

        let vendaSubID = await ClientService.insertSub(vendaSub);

        vendaSub.id = vendaSubID
        json.result = vendaSub;

        res.json(json)
    },
    updateEnvio: async (req, res) => {
        let json = { error: '', result: {} }

        let acompanhamento = {
            id: req.params.id,
            envio_confirmacao: req.params.value == 0 ? 'nao' : 'sim'
        }

        await ClientService.updateEnvio(acompanhamento);


        //console.log(json)
        res.json(json)
    },
    alterar: async (req, res) => {
        let json = { error: '', result: {} }

        let id = req.params.id

        let user = {
            name: req.body.name,
            cpf: req.body.cpf,
            endereco: req.body.endereco,
            tel: req.body.tel,
            etel: req.body.etel,
            email: req.body.email,
            sexo: req.body.sexo,
            nasc: req.body.nasc,
            filhos: req.body.filhos,
            civil: req.body.civil,
            profissao: req.body.profissao
        }
        await ClientService.updateEnvio(id, user);
        json.result = {
            id,
            name: user.name,
            cpf: user.cpf,
            endereco: user.endereco,
            tel: user.tel,
            etel: user.etel,
            email: user.email,
            sexo: user.sexo,
            nasc: user.nasc,
            filhos: user.filhos,
            civil: user.civil,
            profissao: user.profissao
        };
        //console.log(json)
        res.json(json)
    },
    excluir: async (req, res) => {
        let json = { error: '', result: {} }
        await ClientService.excluir(req.params.id)

        res.json(json)
    }
}