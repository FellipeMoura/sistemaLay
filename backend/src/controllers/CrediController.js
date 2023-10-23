const CrediService = require('../services/CrediService')
const moment = require('moment')

module.exports = {
    gerarParcelas: async (req, res) => {
        let json = []

        projects = []

        let value = parseFloat(req.params.value)
        

        let credis = await CrediService.buscarCrediario('2023-08-28', '2023-08-28', '<100')
        for (let item of credis) {

           // let juros = parseFloat(item.valor) / parseInt(item.qnt) * value / 100
           

            for (let i = 1; i <= parseInt(item.qnt); i++) {

                let id_cliente = await CrediService.buscarIdCliente(item.id_os)

                let vencimento = moment(item.data).add(i, 'month').format('YYYY-MM-DD')

                 let project = {
                    id_cliente: id_cliente[0].id_cliente,
                    id_os: item.id_os,
                    vencimento: vencimento,
                    qnt: item.qnt,
                    indice: i,
                    valor: parseFloat(item.valor) / parseInt(item.qnt),
                    juros: 0,
                    pago: 0,
                    unidade: item.empresa,
                    user: 'fellipe'

                }
                json.push(project)
                await CrediService.insertCrediario(project)
                
            }
        }

        res.json(json)
    },

    buscarCrediarios: async (req, res) => {
        let json = { error: '', result: {} }

        

        let script = ''
   
        let crediarios = await CrediService.buscarCrediarios(script)

        res.json(crediarios)
    },
    inserir: async (req, res) => {
        let json = { error: '', result: {} }

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
        // console.log(user)
        let UserID = await UserService.insert
            (user);
        json.result = {
            id: UserID,
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
        await UserService.alterar(id, user);
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
    agendar: async (req, res) => {
        let json = { error: false, result: {} }

        let id = req.params.id
        let data = req.params.data
        let confirm = req.params.confirm
        let atendente = req.params.atendente
        // let resp = await ProcService.buscarDataVendaSub(id)
        let resp2


        if (confirm == 1) {
            let login = await ProcService.buscarLogin_p(atendente)
            console.log('confirm == 1')

            //console.log('qnt sessao = 0')

            resp2 = await ProcService.buscarDataAgendaP(data, id)

            console.log(data + resp2.length + id + login[0].login)
            await ProcService.agendar(data, resp2.length, login[0].login, id)


        } else {
            console.log('desmarcando na venda_sub...' + data + id)
            await ProcService.agendar('0000-00-00', '0', '', id)


        }
        // console.log("resp:  ")
        // console.log(resp)
        //  console.log("resp2:  ")
        // console.log(resp2)
        //json.result = resp





        // json.result ={
        //    id: id,
        //    data: data
        //};
        //console.log(json)
        res.json(json)
    },
    desmarcar: async (req, res) => {
        let json = { error: false, result: {} }

        let id_venda_sub = req.params.id_venda_sub
        let data = req.params.data

        console.log('desmarcando na venda_sub...' + data + id_venda_sub)
        await ProcService.agendar('0000-00-00', '0', '', id_venda_sub)



        res.json(json)
    },
    excluir: async (req, res) => {
        let json = { error: '', result: {} }
        await UserService.excluir(req.params.id)

        res.json(json)
    }
}


