const db = require('../db2')

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
            db.query('INSERT INTO summarys(iduser, queixa, data, resumo, sessao) VALUES (?,?,?,?,?)',
            [summarys.iduser, summarys.queixa, summarys.data, summarys.resumo, summarys.sessao] ,
              (error, results)=>{
                if(error) { rejeitado(error); return; }                
                aceito(results.insertId)
            })
        })
    },
    alterar: (id, summarys) => {
        return new Promise((aceito,rejeitado) =>{
            
            db.query('UPDATE summarys SET queixa=?, data=?, resumo=? WHERE id = ?',
            [summarys.queixa, summarys.data, summarys.resumo, id] ,
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