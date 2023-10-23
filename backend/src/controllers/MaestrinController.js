const MaestrinService = require('../services/MaestrinService')
const ProcService = require('../services/ProcService')
const moment = require('moment')

module.exports = {
    temp: async (req, res) => {
        let json = { error: '', result: {} }

        let itens = await MaestrinService.temp();

        for (let item of itens) {
            item.nome_procedimento = item.nome_procedimento.indexOf('-') > 0 ? item.nome_procedimento.substr(0, item.nome_procedimento.indexOf('-')) : item.nome_procedimento

            await MaestrinService.temp2(item.nome_procedimento, item.id);

        }
        //.log(json)
        res.json(json)
    },
    buscarTodos: async (req, res) => {
        let json = []

        let data = req.params.data
        let atendente = req.params.atendente
        let unidade = req.params.unidade

        let horarios = [
            '08:00',
            '08:40',
            '09:20',
            '10:00',
            '10:40',
            '11:20',
            '12:00',
            '12:40',
            '13:20',
            '14:00',
            '14:40',
            '15:20',
            '16:00',
            '16:40',
            '17:20',
            '18:00',
            '18:40',
            '19:20',
            '20:00',
            '20:40',
            '21:20',


        ]
        let hora_fim = [
            '08:40',
            '09:20',
            '10:00',
            '10:40',
            '11:20',
            '12:00',
            '12:40',
            '13:20',
            '14:00',
            '14:40',
            '15:20',
            '16:00',
            '16:40',
            '17:20',
            '18:00',
            '18:40',
            '19:20',
            '20:00',
            '20:40',
            '21:20',
            '22:00',
            '22:40',
            '23:20'
        ]

        let project = []

        for (let i in horarios) {
            project.push([{
                id: 0,
                id_cliente: '',
                nome_cliente: '',
                telefone: '',
                id_venda_sub: '',
                procedimento: '',
                sala: '',
                user: '',
                data: data,
                hora: horarios[i],
                hora_fim: hora_fim[i],
                duracao: 40,
                atendente: atendente,
                indice: horarios.indexOf(horarios[i]),
                nome_procedimento: '',
                unidade: 0,
                nota: '',


            }])
        }
        let copy = []
        for (let i in horarios) {
            copy.push({
                id: 0,
                id_cliente: '',
                nome_cliente: '',
                telefone: '',
                id_venda_sub: '',
                procedimento: '',
                sala: '',
                user: '',
                data: data,
                hora: horarios[i],
                hora_fim: hora_fim[i],
                duracao: 40,
                atendente: atendente,
                indice: horarios.indexOf(horarios[i]),
                nome_procedimento: '',
                unidade: 0,
                nota: '',


            })
        }




        let agendamento = await MaestrinService.buscarTodos(data, atendente, unidade)
        for (let i in agendamento) {
            json.push({
                id: agendamento[i].id,
                id_cliente: agendamento[i].id_cliente,
                nome_cliente: agendamento[i].nome_cliente,
                telefone: agendamento[i].telefone,
                user: agendamento[i].user,
                id_venda_sub: agendamento[i].id_venda_sub,
                procedimento: agendamento[i].procedimento,
                sala: agendamento[i].sala,
                data: agendamento[i].data,
                hora: agendamento[i].hora.substr(0, 5),
                hora_fim: agendamento[i].hora_fim.substr(0, 5),
                duracao: agendamento[i].duracao,
                atendente: agendamento[i].atendente,
                assinado: agendamento[i].assinado,
                confirm: agendamento[i].confirm,
                indice: agendamento[i].indice,
                nome_procedimento: agendamento[i].nome_procedimento,
                unidade: agendamento[i].unidade,
                nota: agendamento[i].nota,
                data_agendamento: agendamento[i].data_agendamento,


            })
        }

        for (let i in json) {

            project[json[i].indice][0].id === 0 ? project[json[i].indice][0] = json[i] : project[json[i].indice].push(json[i])
        }

        function organizar(primeiro, segundo, anterior, item) {

            if ((segundo.length - 1) >= primeiro.indexOf(item)) {

                segundo.push(segundo[primeiro.indexOf(item)])

            } else if ((segundo.length - 1) < primeiro.indexOf(item)) {

                segundo.push(copy[project.indexOf(segundo)])

            }

            segundo[primeiro.indexOf(item)] = item


            if (primeiro.indexOf(item) === (primeiro.length - 1)) {

           // }

            if (primeiro.indexOf(item) === (primeiro.length - 1)) {
                if (primeiro.length > segundo.length) {

                    segundo.push(copy[project.indexOf(segundo)])
                } else if (primeiro.length < segundo.length) {

                    primeiro.push(copy[project.indexOf(primeiro)])

                   /// if (Array.isArray(anterior)) {

                   //     if (primeiro.length > anterior.length) {

                    //        project[project.indexOf(anterior)].push(copy[project.indexOf(anterior)])

                   //     }
                    }
                }
            }
            if (primeiro.indexOf(item) === (primeiro.length - 1)) {
                if (primeiro.length > segundo.length) {

                    segundo.push(copy[project.indexOf(segundo)])
                } else if (primeiro.length < segundo.length) {

                    primeiro.push(copy[project.indexOf(primeiro)])
                }
            }

        }





        for (let item of project) {
            let verif = false
            for (let i in item) {

                if (item[i].hora_fim > hora_fim[project.indexOf(item)]) {



                    if (project[project.indexOf(item) + 1][0].id === 0) {

                        project[project.indexOf(item) + 1][0] = item[i]



                        verif = true
                    } else {

                        organizar(item, project[project.indexOf(item) + 1], project[project.indexOf(item) - 1], item[i])
                        verif = true
                        // project[parseInt(item[i].indice) + 1].push(item[i])
                    }


                }



            }
            if (verif) {
                if (Array.isArray(project[project.indexOf(item) + 1])) {
                    if (item.length > project[project.indexOf(item) + 1].length) {

                        project[project.indexOf(item) + 1].push(copy[project.indexOf(project[project.indexOf(item) + 1])])

                    } else if (item.length < project[project.indexOf(item) + 1].length) {

                        item.push(copy[project.indexOf(item)])
                        if(Array.isArray(project[project.indexOf(item) - 1])){
                        if (item.length > project[project.indexOf(item) - 1].length) {

                            project[project.indexOf(item) - 1].push(copy[project.indexOf(item - 1)])

                        }
                    }

                    }
                    //segundo teste
                    if (item.length > project[project.indexOf(item) + 1].length) {

                        project[project.indexOf(item) + 1].push(copy[project.indexOf(project[project.indexOf(item) + 1])])

                    } else if (item.length < project[project.indexOf(item) + 1].length) {

                        item.push(copy[project.indexOf(item)])
                    }
                }
            }
            // console.log(item)


        }

        res.json(project);
    },
    buscarBloqueio: async (req, res) => {
        let json = []

        let data = req.params.data

        let unidade = req.params.unidade

        let horarios = [
            '08:00',
            '08:40',
            '09:20',
            '10:00',
            '10:40',
            '11:20',
            '12:00',
            '12:40',
            '13:20',
            '14:00',
            '14:40',
            '15:20',
            '16:00',
            '16:40',
            '17:20',
            '18:00',
            '18:40',
            '19:20',
            '20:00',
            '20:40',
            '21:20',



        ]

        for (let i in horarios) {


        }



        let agendamento = await MaestrinService.buscarBloqueio(data, unidade)

        for (let i in agendamento) {
            json.push({
                id: agendamento[i].id,
                user: agendamento[i].user,
                id_venda_sub: agendamento[i].id_venda_sub,
                sala: agendamento[i].sala,
                data: moment(agendamento[i].data).format('YYYY-MM-DD'),
                hora: agendamento[i].hora.substr(0, 5),
                hora_fim: agendamento[i].hora_fim.substr(0, 5),
                nome_procedimento: agendamento[i].nome_procedimento,
                indice: agendamento[i].indice,
                unidade: agendamento[i].unidade,
                nota: agendamento[i].nota,
                data_fim: moment(agendamento[i].data_fim).format('YYYY-MM-DD'),
                data_agendamento: agendamento[i].data_agendamento

            })
        }

        let resp = []

        for (let i in json) {
            let project = []
            if (json[i].data < data && json[i].data_fim > data) {
                for (let j in horarios) {

                    project.push({
                        id: json[i].id,
                        user: json[i].user,
                        id_venda_sub: json[i].id_venda_sub,
                        sala: json[i].sala,
                        data: json[i].data,
                        hora: json[i].hora.substr(0, 5),
                        hora_fim: json[i].hora_fim.substr(0, 5),
                        nome_procedimento: json[i].nome_procedimento,
                        indice: j,
                        unidade: json[i].unidade,
                        nota: json[i].nota,
                        data_fim: json[i].data_fim,
                        data_agendamento: json[i].data_agendamento
                    })
                }
            } else if (json[i].data < data) {

                for (let j in horarios) {

                    if (json[i].hora_fim > horarios[j]) {

                        project.push({
                            id: json[i].id,
                            user: json[i].user,
                            id_venda_sub: json[i].id_venda_sub,
                            sala: json[i].sala,
                            data: json[i].data,
                            hora: json[i].hora.substr(0, 5),
                            hora_fim: json[i].hora_fim.substr(0, 5),
                            nome_procedimento: json[i].nome_procedimento,
                            indice: j,
                            unidade: json[i].unidade,
                            nota: json[i].nota,
                            data_fim: json[i].data_fim,
                            data_agendamento: json[i].data_agendamento
                        })

                    } else {

                        project.push({
                            sala: json[i].sala,
                            indice: j,
                            hora: horarios[j]
                        })

                    }

                }
            } else if (json[i].data_fim > data) {

                for (let j in horarios) {

                    if (json[i].hora <= horarios[j]) {


                        project.push({
                            id: json[i].id,
                            user: json[i].user,
                            id_venda_sub: json[i].id_venda_sub,
                            sala: json[i].sala,
                            data: json[i].data,
                            hora: json[i].hora.substr(0, 5),
                            hora_fim: json[i].hora_fim.substr(0, 5),
                            nome_procedimento: json[i].nome_procedimento,
                            indice: j,
                            unidade: json[i].unidade,
                            nota: json[i].nota,
                            data_fim: json[i].data_fim,
                            data_agendamento: json[i].data_agendamento
                        })

                    } else {

                        project.push({
                            sala: json[i].sala,
                            indice: j,
                            hora: horarios[j]
                        })

                    }

                }
            } else {

                for (let j in horarios) {

                    if (json[i].hora <= horarios[j]
                        &&
                        json[i].hora_fim >= moment('2020 01 01 ' + horarios[j]).add(40, 'minutes').format('HH:mm')) {

                        project.push({
                            id: json[i].id,
                            user: json[i].user,
                            id_venda_sub: json[i].id_venda_sub,
                            sala: json[i].sala,
                            data: json[i].data,
                            hora: json[i].hora.substr(0, 5),
                            hora_fim: json[i].hora_fim.substr(0, 5),
                            nome_procedimento: json[i].nome_procedimento,
                            indice: j,
                            unidade: json[i].unidade,
                            nota: json[i].nota,
                            data_fim: json[i].data_fim,
                            data_agendamento: json[i].data_agendamento
                        })

                    } else {

                        project.push({
                            sala: json[i].sala,
                            indice: j,
                            hora: horarios[j]
                        })

                    }

                }

            }

            resp.push(project)
            //console.log(project)
        }

        res.json(resp);
    },


    buscarDesativados: async (req, res) => {
        let json = []


        let unidade = req.params.unidade

        let users = await MaestrinService.buscarDesativados(unidade)

        for (let i in users) {
            json.push({
                nome_cliente: users[i].nome_cliente,
                data_fim: users[i].data_fim,
                hora: users[i].hora.substr(0, 5),
                atendente: users[i].atendente,
                nome_procedimento: users[i].nome_procedimento,
                nota: users[i].nota
            })
        }



        res.json(json);
    },
    buscarUltimo: async (req, res) => {
        let json = {}
        let user = req.params.user
        let users = await MaestrinService.buscarUltimo(user)

        json = {
            // id: users[0].id,
            id_cliente: users[0].id_cliente,
            nome_cliente: users[0].nome_cliente,
            telefone: users[0].telefone,
            user: users[0].user,
            id_venda_sub: users[0].id_venda_sub,
            procedimento: users[0].procedimento,
            sala: users[0].sala,
            data: users[0].data,
            hora: users[0].hora.substr(0, 5),
            hora_fim: users[0].hora_fim.substr(0, 5),
            duracao: users[0].duracao,
            atendente: users[0].atendente,
            assinado: users[0].assinado,
            confirm: users[0].confirm,
            indice: users[0].indice,
            nome_procedimento: users[0].nome_procedimento,
            unidade: users[0].unidade
        }


        res.json(json);
    },
    buscarPDF: async (req, res) => {
        let json = []

        let data = req.params.data
        let atendente = req.params.atendente
        let unidade = req.params.unidade

        let users = await MaestrinService.buscarSubPDF(data, atendente, unidade)


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

            }


            if (users[i].nome_cliente !== 'Aberto') {

                // //console.log('users:'+users[i].nome_cliente)

                json.push({
                    id: users[i].id,
                    id_cliente: users[i].id_cliente,
                    nome_cliente: users[i].nome_cliente,
                    telefone: users[i].telefone,
                    user: users[i].user,
                    id_venda_sub: users[i].id_venda_sub,
                    procedimento: users[i].procedimento,
                    sala: valores.length > 0 ?
                        users[i].sala : '-',
                    data: users[i].data,
                    hora: users[i].hora.substr(0, 5),
                    hora_fim: users[i].hora_fim.substr(0, 5),
                    duracao: users[i].duracao,
                    atendente: users[i].atendente,
                    assinado: users[i].assinado,
                    confirm: users[i].confirm,
                    indice: users[i].indice,
                    nome_procedimento: valores.length > 0 ?
                        users[i].nome_procedimento : '',
                    unidade: users[i].unidade,
                    nota: users[i].nota,
                    rp: valores.length > 0 ?
                        (parseFloat(valores[0].valor) - parseFloat(valores[0].desconto)) / parseInt(users[i].qnt_sessao)
                        : '-',
                    sessoes: valores.length > 0 ?
                        `${parseInt(count[Object.keys(count)[0]]) + 1}/${parseInt(users[i].qnt_sessao)}`
                        : '-',

                })
                // //console.log('json:'+json[i].nome_cliente)
            }
        }
        ////console.log(users)
        res.json(json);
    },
    buscar_p: async (req, res) => {
        let json = []

        let users = await MaestrinService.buscar_p()

        for (let i in users) {
            json.push({
                id: users[i].login

            })

        }

        res.json(json);
    },
    buscarClientes: async (req, res) => {
        let json = []

        let users = await MaestrinService.buscarClientes()

        for (let i in users) {
            // users[i].data ? users[i].data = users[i].data.substr(0,10) : //console.log(users[i])
            json.push({
                id_cliente: users[i].id_cliente,
                nome_cliente: users[i].nome_cliente,
                telefone: users[i].telefone,
            })
        }

        res.json(json);
    },
    buscarSalas: async (req, res) => {
        let json = []
        let unidade = req.params.unidade
        let salas = await MaestrinService.buscarSalas(unidade)

        for (let i in salas) {
            // salas[i].data ? salas[i].data = salas[i].data.substr(0,10) : //console.log(salas[i])
            json.push({
                id: salas[i].id,
                nome: salas[i].nome,
                indice: salas[i].indice,
                unidade: salas[i].unidade,
                qnt: salas[i].qnt,
                duracao: salas[i].duracao
            })
        }

        res.json(json);
    },


    buscarPDFcli: async (req, res) => {
        let json = []

        let id_cliente = req.params.id_cliente
        let inicio = req.params.inicio
        let fim = req.params.fim

        let users = await MaestrinService.buscarPDFcli(id_cliente, inicio, fim)

        for (let i in users) {
            // users[i].data ? users[i].data = users[i].data.substr(0,10) : //console.log(users[i])
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
                unidade: users[i].unidade


            })
        }

        res.json(json);
    },
    buscarAtendentes: async (req, res) => {
        let json = []

        let unidade = req.params.unidade

        let atendentes = await MaestrinService.buscarAtendentes(unidade)

        for (let i in atendentes) {
            json.push({
                id: atendentes[i].id,
                login: atendentes[i].login,
                nome: atendentes[i].nome,
                unidade: atendentes[i].unidade,
                seg: atendentes[i].seg,
                ter: atendentes[i].ter,
                qua: atendentes[i].qua,
                qui: atendentes[i].qui,
                sex: atendentes[i].sex,
                sab: atendentes[i].sab,
                dom: atendentes[i].dom
            })
        }
        res.json(json);
    },
    attAssinado0: async (req, res) => {
        let json = []

        let data = moment()
        //let hora = req.params.hora

        let resposta = ''
        let result = []

        let resp = await MaestrinService.buscarVerificarAgendaP(data.format("YYYY-MM-DD"), data.format("HH:mm"))

        for (let i in resp) {

            json.push({

                id: resp[i].id,
                id_venda_sub: resp[i].id_venda_sub,
                hora_fim: resp[i].hora_fim,


            })
        }

        if (json.length > 0) {

            for (let i in json) {

                if (parseInt(json[i].id_venda_sub) < 5) {
                    await MaestrinService.excluir(json[i].id)
                } else {
                    result = await MaestrinService.buscarAssAgendaProc(data.format("YYYY-MM-DD"), json[i].id_venda_sub)

                    if (result.length === 1) {
                        await MaestrinService.alterarAssinado(result[0].id, json[i].id)
                    } else if (result.length > 1) {
                        for (let j in result) {

                            let result2 = await MaestrinService.buscarAssinadoAgendaP(result[j].id)

                            if (result2.length === 0) {
                                await MaestrinService.alterarAssinado(result[j].id, json[i].id)
                            }
                        }
                    } else {
                        if (json[i]) {
                            await MaestrinService.alterarAssinado(1, json[i].id)
                        }
                    }
                }
            }
        }
        // result.length > 0 && //console.log(result)

        res.json(result);

    },
    attAssinado: async (req, res) => {


        let data = moment().format("YYYY-MM-DD")
        let hora = moment().format("HH:mm")

        let assinatura = await MaestrinService.getLastAP()
        let result = await MaestrinService.updateAssinado(assinatura, data)
        let json = result.changedRows == 1 ? assinatura : 0

        console.log('update:')
        console.log(json)
        await MaestrinService.updateNaoAssinado(data, hora)
        await MaestrinService.desativarRegistros(data, hora)

        res.json(json);

    },
    buscarAtendente: async (req, res) => {
        let json = []

        let nome = req.params.nome

        let atendente = await MaestrinService.buscarAtendente(nome)

        let horarios = [
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ]
        for (let i in atendente[0].seg) {
            horarios[0].push(atendente[0].seg.substr(i, 1))
            horarios[1].push(atendente[0].ter.substr(i, 1))
            horarios[2].push(atendente[0].qua.substr(i, 1))
            horarios[3].push(atendente[0].qui.substr(i, 1))
            horarios[4].push(atendente[0].sex.substr(i, 1))
            horarios[5].push(atendente[0].sab.substr(i, 1))
            horarios[6].push(atendente[0].dom.substr(i, 1))
        }

        json.push([
            { nome: 'Seg', check: horarios[0] },
            { nome: 'Ter', check: horarios[1] },
            { nome: 'Qua', check: horarios[2] },
            { nome: 'Qui', check: horarios[3] },
            { nome: 'Sex', check: horarios[4] },
            { nome: 'Sab', check: horarios[5] },
            { nome: 'Dom', check: horarios[6] },

        ])

        ////console.log(horarios)

        res.json(json);

    },

    disp: async (req, res) => {


        let unidade = req.params.unidade
        let sala = await MaestrinService.buscarSala(req.params.sala)
        let json = []
        let atendente = req.params.atendente
        let data = req.params.data
        let hora = req.params.hora
        // let hora2 = moment('2020 01 01 ' + hora1).clone().add(1, 'minutes').format('HH:mm')

        let resp2 = { disp: true, result: sala[0].duracao }
        let hora_fim = req.params.hora_fim
        //  let hora_fim1 = moment('2020 01 01 ' + hora_fim2).clone().subtract(1, 'minutes').format('HH:mm')
        let resp = await MaestrinService.disp(req.params.sala, unidade, data, hora, hora_fim)
        // if(resp.length === 0){
        //     resp = await MaestrinService.disp2(data, req.params.sala, unidade)
        // }
        ////console.log(hora1+','+hora_fim1+','+hora2+','+hora_fim2)
        for (let i in resp) {
            json.push({
                id: resp[i].id,

                sala: resp[i].sala,

                atendente: resp[i].atendente,


            })
        }

        // //console.log(json)
        //resp.length > 0 ?  res.json(false) : res.json(true)
        if (json.length >= parseInt(sala[0].qnt)) {
            // //console.log('maior')
            // //console.log(sala)
            resp2 = { disp: false, result: sala[0].duracao, atendente: json[0].atendente, id: json[0].id }
            for (let i in json) {
                //   //console.log('menor')
                //   //console.log(sala)
                if (json[i].atendente == atendente) {
                    resp2 = { disp: true, result: sala[0].duracao }
                    // //console.log(sala)
                    //     //console.log(req.params.sala)
                }

            }

        }

        res.json(resp2)
    },
    inserir: async (req, res) => {
        let json = { error: '', result: {} }

        let user = {
            id_cliente: req.body.id_cliente,
            nome_cliente: req.body.nome_cliente,
            telefone: req.body.telefone,
            id_venda_sub: req.body.id_venda_sub,
            procedimento: req.body.procedimento,
            sala: req.body.sala,
            data: req.body.data,
            user: req.body.user,
            hora: req.body.hora,
            hora_fim: req.body.hora_fim,
            duracao: req.body.duracao,
            mens_enviada: req.body.mens_enviada || 1,
            atendente: req.body.atendente,
            indice: req.body.indice,
            nome_procedimento: req.body.nome_procedimento.indexOf('(') > 0 ? req.body.nome_procedimento.substr(0, req.body.nome_procedimento.indexOf('(')) : req.body.nome_procedimento,
            unidade: req.body.unidade,
            nota: req.body.nota

        }

        //console.log(user)

        let UserID = await MaestrinService.insert(user);
        json.result = {
            id: UserID,
            id_cliente: user.id_cliente,
            nome_cliente: user.nome_cliente,
            telefone: user.telefone,
            id_venda_sub: user.id_venda_sub,
            procedimento: user.procedimento,
            sala: user.sala,
            user: user.user,
            data: user.data,
            hora: user.hora,
            hora_fim: user.hora_fim,
            atendente: user.atendente,
            indice: user.indice,
            nome_procedimento: user.nome_procedimento,
            unidade: user.unidade,
            nota: user.nota
        };

        res.json(json)
    },
    insertBlockSala: async (req, res) => {
        let json = { error: '', result: {} }
        let block = req.body

        json.result = await MaestrinService.insertBlockSala(block);


        res.json(json)
    },
    insertAtend: async (req, res) => {
        let json = { error: false, result: {} }

        let user = {
            login: req.body.login,
            nome: req.body.nome,
            unidade: req.body.unidade
        }

        let resp = await MaestrinService.buscarNomeAtend(req.body.nome)
        if (resp.length === 0) {

            let UserID = await MaestrinService.insertAtend(user);
            json.result = {
                id: UserID,
                login: user.login,
                nome: user.nome,
                unidade: user.unidade
            }
        } else {
            json.error = true
            json.result = resp[0]

        }
        // //console.log(json)
        res.json(json)
    },
    insertSala: async (req, res) => {
        let json = { error: false, result: {} }


        let sala = req.body
        json.result = await MaestrinService.insertSala(sala);
        // //console.log(json)
        res.json(json)
    },
    confirmarAgenda: async (req, res) => {
        let json = { error: '', result: {} }

        let id_cliente = req.params.id_cliente
        let data = req.params.data.substr(0, 10)
        let value = req.params.value
        let id_venda_sub = req.params.id_venda_sub

        if (value == 1) {
            let select = await MaestrinService.buscarConfirm(data, id_cliente)

            await MaestrinService.confirmarAgenda(value, data, id_cliente);
            for (let i of select) {

                let result = await MaestrinService.buscarAssAgendaProc(data, i.id_venda_sub)

                if (result.length === 1) {
                    await MaestrinService.alterarAssinado(result[0].id, i.id)
                } else if (result.length > 1) {
                    for (let j in result) {

                        let result2 = await MaestrinService.buscarAssinadoAgendaP(result[j].id)

                        if (result2.length === 0) {
                            await MaestrinService.alterarAssinado(result[j].id, json[i].id)
                        }
                    }
                } else {

                    let login = await ProcService.buscarLogin_p(i.atendente)
                    let resp2 = await ProcService.buscarDataAgendaP(data, i.id_venda_sub)
                    await ProcService.agendar(data, resp2.length, login[0].login, i.id_venda_sub)
                    //////console.log("Agendado:" + 'qnt: ' + resp2.length + '-' + login[0].login + 'venda: ' + i.id_venda_sub)
                    await MaestrinService.confirmarAgenda(value, data, id_venda_sub);
                }
            }


        } else {
            await MaestrinService.dConfirmarAgenda(value, data, id_venda_sub);
            await ProcService.agendar('0000-00-00', '0', '', id_venda_sub)
        }

        res.json('agenda' + id_cliente + ' valor:' + value)

    },
    alterar: async (req, res) => {
        let json = { error: '', result: {} }

        let agenda = req.body
        ////console.log(agenda)

        await MaestrinService.alterar(agenda);
        json.result = { id: req.body.id };
        ////console.log(json)
        res.json(json)
    },
    desativarRegistro: async (req, res) => {
        let json = { error: '', result: {} }

        let agenda = req.body
        ////console.log(agenda)
        if (parseInt(agenda.assinado) > 5) {
            //console.log(agenda)
            await MaestrinService.cancelarAP(agenda.assinado);
        }

        await MaestrinService.desativarRegistro(agenda);
        json.result = { id: req.body.id };
        ////console.log(json)
        res.json(json)
    },
    alterarAgenda: async (req, res) => {
        let json = { error: '', result: {} }

        let agenda = req.body
        let id = req.params.id
        ////console.log(agenda)


        if (parseInt(agenda.assinado) > 5) {
            ////console.log('maior')
            let login = await ProcService.buscarLogin_p(agenda.atendente)
            //console.log(`${agenda.data.substr(0, 10)} ${agenda.hora}`)
            await MaestrinService.alterarAtendenteAP(`${agenda.data} ${agenda.hora}`, login[0].login, agenda.assinado)

        }


        await MaestrinService.alterarAgenda(agenda, id);
        json.result = { id: id };
        ////console.log(json)
        res.json(json)
    },
    alterarA: async (req, res) => {
        let json = { error: '', result: {} }

        let atendente = req.params.atendente
        let unidade = req.params.unidade

        await MaestrinService.alterarA(atendente, unidade);
        json.result = { atendente: atendente, unidade: unidade };
        //.log(json)
        res.json(json)
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
        // .log(list)
        res.json(json)
    },
    alterarSala: async (req, res) => {
        let json = { error: '', result: {} }

        let sala = req.body

        json.result = await MaestrinService.alterarSala(sala);

        res.json(json)
    },
    excluir: async (req, res) => {
        let json = { error: '', result: {} }
        await MaestrinService.excluir(req.params.id)

        res.json(json)
    },
    excluirSala: async (req, res) => {
        let json = { error: '', result: {} }
        await MaestrinService.excluirSala(req.params.id)

        res.json(json)
    }
}