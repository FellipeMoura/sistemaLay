const db = require('../db')

module.exports = {
    
    buscarTodos: (id) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM control where iduser = ?',[id], (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },

    buscarUm: (id) => {
        return new Promise((aceito,rejeitado) =>{
            db.query('SELECT * FROM users WHERE id = ?', [id], (error, results)=>{
                if(error) { rejeitado(error); return; }                
                if(results[0]){
                    aceito(results[0])
                }else{
                    aceito(false)
                }
            })
        })
    },
    insert: (control) => {
        return new Promise((aceito,rejeitado) =>{
            db.query('INSERT INTO control(iduser, sessao, valor, confirm, data, hora) VALUES (?,?,?,?,?,?)',
            [control.iduser, control.sessao, control.valor, control.confirm, control.data, control.hora] ,
              (error, results)=>{
                if(error) { rejeitado(error); return; }                
                aceito(results.insertId)
            })
        })
    },
    alterar: (id, control) => {
        return new Promise((aceito,rejeitado) =>{
            
            db.query('UPDATE control SET iduser=?, sessao=?, valor=?, confirm=?, data=?, hora WHERE id = ?',
            [control.iduser, control.sessao, control.valor, control.confirm, control.data, control.hora, id] ,
            (error, results)=>{
                if(error) { rejeitado(error); return; }                
                aceito(results.insertId)
            }
            )
        })
    },
    confirmar: (id) => {
        return new Promise((aceito,rejeitado) =>{
            
            db.query('UPDATE control SET confirm=1 WHERE id = ?',[id] ,
            (error, results)=>{
                if(error) { rejeitado(error); return; }                
                aceito(results.insertId)
            }
            )
        })
    },
    excluir: (id) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('DELETE FROM control WHERE id= ?', [id], (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    }

}