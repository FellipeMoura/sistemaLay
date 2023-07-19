const db = require('../db')

module.exports = {
    
    buscarTodos: (data, atendente, unidade) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM agenda_p WHERE data = ? AND atendente = ? AND unidade = ?',[data, atendente, unidade], (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },

    buscarAtendentes: (unidade) => {
        return new Promise((aceito,rejeitado) =>{
            db.query('SELECT * FROM atendentes WHERE unidade = ?', [unidade], (error, results)=>{               
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },
    buscarAtendente: (nome) => {
        return new Promise((aceito,rejeitado) =>{
            db.query('SELECT * FROM atendentes WHERE nome = ?', [nome], (error, results)=>{               
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },
    disp: (data,sala,unidade,hora1,hora_fim1,hora2,hora_fim2) => {
        return new Promise((aceito,rejeitado) =>{
            db.query('select * from agenda_p where data = ? and sala = ? and unidade = ? and ((hora BETWEEN ? and ? or hora_fim BETWEEN ? and ?) or (hora < ? and hora_fim > ? ))', [data,sala,unidade,hora1,hora_fim1,hora2,hora_fim2,hora1,hora_fim2], (error, results)=>{               
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },
    insert: (horario) => {
        return new Promise((aceito,rejeitado) =>{
            db.query('INSERT INTO `agenda_p`(`id_cliente`, `nome_cliente`,`telefone`, `id_venda_sub`, `procedimento`, `sala`,`user`, `data`, `hora`,`hora_fim`, `atendente`,`indice`, `nome_procedimento`, `unidade`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [horario.id_cliente, horario.nome_cliente, horario.telefone, horario.id_venda_sub, horario.procedimento, horario.sala, horario.user, horario.data, horario.hora, horario.hora_fim, horario.atendente, horario.indice, horario.nome_procedimento, horario.unidade],
            (error, results)=>{
                if(error) { rejeitado(error); return; }                
                aceito(results.insertId)
            })
        })
    },
    confirmarAgenda: (id) => {
        return new Promise((aceito,rejeitado) =>{
            
            db.query('UPDATE agenda_p SET confirm = 1, WHERE id = ?',
            [id] ,
            (error, results)=>{
                if(error) { rejeitado(error); return; }                
                aceito(results.insertId)
            }
            )
        })
    },
    alterarS: (name, agenda) => {
        return new Promise((aceito,rejeitado) =>{
            
            db.query('UPDATE atendentes SET seg = ?, ter = ?, qua = ?, qui = ?, sex = ?, sab = ?, dom = ? WHERE nome = ?',
            [agenda.seg, agenda.ter, agenda.qua, agenda.qui, agenda.sex, agenda.sab, agenda.dom, name] ,
            (error, results)=>{
                if(error) { rejeitado(error); return; }                
                aceito(results.insertId)
            }
            )
        })
    },
    alterarA: (atendente, unidade) => {
        return new Promise((aceito,rejeitado) =>{
            
            db.query('UPDATE atendentes SET unidade = ? WHERE nome = ?',
            [unidade, atendente] ,
            (error, results)=>{
                if(error) { rejeitado(error); return; }                
                aceito(results.insertId)
            }
            )
        })
    },
    excluir: (id) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('DELETE FROM agenda_p WHERE id= ?', [id], (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    }

}