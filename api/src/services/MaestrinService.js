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
    buscarVerificarAgendaP: (data, hora) => {
        return new Promise((aceito,rejeitado) =>{
            db.query( 'select * from agenda_p where data = ? and hora < ? and confirm = 1 and assinado = 0',
            [data, hora], (error, results)=>{               
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },
    buscarAssAgendaProc: (data, id_sub_venda) => {
        return new Promise((aceito,rejeitado) =>{
            db.query( `select id from agenda_procedimento where data like "${data}%" and id_sub_venda = ? and assinatura is not null`,
            [id_sub_venda], (error, results)=>{               
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },
    buscarAssinadoAgendaP: (assinado) => {
        return new Promise((aceito,rejeitado) =>{
            db.query( 'select id from agenda_p where assinado = ?',
            [assinado], (error, results)=>{               
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },
    alterarAssinado: (assinado, id) => {
        return new Promise((aceito,rejeitado) =>{
            
            db.query('UPDATE agenda_p SET assinado = ? WHERE id = ?',
            [assinado, id] ,
            (error, results)=>{
                if(error) { rejeitado(error); return; }                
                aceito(results.insertId)
            }
            )
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
    alterar: (id, user) => {
        return new Promise((aceito,rejeitado) =>{
            
            db.query('UPDATE users SET name = ?, cpf = ?, endereco = ?, tel = ?, etel = ?, email = ?, sexo = ?, nasc = ?, filhos = ?, civil = ?, profissao = ? WHERE id = ?',
            [user.name, user.cpf, user.endereco, user.tel, user.etel, user.email, user.sexo, user.nasc, user.filhos, user.civil, user.profissao, id] ,
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