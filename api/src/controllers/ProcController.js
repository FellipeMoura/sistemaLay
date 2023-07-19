const ProcService = require('../services/ProcService')

module.exports = {
    buscarTodos: async(req,res)=> {
        let json = []
        let id = req.params.id
        let procs = await ProcService.buscarTodos(id)
        

        for(let i in procs){

            let count = await ProcService.buscarCOUNT(procs[i].id_vendas_sub)
            //console.log(count)
            if(parseInt(procs[i].qnt_sessao) - parseInt(count[Object.keys(count)[0]]) > 0){
                
                json.push({   
                    id_pacote: procs[i].id_pacote,
                    sala: procs[i].chave,           
                    nome: procs[i].nome,
                    id_vendas_sub: procs[i].id_vendas_sub,
                    total: procs[i].qnt_sessao,
                    restante: parseInt(procs[i].qnt_sessao) - parseInt(count[Object.keys(count)[0]])
                    
                })
            }
        }

        res.json(json)
    },

    buscarUm: async(req,res)=> {
        let json = {error:'',result:{}}

        let id = req.params.id
        let user = await UserService.buscarCOUNT(id)

        if(user){
            json.result = user
        }

        
        res.json(json)
    },
    inserir: async(req,res)=> {
        let json = {error:'',result:{}}
        
        let user ={
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
        json.result ={
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
    alterar: async(req,res)=> {
        let json = {error:'',result:{}}
        
        let id = req.params.id

        let user ={
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
        json.result ={
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
    agendar: async(req,res)=> {
        let json = {error:'',result:{}}
        
        let id = req.params.id
        let data = req.params.data

        
        await ProcService.agendar(id, data);
        json.result ={
            id: id,
            data: data
        };
        //console.log(json)
        res.json(json)
    },
    excluir: async(req,res) =>{
        let json = {error: '', result:{}}
        await UserService.excluir(req.params.id)

        res.json(json)
    }
}


