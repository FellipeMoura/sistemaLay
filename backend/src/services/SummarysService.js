const db = require('../db')

module.exports = {
    
    buscarTodos: (id) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM summarys WHERE iduser=?',[id],(error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },
    insert: (summarys) => {
        return new Promise((aceito,rejeitado) =>{
            db.query('INSERT INTO summarys(iduser, queixa, data, resumo) VALUES (?,?,?,?)',
            [summarys.iduser, summarys.queixa, summarys.data, summarys.resumo] ,
              (error, results)=>{
                if(error) { rejeitado(error); return; }                
                aceito(results.insertId)
            })
        })
    },
    alterar: (id, summarys) => {
        return new Promise((aceito,rejeitado) =>{
            
            db.query('UPDATE summarys SET iduser=?, sessao=?, valor=?, confirm=?, data=?, hora WHERE id = ?',
            [summarys.iduser, summarys.sessao, summarys.valor, summarys.confirm, summarys.data, summarys.hora, id] ,
            (error, results)=>{
                if(error) { rejeitado(error); return; }                
                aceito(results.insertId)
            }
            )
        })
    },
    confirmar: (id) => {
        return new Promise((aceito,rejeitado) =>{
            
            db.query('UPDATE summarys SET confirm=1 WHERE id = ?',[id] ,
            (error, results)=>{
                if(error) { rejeitado(error); return; }                
                aceito(results.insertId)
            }
            )
        })
    },
    excluir: (id) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('DELETE FROM summarys WHERE id= ?', [id], (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    }

}