const SummarysService = require('../services/SummarysService')

module.exports = {
    buscarTodos: async(req,res)=> {
        let json = []
        let id = req.params.id
        let summarys = await SummarysService.buscarTodos(id)

        for(let i in summarys){
            json.push({
                id: summarys[i].id,
                iduser: summarys[i].iduser,
                queixa: summarys[i].queixa,
                data: summarys[i].data,
                resumo: summarys[i].resumo,
                sessao: summarys[i].sessao
            })
        }
        res.json(json)
    },
    inserir: async(req,res)=> {
        let json = {error:'',result:{}}
        
        let summarys ={

            iduser: req.body.iduser,
            queixa: req.body.queixa,
            data: req.body.data,
            resumo: req.body.resumo,
            sessao: req.body.sessao
        }
        console.log(summarys)
        let SessionID = await SummarysService.insert
        (summarys);
        json.result ={
            id: SessionID,
            iduser: summarys.iduser,
            queixa: summarys.queixa,
            data: summarys.data,
            resumo: summarys.resumo,
            sessao: summarys.sessao

            
        };
        
        res.json(json)
    },
    alterar: async(req,res)=> {
        let json = {error:'',result:{}}
        
        let id = req.params.id

       let summarys ={

        iduser: req.body.iduser,
        queixa: req.body.queixa,
        data: req.body.data,
        resumo: req.body.resumo
        }
        await SummarysService.alterar(id, summarys);
        json.result ={
            id, 
            iduser: summarys.iduser,
            queixa: summarys.queixa,
            data: summarys.data,
            resumo: summarys.resumo
        };
        
        res.json(json)
    },
    excluir: async(req,res) =>{
        let json = {error: '', result:{}}
        await SummarysService.excluir(req.params.id)

        res.json(json)
    }
}