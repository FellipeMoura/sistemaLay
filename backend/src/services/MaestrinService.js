const db = require('../db')

module.exports = {
    
    buscarTodos: (data, atendente, unidade) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM agenda_p WHERE data = ? AND atendente = ? AND unidade = ? order by hora',[data, atendente, unidade], (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },
    buscarBloqueio: (data, unidade) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM agenda_p WHERE data <= ? AND data_fim >= ? AND unidade = ? AND atendente = "sala_bloqueada" order by hora',[data, data, unidade], (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },
    buscarDesativados: (unidade) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM agenda_p WHERE unidade = ? order by data_fim desc',[unidade], (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },
    buscarUltimo: (user) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM agenda_p WHERE user = ? and id_cliente > 135 order by id DESC limit 1',[user], (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },
    buscarClientes: () => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT DISTINCT id_cliente, nome_cliente, telefone FROM agenda_p', (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },
    buscarSubPDF: (data, atendente, unidade) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT agenda_p.*, pacotes_servico.qnt_sessao, vendas_sub.regiao FROM agenda_p inner join vendas_sub on vendas_sub.id = agenda_p.id_venda_sub inner join pacotes_servico on agenda_p.procedimento = pacotes_servico.id and agenda_p.data = ? AND agenda_p.atendente = ? AND agenda_p.unidade = ? order by agenda_p.hora',[data, atendente, unidade], (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },
    buscarPDF: (id_venda_sub) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT valor, desconto FROM  fechamento_venda where id_venda_sub = ? ',[id_venda_sub], (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },
    buscarPDF2: (id_venda_sub) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT valor, desconto FROM  fechamento_bonus where id_venda_sub = ? ',[id_venda_sub], (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },
    buscarPDF3: (id_venda_sub) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT valor, desconto FROM  fechamento_reposicao where id_venda_sub = ? ',[id_venda_sub], (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },
    buscarPDF4: (id_venda_sub) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT total as valor, total_desc as desconto FROM vendas_sub where id = ? ',[id_venda_sub], (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },
    buscarRP: (id) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT total from vendas_sub where id = ?',[id], (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },
    buscarPDFcli: (id_cliente, inicio, fim) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM agenda_p WHERE id_cliente = ? AND data BETWEEN ? AND ? AND id_venda_sub > 100',
            [id_cliente, inicio, fim], (error, results)=>{
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
    buscar_p: () => {
        return new Promise((aceito,rejeitado) =>{
            db.query('SELECT DISTINCT sec_users.login FROM sec_users WHERE sec_users.login LIKE "%_p"  AND usractive = "Y" ', (error, results)=>{               
              //SELECT DISTINCT sec_users.login FROM sec_users WHERE sec_users.login LIKE "%_p"  AND usractive = "Y" AND!EXISTS( SELECT 1 FROM `blutecno_bueno`.`atendentes` WHERE `atendentes`.`login` = `sec_users`.`login` LIMIT 1 )
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },
    buscarVerificarAgendaP: (data, hora) => {
        return new Promise((aceito,rejeitado) =>{
            db.query( 'select * from agenda_p where data = ? and hora < ? and confirm = 1 and assinado < 2',
            [data, hora], (error, results)=>{               
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },
    getLastAP: () => {
        return new Promise((aceito,rejeitado) =>{
            db.query( 'SELECT id, id_sub_venda FROM agenda_procedimento ORDER BY id DESC LIMIT 1',
            (error, results)=>{               
                if(error) { rejeitado(error); return; }
                aceito(results[0]);
            })
        })
    },
    updateAssinado: (assinatura, data) => {
        return new Promise((aceito,rejeitado) =>{
            db.query( 'UPDATE agenda_p SET assinado = ? WHERE id_venda_sub = ? AND data = ? AND assinado < 2 ORDER BY id LIMIT 1',
            [assinatura.id, assinatura.id_sub_venda, data], (error, results)=>{               
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },
    updateNaoAssinado: (data, hora) => {
        return new Promise((aceito,rejeitado) =>{
            
            db.query('UPDATE agenda_p SET assinado = 1 WHERE data = ? AND hora < ? AND confirm = 1 AND assinado = 0',
            [data, hora] ,
            (error, results)=>{
                if(error) { rejeitado(error); return; }                
                aceito(results.insertId)
            }
            )
        })
    },
    desativarRegistros: (data, hora) => {
        return new Promise((aceito,rejeitado) =>{
            
            db.query('UPDATE agenda_p SET id_venda_sub = 4, nota = "inutilizado", data = "0000-00-00", data_fim = ? WHERE data = ? AND hora < ? AND confirm = 0',
            [data, data, hora] ,
            (error, results)=>{
                if(error) { rejeitado(error); return; }                
                aceito(results.insertId)
            }
            )
        })
    },
    buscarAssAgendaProc: (data, id_sub_venda) => {
        return new Promise((aceito,rejeitado) =>{
            db.query( `select id from agenda_procedimento where data like "${data}%" and id_sub_venda = ? and status < 4`,
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
    attCliente: (cadastro) => {
        return new Promise((aceito,rejeitado) =>{
            
            db.query('UPDATE agenda_p SET nome_cliente = ?, telefone = ? WHERE id_cliente = ?',
            [cadastro.nome, cadastro.telefone, cadastro.id] ,
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
    temp: () => {
        return new Promise((aceito,rejeitado) =>{
            db.query('SELECT id, nome_procedimento FROM `agenda_p` WHERE nome_procedimento like "%lise -%"', [], (error, results)=>{               
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },
    temp2: (nome, id) => {
        return new Promise((aceito,rejeitado) =>{
            
            db.query('UPDATE agenda_p SET nome_procedimento = ? WHERE id = ? ',
            [nome, id] ,
            (error, results)=>{
                if(error) { rejeitado(error); return; }                
                aceito(results.insertId)
            }
            )
        })
    },
    buscarNomeAtend: (nome) => {
        return new Promise((aceito,rejeitado) =>{
            db.query('SELECT login, unidade FROM atendentes WHERE nome = ?', [nome], (error, results)=>{               
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },
    buscarSalas: (unidade) => {
        return new Promise((aceito,rejeitado) =>{
            db.query('select * from sala where unidade = 0 or ? order by id ', [unidade], (error, results)=>{               
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },
    buscarSala: (id) => {
        return new Promise((aceito,rejeitado) =>{
            db.query('select * from sala where id = ? ', [id], (error, results)=>{               
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },
    disp: (sala,unidade,data,hora,hora_fim) => { //'select * from agenda_p where data = ? and sala = ? and unidade = ? and ((hora BETWEEN ? and ? or hora_fim BETWEEN ? and ?) or (hora < ? and hora_fim > ? ))'
        return new Promise((aceito,rejeitado) =>{
            db.query(`select * from agenda_p where id_venda_sub > 4 and sala = ? and unidade = ? and( data = ? and ( (hora <= ? and hora_fim > ?) or (hora > ? and hora < ?) ) or (data_fim = ? and hora_fim >= ?) or (data < ? and data_fim > ?)
        )`,
             [sala,unidade,data,hora,hora,hora,hora_fim,data,hora_fim,data,data], (error, results)=>{               
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },
    disp2: (data,sala,unidade) => {
        return new Promise((aceito,rejeitado) =>{
            db.query(`select * from agenda_p where data <= ? and data_fim >= ? and sala = ? and unidade = ? and id_venda_sub = 5 `, [data, data, sala, unidade], (error, results)=>{               
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },
    insert: (horario) => {
        return new Promise((aceito,rejeitado) =>{
            db.query('INSERT INTO `agenda_p`(`id_cliente`, `nome_cliente`,`telefone`, `id_venda_sub`, `procedimento`, `sala`,`user`, `data`, `hora`,`hora_fim`,`duracao`, `atendente`,`indice`, `nome_procedimento`, `unidade`, `nota`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [horario.id_cliente, horario.nome_cliente, horario.telefone, horario.id_venda_sub, horario.procedimento, horario.sala, horario.user, horario.data, horario.hora, horario.hora_fim, horario.duracao, horario.atendente, horario.indice, horario.nome_procedimento, horario.unidade, horario.nota],
            (error, results)=>{
                if(error) { rejeitado(error); return; }                
                aceito(results.insertId)
            })
        })
    },
    insertBlockSala: (horario) => {
        return new Promise((aceito,rejeitado) =>{
            db.query(`INSERT INTO agenda_p(id_cliente, id_venda_sub, procedimento, nome_procedimento, sala, user, data, data_fim, hora, hora_fim, atendente, unidade, nota) VALUES (135,5,4,?,?,?,?,?,?,?,'sala_bloqueada',?,?)`,
            [ horario.nome_procedimento, horario.sala, horario.user, horario.data, horario.data_fim, horario.hora, horario.hora_fim, horario.unidade, horario.nota],
            (error, results)=>{
                if(error) { rejeitado(error); return; }                
                aceito(results.insertId)
            })
        })
    },
    insertAtend: (atendente) => {
        return new Promise((aceito,rejeitado) =>{
            db.query('INSERT INTO `atendentes`(`login`, `nome`,`unidade`) VALUES (?,?,?)',
            [atendente.login, atendente.nome, atendente.unidade],
            (error, results)=>{
                if(error) { rejeitado(error); return; }                
                aceito(results.insertId)
            })
        })
    },
    insertSala: (sala) => {
        return new Promise((aceito,rejeitado) =>{
            db.query('INSERT INTO `sala`(`nome`, `qnt`,`unidade`) VALUES (?,?,?)',
            [sala.nome, sala.qnt, sala.unidade],
            (error, results)=>{
                if(error) { rejeitado(error); return; }                
                aceito(results.insertId)
            })
        })
    },
    confirmarAgenda: (value, data, id_venda_sub) => {
        return new Promise((aceito,rejeitado) =>{
            
            db.query('UPDATE agenda_p SET confirm = ? WHERE data = ? and id_cliente = ?',
            [value, data, id_venda_sub] ,
            (error, results)=>{
                if(error) { rejeitado(error); return; }                
                aceito(results.insertId)
            }
            )
        })
    },

    dConfirmarAgenda: (value, data, id_venda_sub) => {
        return new Promise((aceito,rejeitado) =>{
            
            db.query('UPDATE agenda_p SET confirm = ? WHERE data = ? and id_venda_sub = ?',
            [value, data, id_venda_sub] ,
            (error, results)=>{
                if(error) { rejeitado(error); return; }                
                aceito(results.insertId)
            }
            )
        })
    },
    buscarConfirm: (data, id_cliente) => {
        return new Promise((aceito,rejeitado) =>{
            
            db.query('SELECT * from agenda_p WHERE data = ? and id_cliente = ? and assinado < 2 and id_venda_sub > 10',
            [data, id_cliente],
            (error, results)=>{
                if(error) { rejeitado(error); return; }                
                aceito(results)
            }
            )
        })
    },
    alterar: (agenda) => {
        return new Promise((aceito,rejeitado) =>{
            
            db.query('UPDATE agenda_p SET id_cliente = ?, nome_cliente = ?, telefone = ?, id_venda_sub = ?, procedimento = ?, nome_procedimento = ?, sala = ?, duracao=?, hora = ?, hora_fim = ?, unidade = ?, nota = ? WHERE id = ?',
            [agenda.id_cliente, agenda.nome_cliente, agenda.telefone, agenda.id_venda_sub, agenda.procedimento, agenda.nome_procedimento, agenda.sala, agenda.duracao, agenda.hora, agenda.hora_fim, agenda.unidade, agenda.nota, agenda.id] ,
            (error, results)=>{
                if(error) { rejeitado(error); return; }                
                aceito(results.insertId)
            }
            )
        })
    },
    desativarRegistro: (agenda) => {
        return new Promise((aceito,rejeitado) =>{
            
            db.query('UPDATE agenda_p SET id_venda_sub = 4, nota = ?, data = "0000-00-00", data_fim = ? WHERE id = ?',
            [agenda.nota, agenda.data_fim, agenda.id] ,
            (error, results)=>{
                if(error) { rejeitado(error); return; }                
                aceito(results.insertId)
            }
            )
        })
    },
    alterarAgenda: (agenda, id) => {
        return new Promise((aceito,rejeitado) =>{
            
            db.query('UPDATE agenda_p SET data = ?, hora = ?, hora_fim = ?, indice = ?, atendente = ?, confirm = 0, nota = ? WHERE id = ?',
            [ agenda.data, agenda.hora, agenda.hora_fim, agenda.indice, agenda.atendente, agenda.nota, id] ,
            (error, results)=>{
                if(error) { rejeitado(error); return; }                
                aceito(results.insertId)
            }
            )
        })
    },
    alterarAtendenteAP: (data, atendente, id) => {
        return new Promise((aceito,rejeitado) =>{
            
            db.query('UPDATE agenda_procedimento SET data = ?, data_inicio = ?, data_fim = ?, atendente = ? WHERE id = ?',
            [data, data, data, atendente, id] ,
            (error, results)=>{
                if(error) { rejeitado(error); return; }                
                aceito(results.insertId)
            }
            )
        })
    },
    cancelarAP: (id) => {
        return new Promise((aceito,rejeitado) =>{
            
            db.query('UPDATE agenda_procedimento SET cancelado = "Sim", status = 4 WHERE id = ?',
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
    alterarSala: (agenda) => {
        return new Promise((aceito,rejeitado) =>{
            
            db.query('UPDATE sala SET nome = ?, qnt = ?, unidade = ?, indice = ?, duracao = ? WHERE id = ?',
            [agenda.nome, agenda.qnt, agenda.unidade, agenda.indice, agenda.duracao, agenda.id] ,
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
    },
    excluirSala: (id) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('DELETE FROM sala WHERE id= ?', [id], (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    }

}