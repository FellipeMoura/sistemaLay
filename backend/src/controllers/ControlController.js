const ControlService = require('../services/ControlService')

module.exports = {
    temp: async (req, res) => {
        let json = { error: '', result: {} }

        let list = await ControlService.temp0()
        console.log('lista:')
        console.log(list)
        for (let i in list) {
            let control = await ControlService.temp(list[i].id)
            console.log(control)
            await ControlService.attUltimo(control.data, list[i].id)
            //  console.log(list[i].data +'-'+ list[i].iduser)
        }


        res.json(list.length)
    },
    buscarTodos: async (req, res) => {
        let json = []
        let id = req.params.id
        let control = await ControlService.buscarTodos(id)

        for (let i in control) {
            json.push({
                id: control[i].id,
                iduser: control[i].iduser,
                sessao: control[i].sessao,
                data: control[i].data,
                valor: control[i].valor,
                hora: control[i].hora,
                confirm: control[i].confirm
            })
        }
        res.json(json)
    },
    buscarTudo: async (req, res) => {
        let json = []
        let json2 = {}
        let confirm = req.params.confirm
        let data = req.params.data
        let data_fim = req.params.data_fim
        let where = (confirm == 0 || confirm == 1 ?
            ` AND control.confirm = ${confirm}` : '')

        where += data != '0' ? data_fim != '0' ?
            ` AND control.data BETWEEN '${data}' AND '${data_fim}' `
            : ` AND control.data = '${data}'` : ''
        //console.log(`SELECT control.* ,users.name FROM control inner join users on control.iduser = users.id ${where} order by data`)
        let control = await ControlService.buscarTudo(where)
        let count = await ControlService.buscarCountControl()
        let count2 = await ControlService.buscarCountControl2()
        resCount = {
            pago: count[0].pago,
            total: count[0].total,
            valor_total: count[0].valor_total,
            valor_pago: count2[0].valor_pago
        }
        for (let i in control) {
            json.push({
                id: control[i].id,
                name: control[i].name,
                iduser: control[i].iduser,
                idrecord: control[i].idrecord,
                sessao: control[i].sessao,
                data: control[i].data,
                valor: control[i].valor,
                hora: control[i].hora,
                confirm: control[i].confirm
            })
        }
        let result = []
        result.push(json)
        result.push(resCount)

        res.json(result)
    },
    inserir: async (req, res) => {
        let json = { error: '', result: {} }

        let control = {

            iduser: req.body.iduser,
            sessao: req.body.sessao,
            confirm: req.body.confirm,
            valor: req.body.valor,
            data: req.body.data,
            hora: req.body.hora
        }
        console.log(control)
        await ControlService.attUltimo(req.body.data, req.body.iduser)
        let SessionID = await ControlService.insert(control);
        json.result = {
            id: SessionID,
            iduser: control.iduser,
            sessao: control.sessao,
            valor: control.valor,
            confirm: control.confirm,
            data: control.data,
            hora: control.hora


        };

        res.json(json)
    },
    alterar: async (req, res) => {
        let json = { error: '', result: {} }

        let control = {

            id: req.body.id,
            sessao: req.body.sessao,
            //  confirm: req.body.confirm,
            valor: req.body.valor,
            data: req.body.data,
            hora: req.body.hora
        }
        //await ControlService.attUltimo(req.body.data, req.body.iduser)
        await ControlService.alterar(control);
        json.result = {
            sessao: control.sessao,
            valor: control.valor,
            //confirm: control.confirm,
            data: control.data,
            hora: control.hora
        };

        res.json(json)
    },
    confirmar: async (req, res) => {
        let json = { error: '', result: {} }

        let id = req.params.id



        await ControlService.confirmar(id);
        json.result = {
            id,
            //confirm: control.confirm,
        };
        res.json(json)
    },
    excluir: async (req, res) => {
        let json = { error: '', result: {} }
        await ControlService.excluir(req.params.id)

        res.json(json)
    }
}