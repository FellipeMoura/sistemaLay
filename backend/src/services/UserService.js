const db = require('../db')

module.exports = {
    
    buscarTodos: () => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM users', (error, results)=>{
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
    insert: (user) => {
        return new Promise((aceito,rejeitado) =>{
            db.query('INSERT INTO users(name, cpf, endereco, tel, etel, email, sexo, nasc) VALUES (?,?,?,?,?,?,?,?)',
            [user.name, user.cpf, user.endereco, user.tel, user.etel, user.email, user.sexo, user.nasc] ,
            (error, results)=>{
                if(error) { rejeitado(error); return; }                
                aceito(results.insertId)
            })
        })
    },
    alterar: (id, user) => {
        return new Promise((aceito,rejeitado) =>{
            
            db.query('UPDATE users SET name = ?, cpf = ?, endereco = ?, tel = ?, etel = ?, email = ?, sexo = ?, nasc = ? WHERE id = ?',
            [user.name, user.cpf, user.endereco, user.tel, user.etel, user.email, user.sexo, user.nasc, id] ,
            (error, results)=>{
                if(error) { rejeitado(error); return; }                
                aceito(results.insertId)
            }
            )
        })
    },
    excluir: (id) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('DELETE FROM users WHERE id= ?', [id], (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    }

}