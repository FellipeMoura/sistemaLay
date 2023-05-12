const db = require('../db')

module.exports = {
    
    buscarTodos: (id) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM sessions where idrecord = ?',[id], (error, results)=>{
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
    insert: (session) => {
        return new Promise((aceito,rejeitado) =>{
            db.query('INSERT INTO sessions(idrecord, session, demanda, evolucao, proc, data, hora) VALUES (?,?,?,?,?,?,?)',
            [session.idrecord, session.session, session.demanda, session.evolucao, session.proc, session.data, session.hora] ,
            (error, results)=>{
                if(error) { rejeitado(error); return; }                
                aceito(results.insertId)
            })
        })
    },
    alterar: (id, user) => {
        return new Promise((aceito,rejeitado) =>{
            
            db.query('UPDATE users SET name = ?, cpf = ?, endereco = ?, tel = ?, etel = ?, email = ?, sexo = ?, nasc = ? WHERE id = ?',
            [session.name, user.cpf, user.endereco, user.tel, user.etel, user.email, user.sexo, user.nasc, id] ,
            (error, results)=>{
                if(error) { rejeitado(error); return; }                
                aceito(results.insertId)
            }
            )
        })
    },
    excluir: (id) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('DELETE FROM sessions WHERE id= ?', [id], (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    }

}