const SupervisaoService = require('../services/SupervisaoService')

module.exports = {
    buscarTodos: async(req,res)=> {
        let json = []
        let id = req.params.id
        let supervisao = await SupervisaoService.buscarTodos(id)

        for(let i in supervisao){
            json.push({
                id: supervisao[i].id,
                iduser: supervisao[i].iduser,
                conceito: supervisao[i].conceito,
                data: supervisao[i].data,
                supervisao: supervisao[i].supervisao,
                sessao: supervisao[i].sessao
            })
        }
        res.json(json)
    },
    inserir: async(req,res)=> {
        let json = {error:'',result:{}}
        
        let supervisao ={

            iduser: req.body.iduser,
            conceito: req.body.conceito,
            data: req.body.data,
            supervisao: req.body.supervisao,
            sessao: req.body.sessao
        }
        console.log(supervisao)
        let SessionID = await SupervisaoService.insert
        (supervisao);
        json.result ={
            id: SessionID,
            iduser: supervisao.iduser,
            conceito: supervisao.conceito,
            data: supervisao.data,
            supervisao: supervisao.supervisao,
            sessao: supervisao.sessao

            
        };
        
        res.json(json)
    },
    alterar: async(req,res)=> {
        let json = {error:'',result:{}}
        
        let id = req.params.id

       let supervisao ={

        iduser: req.body.iduser,
        conceito: req.body.conceito,
        data: req.body.data,
        supervisao: req.body.supervisao
        }
        await SupervisaoService.alterar(id, supervisao);
        json.result ={
            id, 
            iduser: supervisao.iduser,
            conceito: supervisao.conceito,
            data: supervisao.data,
            supervisao: supervisao.supervisao
        };
        
        res.json(json)
    },
    excluir: async(req,res) =>{
        let json = {error: '', result:{}}
        await SupervisaoService.excluir(req.params.id)

        res.json(json)
    }
}