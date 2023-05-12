const SessionsService = require('../services/SessionsService')

module.exports = {
    buscarTodos: async(req,res)=> {
        let json = []
        let id = req.params.id
        let sessions = await SessionsService.buscarTodos(id)

        for(let i in sessions){
            json.push({
                id: sessions[i].id,
                idrecord: sessions[i].idrecord,
                iduser: sessions[i].iduser,
                session: sessions[i].session,
                demanda: sessions[i].demanda,
                evolucao: sessions[i].evolucao,
                proc: sessions[i].proc,
                data: sessions[i].data,
                hora: sessions[i].hora
            })
        }
        res.json(json)
    },
    inserir: async(req,res)=> {
        let json = {error:'',result:{}}
        
        let session ={

            iduser: req.body.iduser,
            idrecord: req.body.idrecord,
            session: req.body.session,
            demanda: req.body.demanda,
            evolucao: req.body.evolucao,
            proc: req.body.proc,
            data: req.body.data,
            hora: req.body.hora
        }
        console.log(session)
        let SessionID = await SessionsService.insert
        (session);
        json.result ={
            id: SessionID,
            iduser: session.iduser,
            idrecord: session.idrecord,
            session: session.session,
            demanda: session.demanda,
            evolucao: session.evolucao,
            proc: session.proc,
            data: session.data,
            hora: session.hora

            
        };
        
        res.json(json)
    },
    excluir: async(req,res) =>{
        let json = {error: '', result:{}}
        await SessionsService.excluir(req.params.id)

        res.json(json)
    }
}