const db = require('../db2')

module.exports = {
    
    buscarTodos: (id) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM supervisao WHERE iduser=?',[id],(error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },
    insert: (supervisao) => {
        return new Promise((aceito,rejeitado) =>{
            db.query('INSERT INTO supervisao(iduser, conceito, data, supervisao, sessao) VALUES (?,?,?,?,?)',
            [supervisao.iduser, supervisao.conceito, supervisao.data, supervisao.supervisao, supervisao.sessao] ,
              (error, results)=>{
                if(error) { rejeitado(error); return; }                
                aceito(results.insertId)
            })
        })
    },
    alterar: (id, supervisao) => {
        return new Promise((aceito,rejeitado) =>{
            
            db.query('UPDATE supervisao SET conceito=?, data=?, supervisao=? WHERE id = ?',
            [supervisao.conceito, supervisao.data, supervisao.supervisao, id] ,
            (error, results)=>{
                if(error) { rejeitado(error); return; }                
                aceito(results.insertId)
            }
            )
        })
    },
    confirmar: (id) => {
        return new Promise((aceito,rejeitado) =>{
            
            db.query('UPDATE supervisao SET confirm=1 WHERE id = ?',[id] ,
            (error, results)=>{
                if(error) { rejeitado(error); return; }                
                aceito(results.insertId)
            }
            )
        })
    },
    excluir: (id) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('DELETE FROM supervisao WHERE id= ?', [id], (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    }

}