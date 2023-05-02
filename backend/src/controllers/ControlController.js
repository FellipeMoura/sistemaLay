const ControlService = require('../services/ControlService')

module.exports = {
    buscarTodos: async(req,res)=> {
        let json = []
        let id = req.params.id
        let control = await ControlService.buscarTodos(id)

        for(let i in control){
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
    inserir: async(req,res)=> {
        let json = {error:'',result:{}}
        
        let control ={

            iduser: req.body.iduser,
            sessao: req.body.sessao,
            confirm: req.body.confirm,
            valor: req.body.valor,
            data: req.body.data,
            hora: req.body.hora
        }
        console.log(control)
        let SessionID = await ControlService.insert
        (control);
        json.result ={
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
    alterar: async(req,res)=> {
        let json = {error:'',result:{}}
        
        let id = req.params.id

       let control ={

            iduser: req.body.iduser,
            sessao: req.body.sessao,
            confirm: req.body.confirm,
            valor: req.body.valor,
            data: req.body.data,
            hora: req.body.hora
        }
        await ControlService.alterar(id, control);
        json.result ={
            id, 
            iduser: control.iduser,
            sessao: control.sessao,
            valor: control.valor,
            confirm: control.confirm,
            data: control.data,
            hora: control.hora
        };
        
        res.json(json)
    },
    confirmar: async(req,res)=> {
        let json = {error:'',result:{}}
        
        let id = req.params.id

        
      
        await ControlService.confirmar(id);
        json.result ={
            id, 
            //confirm: control.confirm,
        };
        res.json(json)
    },
    excluir: async(req,res) =>{
        let json = {error: '', result:{}}
        await ControlService.excluir(req.params.id)

        res.json(json)
    }
}