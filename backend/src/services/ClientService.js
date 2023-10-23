const db = require('../db')

module.exports = {
    
    buscarTodos: () => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT DISTINCT acompanhamento.id,  acompanhamento.nome_l, acompanhamento.telefone_l, acompanhamento.envio_confirmacao FROM vendas_sub, acompanhamento WHERE acompanhamento.id = vendas_sub.id_cliente', (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },
    getTelDuplicado: (cadastro) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT id,  nome_l, telefone_l FROM acompanhamento WHERE telefone_l = ? AND id != ?',
            [cadastro.telefone, cadastro.id] , (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },
   
    getVendas: (id) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT id, data, data_venda, avaliadora, unidade, caixa FROM `vendas_servico` WHERE id_cliente= ? order by id desc', 
            [id],
            (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },
    get0: (id_cliente) => {
        return new Promise((aceito, rejeitado)=>{
            db.query(`select vendas_sub.id, vendas_sub.idproduto, vendas_sub.data, vendas_sub.venda, pacotes_servico.nome as nome_procedimento, pacotes_servico.qnt_sessao from vendas_sub inner join pacotes_servico on pacotes_servico.id = vendas_sub.idproduto and id_cliente = ${id_cliente} and vendas_sub.venda = 'Sim' AND!EXISTS( SELECT 1 FROM blutecno_bueno.vendas_servico WHERE vendas_sub.id_vendas = vendas_servico.id LIMIT 1 )`,
            (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },
    getCount0: (id_sub_venda) => {
        return new Promise((aceito, rejeitado)=>{
            db.query(`select count(id) as count from agenda_procedimento WHERE cancelado not like "s%" and id_sub_venda = ${id_sub_venda}`,
            (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },
    get1: (id) => {
        return new Promise((aceito, rejeitado)=>{
            db.query(`select id from vendas_sub where id_vendas = ?`,[id],
            (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },
   
    getVendasSub: (id) => {
        return new Promise((aceito, rejeitado)=>{
            db.query(`SELECT vendas_sub.id, vendas_sub.idproduto, vendas_sub.venda, pacotes_servico.nome as nome_procedimento, pacotes_servico.qnt_sessao, COUNT(agenda_procedimento.id) as realizadas FROM vendas_sub INNER JOIN agenda_procedimento ON agenda_procedimento.id_sub_venda = ${id} and agenda_procedimento.cancelado not like "s%" INNER JOIN pacotes_servico ON pacotes_servico.id = vendas_sub.idproduto AND vendas_sub.id = ${id}`, 
            
            (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },
    getAss: (id_sub_venda) => {
        return new Promise((aceito, rejeitado)=>{
            db.query(`SELECT data, evolucao, data_evolucao, atendente, unidade, status, cancelado, anulado FROM agenda_procedimento WHERE id_sub_venda= ${id_sub_venda} ORDER BY data asc`,
            (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },
    updateEnvio: (acompanhamento) => {
        return new Promise((aceito,rejeitado) =>{
            
            db.query('UPDATE acompanhamento SET envio_confirmacao = ? WHERE id = ?',
            [acompanhamento.envio_confirmacao, acompanhamento.id] ,
            (error, results)=>{
                if(error) { rejeitado(error); return; }                
                aceito(results.insertId)
            }
            )
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
    insertVenda: (venda) => {
        return new Promise((aceito,rejeitado) =>{
            db.query('INSERT INTO vendas_servico(id_event, periodo_tratamento, id_cliente, caixa, unidade) VALUES (?,?,?,?,?)',
            [venda.id_event, venda.periodo_tratamento, venda.id_cliente, venda.caixa, venda.unidade] ,
            (error, results)=>{
                if(error) { rejeitado(error); return; }                
                aceito(results.insertId)
            })
        })
    },
    insertSub: (vendas_sub) => {
        return new Promise((aceito,rejeitado) =>{
            db.query('INSERT INTO vendas_sub(id_vendas, id_event, data_baixa, id_vendas_1, vendido, idproduto, id_cliente, total, usuario, unidade, venda) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
            [vendas_sub.id_vendas, vendas_sub.id_event, vendas_sub.data_baixa, vendas_sub.id_vendas_1, vendas_sub.vendido, vendas_sub.idproduto, vendas_sub.id_cliente, vendas_sub.total, vendas_sub.usuario, vendas_sub.unidade, vendas_sub.venda] ,
            (error, results)=>{
                if(error) { rejeitado(error); return; }                
                aceito(results.insertId)
            })
        })
    },
    alterarAcompanhamento: (cadastro) => {
        return new Promise((aceito,rejeitado) =>{
            db.query('UPDATE acompanhamento SET nome_l = ?, telefone_l = ? WHERE id = ?',
            [cadastro.nome, cadastro.telefone, cadastro.id] ,
            (error, results)=>{
                if(error) { rejeitado(error); return; }                
                aceito(results.insertId)
            }
            )
        })
    },
    zerarTelefone: (id) => {
        return new Promise((aceito,rejeitado) =>{
            db.query('UPDATE acompanhamento set telefone_l = 0 WHERE id = ?',
            [id] ,
            (error, results)=>{
                if(error) { rejeitado(error); return; }                
                aceito(results.insertId)
            }
            )
        })
    },
    agruparEvent: (neww, old) => {
        return new Promise((aceito,rejeitado) =>{
            db.query('UPDATE event SET patients_idpatient = ? WHERE patients_idpatient = ?',
            [neww, old] ,
            (error, results)=>{
                if(error) { rejeitado(error); return; }                
                aceito(results.insertId)
            }
            )
        })
    },
    agruparVenda: (neww, old) => {
        return new Promise((aceito,rejeitado) =>{
            db.query('UPDATE vendas_servico SET id_cliente = ? where id_cliente = ?',
            [neww, old] ,
            (error, results)=>{
                if(error) { rejeitado(error); return; }                
                aceito(results.insertId)
            }
            )
        })
    },
    agruparVendaSub: (neww, old) => {
        return new Promise((aceito,rejeitado) =>{
            db.query('UPDATE vendas_sub SET id_cliente = ? where id_cliente = ?',
            [neww, old] ,
            (error, results)=>{
                if(error) { rejeitado(error); return; }                
                aceito(results.insertId)
            }
            )
        })
    },
    agruparAP: (neww, old) => {
        return new Promise((aceito,rejeitado) =>{
            db.query('UPDATE agenda_procedimento SET cliente = ? where cliente = ?',
            [neww, old] ,
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