const db = require('../db2')

module.exports = {
    
    buscarTodos: (id) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM control where iduser = ?',[id], (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },
    buscarTudo: (where) => {
        return new Promise((aceito, rejeitado)=>{
            db.query(`SELECT control.* ,users.name, records.id as idrecord , records.id as idrecord FROM control inner join users on control.iduser = users.id inner join records on users.id = records.iduser ${where} order by data desc`, (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },
   
    buscarCountControl: () => {
        return new Promise((aceito, rejeitado)=>{
            db.query(`SELECT count(*) as total, sum(confirm) as pago, sum(valor) as valor_total FROM control `, (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    }, 
    //buscar valor recebido confirm ==1
    buscarCountControl2: () => {
        return new Promise((aceito, rejeitado)=>{
            db.query(`SELECT sum(valor) as valor_pago FROM control where confirm = 1`, (error, results)=>{
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
    temp0: () => {
        return new Promise((aceito,rejeitado) =>{
            db.query('SELECT id FROM users', (error, results)=>{
                if(error) { rejeitado(error); return; }                
                if(results[0]){
                    aceito(results)
                }else{
                    aceito(false)
                }
            })
        })
    },
    temp: (id) => {
        return new Promise((aceito,rejeitado) =>{
            db.query('SELECT data FROM control WHERE iduser = ? order by data desc limit 1', [id], (error, results)=>{
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
    alterar: (control) => {
        return new Promise((aceito,rejeitado) =>{
            
            db.query('UPDATE control SET sessao=?, valor=?, data=?, hora=? WHERE id = ?',
            [ control.sessao, control.valor, control.data, control.hora, control.id] ,
            (error, results)=>{
                if(error) { rejeitado(error); return; }                
                aceito(results.insertId)
            }
            )
        })
    },
    attUltimo: (ultimo, iduser) => {
        return new Promise((aceito,rejeitado) =>{
            
            db.query('UPDATE records SET ultimo = ? WHERE iduser = ? ',
            [ultimo, iduser] ,
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