const UserService = require('../services/UserService')

module.exports = {
    verificar: async(req,res)=> {
        let json = {error:'',result:{}}

        let login = req.params.login
        
        login.usuario == process.env.DB_NAME && login.senha == process.env.DB_PASS ?
            json.result = false : true

        
        res.json(json)
    },
    buscarTodos: async(req,res)=> {
        let json = []

        let users = await UserService.buscarTodos()

        for(let i in users){
            json.push({
                id: users[i].id,
                name: users[i].name,
                cpf: users[i].cpf,
                endereco: users[i].endereco,
                tel: users[i].tel,
                etel: users[i].etel,
                email: users[i].email,
                sexo: users[i].sexo,
                nasc: users[i].nasc
            })
        }
        res.json(json)
    },

    buscarUm: async(req,res)=> {
        let json = {error:'',result:{}}

        let id = req.params.id
        let user = await UserService.buscarUm(id)

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
        nasc: req.body.nasc
        }
        console.log(user)
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
            nasc: user.nasc
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
        nasc: req.body.nasc
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
            nasc: user.nasc
        };
        
        res.json(json)
    },
    excluir: async(req,res) =>{
        let json = {error: '', result:{}}
        await UserService.excluir(req.params.id)

        res.json(json)
    }
}