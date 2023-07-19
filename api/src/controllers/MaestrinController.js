const MaestrinService = require('../services/MaestrinService')
const moment =require('moment')

module.exports = {
    buscarTodos: async (req, res) => {
        let json = []

        let data = req.params.data
        let atendente = req.params.atendente
        let unidade = req.params.unidade

        let horarios = [
            '08:00:00',
            '08:40:00',
            '09:20:00',
            '10:00:00',
            '10:40:00',
            '11:20:00',
            '12:00:00',
            '12:40:00',
            '13:20:00',
            '14:00:00',
            '14:40:00',
            '15:20:00',
            '16:00:00',
            '16:40:00',
            '17:20:00',
            '18:00:00',
            '18:40:00',
            '19:20:00'
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
                hora_fim: moment(`2020.05.05 ${horarios[i]}`).add(40, 'minutes').format('HH:mm'),
                atendente: atendente,
                indice: horarios.indexOf(horarios[i]),
                nome_procedimento: '',
                unidade: 0

            }])
        }

        let users = await MaestrinService.buscarTodos(data, atendente, unidade)

        for (let i in users) {
            // users[i].data ? users[i].data = users[i].data.substr(0,10) : console.log(users[i])
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
                hora: users[i].hora.substr(0,5),
                hora_fim:users[i].hora_fim.substr(0,5),
                atendente: users[i].atendente,
                indice: users[i].indice,
                nome_procedimento: users[i].nome_procedimento,
                unidade: users[i].unidade


            })
        }


        for (let i in json) {

            project[json[i].indice][0].id === 0? project[json[i].indice][0] = json[i] : project[json[i].indice].push(json[i])

        }

        for(let i in project){

            if(i>0){
                if(project[i-1][0].hora_fim > project[i][0].hora){
                    //console.log(project[i])
                    //console.log(project[i-1])
                    project[i]=project[i-1]
                    project[i][0].indice = parseInt(project[i][0].indice)+1
                    //console.log(project[i][0].indice)
                    
                } 
            }
            }
        //console.log(project)

        res.json(project);

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
    buscarAtendente: async (req, res) => {
        let json = []

        let nome = req.params.nome

        let atendente = await MaestrinService.buscarAtendente(nome)
        
        let horarios=[
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ]
        for(let i in atendente[0].seg){
            horarios[0].push(atendente[0].seg.substr(i, 1))
            horarios[1].push(atendente[0].ter.substr(i, 1))
            horarios[2].push(atendente[0].qua.substr(i, 1))
            horarios[3].push(atendente[0].qui.substr(i, 1))
            horarios[4].push(atendente[0].sex.substr(i, 1))
            horarios[5].push(atendente[0].sab.substr(i, 1))
            horarios[6].push(atendente[0].dom.substr(i, 1))
            }

        json.push([
            {nome: 'Seg', check: horarios[0] },
            {nome: 'Ter', check: horarios[1] },
            {nome: 'Qua', check: horarios[2] },
            {nome: 'Qui', check: horarios[3] },
            {nome: 'Sex', check: horarios[4] },
            {nome: 'Sab', check: horarios[5] },
           { nome: 'Dom', check: horarios[6] },

        ])

        //console.log(horarios)

        res.json(json);

    },

    disp: async (req, res) => {

        let json = []

        let data = req.params.data
        let hora1 = req.params.hora
        let hora2= moment('2020 01 01 '+hora1).clone().add(1,'minutes').format('HH:mm')
        let sala = req.params.sala
        let unidade = req.params.unidade
        let hora_fim2 = req.params.hora_fim
        let hora_fim1 = moment('2020 01 01 '+hora_fim2).clone().subtract(1,'minutes').format('HH:mm')
        let resp = await MaestrinService.disp(data, sala, unidade, hora1, hora_fim1, hora2, hora_fim2)
        //console.log(hora1+','+hora_fim1+','+hora2+','+hora_fim2)
        for (let i in resp) {
            json.push({
                id: resp[i].id,
                id_cliente: resp[i].id_cliente,
                nome_cliente: resp[i].nome_cliente,
                telefone: resp[i].telefone,
                id_venda_sub: resp[i].id_venda_sub,
                procedimento: resp[i].procedimento,
                sala: resp[i].sala,
                user: resp[i].user,
                data: resp[i].data,
                hora: resp[i].hora,
                hora_fim: resp[i].hora_fim,
                atendente: resp[i].atendente,
                indice: resp[i].indice,
                nome_procedimento: resp[i].nome_procedimento,
                unidade: resp[i].unidade

            })
        }



        //resp.length > 0 ?  res.json(false) : res.json(true)
        json.length === 0 ? res.json(false) : res.json(json[0])
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
            atendente: req.body.atendente,
            indice: req.body.indice,
            nome_procedimento: req.body.nome_procedimento,
            unidade: req.body.unidade

        }
        //console.log(user)
       // let j =true;
       // let count = 0;
       // let inicio = moment("2023-01-01 "+user.hora)
       // let fim = moment("2023-01-01 "+user.hora_fim)
        //x.format('HH:mm')===y.format('HH:mm')? console.log('sim'):console.log('nao')
     //   while(j){
    //        fim > inicio.add(40, 'minutes') ?
    //            inicio.add(40,'minutes') 
    //            && count++
    //   :j=false
   //         console.log(count)
    
     //   }




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
            unidade: user.unidade
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
    confirmarAgenda: async (req, res) => {
        let json = { error: '', result: {} }

        let id = req.params.id

        await MaestrinService.confirmarAgenda(id);
        json.result = {id_venda_sub: id_venda_sub};
        //console.log(json)
        res.json(json)
    },
    alterarA: async (req, res) => {
        let json = { error: '', result: {} }

        let atendente = req.params.atendente
        let unidade = req.params.unidade

        await MaestrinService.alterarA(atendente, unidade);
        json.result = {atendente: atendente, unidade: unidade};
        //console.log(json)
        res.json(json)
    },
    alterarS: async (req, res) => {
        let json = { error: '', result: {} }

        let nome = req.params.nome

        let project = req.body

        let list = []
        
        for(let i in project){
            list.push(project[i].check)
        }

        let temp 
        for(let i in list){
            for(let j in list[i]){
               j==0 ? temp = list[i][j] : temp += list[i][j]
            }
            list[i]=temp
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