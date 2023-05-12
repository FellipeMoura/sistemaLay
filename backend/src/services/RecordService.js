const db = require('../db')

module.exports = {
    
    buscarTodos: () => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT records.*, users.name FROM records INNER JOIN users ON users.id=records.iduser', (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },

    buscarUm: (id) => {
        return new Promise((aceito,rejeitado) =>{
            db.query('SELECT records.*, users.name, users.nasc FROM records INNER JOIN users ON records.id = ? AND users.id=records.iduser', [id], (error, results)=>{
                if(error) { rejeitado(error); return; }                
                if(results[0]){
                    aceito(results[0])
                }else{
                    aceito(false)
                }
            })
        })
    },
    insert: (record) => {
        return new Promise((aceito,rejeitado) =>{
            db.query('INSERT INTO records(iduser, inicio, att, aa, ab, ac, ba, bb, bc, bd1, bd2, bd3, bd4, be, bf, bg, bh, bi, bj, bk1, bk2, bk3, bk4, bk5, bk6, bk7, bl, bm, ca) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [record.iduser, record.inicio,record.att, record.aa, record.ab, record.ac, record.ba, record.bb, record.bc, record.bd1, record.bd2, record.bd3, record.bd4, record.be, record.bf, record.bg, record.bh, record.bi, record.bj, record.bk1, record.bk2, record.bk3, record.bk4, record.bk5, record.bk6, record.bk7, record.bl, record.bm, record.ca],
            (error, results)=>{
                if(error) { rejeitado(error); return; }                
                aceito(results.insertId)
            })
        })
    },
    alterar: (iduser, record) => {
        return new Promise((aceito,rejeitado) =>{
            db.query('UPDATE records SET  aa= ?, ab= ?, ac= ?, ba= ?, bb= ?, bc= ?, bd1= ?, bd2= ?, bd3= ?, bd4= ?, be= ?, bf= ?, bg= ?, bh= ?, bi= ?, bj= ?, bk1= ?, bk2= ?, bk3= ?, bk4= ?, bk5= ?, bk6= ?, bk7= ?, bl= ?, bm= ?, ca= ?, obs= ? WHERE id = ?',
            [record.aa, record.ab, record.ac, record.ba, record.bb, record.bc, record.bd1, record.bd2, record.bd3, record.bd4, record.be, record.bf, record.bg, record.bh, record.bi, record.bj, record.bk1, record.bk2, record.bk3, record.bk4, record.bk5, record.bk6, record.bk7, record.bl, record.bm, record.ca, record.obs, iduser],
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