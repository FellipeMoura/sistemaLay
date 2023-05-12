const LoginService = require('../services/LoginService')
const jwt = require('jsonwebtoken');

module.exports = {
    verificar: async(req,res)=> {

        const user = req.params.user
        const pass = req.params.pass

        let login = await LoginService.signin(user,pass)

        
        res.json({
            login,
            token: jwt.sign(login, 'PRIVATEKEY')
        })
    }
}