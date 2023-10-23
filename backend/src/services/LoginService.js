const db = require('../db2')

module.exports = {

    signin: (user, pass) => {
        return new Promise((aceito,rejeitado) =>{
            db.query('SELECT * FROM `login` WHERE user = ? AND pass = ?', [user, pass], (error, results)=>{
                if(error) { rejeitado(error); return; }                
                if(results[0]){
                    aceito(results[0])
                }else{
                    aceito(false)
                }
            })
        })
    }

}