const db = require('../db')

module.exports = {
    buscarCrediario: (data, fim, unidade) => {
        return new Promise((aceito, rejeitado)=>{
            db.query(`SELECT * FROM orcamento_n_pagamento where id_pagamento = 19 and data between '${data} 00:00:00' and '${fim} 23:59:59' and empresa ${unidade} and fechado = 2 `, (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },
    buscarVenda: (data, fim, unidade) => {
        return new Promise((aceito, rejeitado)=>{
            db.query(`SELECT acompanhamento.nome_l, fechamento_venda.data, fechamento_venda.id_venda, fechamento_venda.empresa, fechamento_venda.avaliadora, fechamento_venda.caixa FROM fechamento_venda INNER JOIN acompanhamento ON fechamento_venda.data between '${data} 00:00:00' and '${fim} 23:59:59' and fechamento_venda.empresa ${unidade} and acompanhamento.id = fechamento_venda.id_cliente group by fechamento_venda.id_venda order by data`, (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },
    buscarVendaSub: (venda) => {
        return new Promise((aceito, rejeitado)=>{
            db.query(`SELECT pacotes_servico.nome, pacotes_servico.SP, pacotes_servico.qnt_sessao, fechamento_venda.id_venda_sub, fechamento_venda.idproduto, fechamento_venda.valor, fechamento_venda.desconto FROM fechamento_venda INNER JOIN pacotes_servico ON fechamento_venda.id_venda = ${venda} and pacotes_servico.id = fechamento_venda.idproduto`, (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },
    buscarPagamento: (venda) => {
        return new Promise((aceito, rejeitado)=>{
            db.query(`SELECT forma_pagamento.id as id_forma_pagamento, orcamento_n_pagamento.qnt as itens_qnt, forma_pagamento.nome as nome_forma, orcamento_n_pagamento.valor, orcamento_n_pagamento.id FROM forma_pagamento inner join orcamento_n_pagamento on forma_pagamento.id = orcamento_n_pagamento.id_pagamento and orcamento_n_pagamento.id_os = ${venda} and forma_pagamento.id not in (6,16) group by orcamento_n_pagamento.id`, (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },
    buscarId_pagamentos: (data, fim, unidade) => {
        return new Promise((aceito, rejeitado)=>{
            db.query(`SELECT distinct id_pagamento from orcamento_n_pagamento where id_pagamento not in (4,5,6,16,19) and orcamento_n_pagamento.data between '${data} 00:00:00' and '${fim} 23:59:59' and empresa ${unidade} and fechado = 2`, (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },
    buscarPagamentos: (id_pagamento, data, fim, unidade) => {
        return new Promise((aceito, rejeitado)=>{
            db.query(`SELECT forma_pagamento.nome as nome_forma, sum(orcamento_n_pagamento.valor) as soma FROM forma_pagamento inner join orcamento_n_pagamento on forma_pagamento.id = orcamento_n_pagamento.id_pagamento and orcamento_n_pagamento.id_pagamento = ${id_pagamento} and orcamento_n_pagamento.data between '${data} 00:00:00' and '${fim} 23:59:59' and empresa ${unidade} and fechado = 2`, (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },


    buscarPagamentosC: (data, fim, unidade) => {
        return new Promise((aceito, rejeitado)=>{
            db.query(`SELECT sum(orcamento_n_pagamento.valor) as soma FROM orcamento_n_pagamento where id_pagamento in (4,5) and data between '${data} 00:00:00' and '${fim} 23:59:59' and empresa ${unidade} and fechado = 2`, (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },
    buscarFormas: () => {
        return new Promise((aceito, rejeitado)=>{
            db.query(`SELECT * from forma_pagamento where id not in (5, 6) `, (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },
    buscarParcelas: (id_pagamento) => {
        return new Promise((aceito, rejeitado)=>{
            db.query(`SELECT * from itens_forma_pagamento where id_pagamento = ${id_pagamento} `, (error, results)=>{
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
            db.query('INSERT INTO users(name, cpf, endereco, tel, etel, email, sexo, nasc, filhos, civil, profissao) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
            [user.name, user.cpf, user.endereco, user.tel, user.etel, user.email, user.sexo, user.nasc, user.filhos, user.civil, user.profissao] ,
            (error, results)=>{
                if(error) { rejeitado(error); return; }                
                aceito(results.insertId)
            })
        })
    },
    insertPg: (pagamento) => {
        return new Promise((aceito,rejeitado) =>{
            db.query('INSERT INTO orcamento_n_pagamento(id_os, id_pagamento, qnt, valor, empresa, fechado) VALUES (?,?,?,?,?,2)',
            [pagamento.id_os, pagamento.id_pagamento, pagamento.qnt, pagamento.valor, pagamento.empresa] ,
            (error, results)=>{
                if(error) { rejeitado(error); return; }                
                aceito(results.insertId)
            })
        })
    },
    alterarPg: (pagamento) => {
        return new Promise((aceito,rejeitado) =>{
            
            db.query('UPDATE orcamento_n_pagamento SET id_pagamento = ?, qnt = ?, valor = ? WHERE id = ?',
            [pagamento.id_forma_pagamento, pagamento.itens_qnt, pagamento.valor, pagamento.id],
            (error, results)=>{
                if(error) { rejeitado(error); return; }                
                aceito(results.insertId)
            }
            )
        })
    },
    alterarFechamento: (venda) => {
        return new Promise((aceito,rejeitado) =>{
            
            db.query(`UPDATE fechamento_venda SET idproduto = ${venda.id_produto}, valor = ${venda.valor}, desconto = ${venda.desconto} WHERE id_venda_sub = ${venda.venda_sub}`,
            
            (error, results)=>{
                if(error) { rejeitado(error); return; }                
                aceito(results.insertId)
            }
            )
        })
    },
    alterarSub: (venda) => {
        return new Promise((aceito,rejeitado) =>{
            
            db.query(`UPDATE vendas_sub SET idproduto = ${venda.id_produto}, preco_uni = ${venda.valor}, desconto = ${venda.desconto}, total = ${venda.total} WHERE id_venda_sub = ${venda.venda_sub}`,
            
            (error, results)=>{
                if(error) { rejeitado(error); return; }                
                aceito(results.insertId)
            }
            )
        })
    },
    deletePg: (id) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('DELETE FROM orcamento_n_pagamento WHERE id= ?', [id], (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    }

}
