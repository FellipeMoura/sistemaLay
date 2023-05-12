const LoginService = require('../services/LoginService')

module.exports = {
    verificar: async(req,res)=> {
        let json = {error:'',result:{}}

        const user = req.params.user
        const pass = req.params.pass

        let login = await LoginService.signin(user,pass)


        json.result = login 

        
        res.json(json)
    }
}