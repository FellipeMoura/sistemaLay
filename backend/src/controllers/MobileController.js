const MaestrinService = require('../services/MaestrinService')
const MobileService = require('../services/MobileService')
const ProcService = require('../services/ProcService')


module.exports = {
    getAgenda: async (req, res) => {
        let json = []

        let data = req.params.data
        let login = req.params.atendente
        let unidade = req.params.unidade
        let nome_atendente = await MobileService.buscarNome_p(login, unidade)
 // //console.log(nome_atendente)
        let users = await MaestrinService.buscarSubPDF(data, nome_atendente[0].nome, unidade)
       
        for (let i in users) {

            let valores = []
            let count = []
            if (parseInt(users[i].id_venda_sub) > 10) {
                count = await ProcService.buscarCOUNT(users[i].id_venda_sub)
                valores = await MaestrinService.buscarPDF(users[i].id_venda_sub)

                if (valores.length < 1) {
                    valores = await MaestrinService.buscarPDF2(users[i].id_venda_sub)
                }
                if (valores.length < 1) {
                    valores = await MaestrinService.buscarPDF3(users[i].id_venda_sub)
                } if (valores.length < 1) {
                    valores = await MaestrinService.buscarPDF4(users[i].id_venda_sub)
                }

            



            let result = await MobileService.buscarEvo(users[i].assinado)
            let evo = result.length > 0 ? result[0] : false
            //console.log(result)
            json.push({
                id: users[i].id,
                id_cliente: users[i].id_cliente,
                nome_cliente: users[i].nome_cliente,
                telefone: users[i].telefone,
                user: users[i].user,
                id_venda_sub: users[i].id_venda_sub,
                procedimento: users[i].procedimento,
                sala: users[i].sala,
                data: users[i].data,
                hora: users[i].hora.substr(0, 5),
                hora_fim: users[i].hora_fim.substr(0, 5),
                duracao: users[i].duracao,
                atendente: users[i].atendente,
                assinado: users[i].assinado,
                confirm: users[i].confirm,
                indice: users[i].indice,
                nome_procedimento: users[i].nome_procedimento,
                unidade: users[i].unidade,
                evo: evo,
                status: users[i].confirm == 0 ? 0 : users[i].assinado == 0 ? 1 : users[i].assinado > 1 ? evo.evolucao.length > 0 ? 3 : 2 : 0,
                nota: users[i].nota,
                rp: valores.length > 0 ?
                    (parseFloat(valores[0].valor) - parseFloat(valores[0].desconto)) / parseInt(users[i].qnt_sessao)
                    : '-',
                sessoes: valores.length > 0 ?
                    `${parseInt(count[Object.keys(count)[0]]) + (parseInt(users[i].assinado) > 1? 0:1)}/${parseInt(users[i].qnt_sessao)}`
                    : '-',
                regiao: users[i].regiao
            })
        }
        }
        if (json.length < 1) {
            json.push({ atendente: nome_atendente[0].nome })
        }

        res.json(json);
    },
    getEvos: async (req, res) => {
       let id_venda_sub = req.params.id_venda_sub
       let id_cliente = req.params.id_cliente

       let get1 = await MobileService.getEvos(id_venda_sub)
       
       let get2 = await MobileService.getAllEvos(get1[0].chave, id_cliente, get1[0].procedimento, id_venda_sub)
       let json = {atual: get1, anteriores: get2}
      //console.log(json)
        res.json(json)
    },
    evoluir: async (req, res) => {
        let evolucao = req.body
      
        let resp = await MobileService.evoluir(evolucao);

        res.json(resp)
    },
    alterarS: async (req, res) => {
        let json = { error: '', result: {} }

        let nome = req.params.nome

        let project = req.body

        let list = []

        for (let i in project) {
            list.push(project[i].check)
        }

        let temp
        for (let i in list) {
            for (let j in list[i]) {
                j == 0 ? temp = list[i][j] : temp += list[i][j]
            }
            list[i] = temp
        }


        let agenda = {
            seg: list[0],
            ter: list[1],
            qua: list[2],
            qui: list[3],
            sex: list[4],
            sab: list[5],
            dom: list[6],


        }
        await MaestrinService.alterarS(nome, agenda);
        json.result = {
            nome,
            seg: agenda.seg,
            ter: agenda.ter,
            qua: agenda.qua,
            qui: agenda.qui,
            sex: agenda.sex,
            sab: agenda.sab,
            dom: agenda.dom,

        };
        // console.log(list)
        res.json(json)
    },
    excluir: async (req, res) => {
        let json = { error: '', result: {} }
        await MaestrinService.excluir(req.params.id)

        res.json(json)
    }
}