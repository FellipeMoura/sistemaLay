const db = require('../db')

module.exports = {
    
    buscarCrediario: (data, fim, unidade) => {
        return new Promise((aceito, rejeitado)=>{
            db.query(`SELECT * FROM orcamento_n_pagamento where id_pagamento = 19 and data between '${data} 00:00:00' and '${fim} 23:59:59' and empresa ${unidade} and fechado = 2 AND!EXISTS( SELECT 1 FROM blutecno_bueno.crediario WHERE orcamento_n_pagamento.id_os = crediario.id_os LIMIT 1 )`, (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },
    buscarCrediarios: (script) => {
        return new Promise((aceito, rejeitado)=>{
            db.query(`SELECT * FROM crediario where id > 1 ${script}`, (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },
    buscarIdCliente: (id) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT id_cliente FROM vendas_servico WHERE id = ? ',[id], (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },
    insertCrediario: (project) => {
        return new Promise((aceito,rejeitado) =>{
            db.query('INSERT INTO crediario(id_cliente, id_os, vencimento, qnt, indice, valor, juros, pago, unidade, user) VALUES (?,?,?,?,?,?,?,?,?,?)',
            [project.id_cliente, project.id_os, project.vencimento, project.qnt, project.indice, project.valor, project.juros, project.pago, project.unidade, project.user] ,
            (error, results)=>{
                if(error) { rejeitado(error); return; }                
                aceito(results.insertId)
            })
        })
    },
    alterarCrediario: (project) => {
        return new Promise((aceito,rejeitado) =>{
            
            db.query('UPDATE crediario SET vencimento = ?, valor = ?, juros = ? WHERE id = ?',
            [project.vencimento,  project.valor, project.juros, project.id] ,
            (error, results)=>{
                if(error) { rejeitado(error); return; }                
                aceito(results.insertId)
            }
            )
        })
    },
    alterarCredis: (project) => {
        return new Promise((aceito,rejeitado) =>{
            
            db.query('UPDATE crediario SET vencimento = ?, valor = ?, juros = ? WHERE id_os = ?',
            [project.vencimento,  project.valor, project.juros, project.id_os] ,
            (error, results)=>{
                if(error) { rejeitado(error); return; }                
                aceito(results.insertId)
            }
            )
        })
    },
    buscarLogin_p: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT login FROM atendentes WHERE nome = ?',[nome], (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },
    agendar: (data, qnt, atendente, id) => {
        return new Promise((aceito,rejeitado) =>{
            
            db.query('UPDATE `vendas_sub` SET vendido = 9,data_agendamento = ?, qnt_sessao = ?, assinatura = "Não", atendente_proc = ? WHERE id =?',
            [data, qnt, atendente, id] ,
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