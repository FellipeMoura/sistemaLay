const db = require('../db')

module.exports = {
    
    buscarTodos: (id) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT pacotes_servico.nome, pacotes_servico.id as id_pacote, pacotes_servico.chave, vendas_sub.id as id_vendas_sub, vendas_sub.total, pacotes_servico.qnt_sessao, sala.nome as nome_sala FROM pacotes_servico, vendas_sub, sala WHERE sala.id = pacotes_servico.chave and pacotes_servico.id = vendas_sub.idproduto AND vendas_sub.venda = "sim" AND pacotes_servico.SP = "S" AND vendas_sub.id_cliente = ?',[id], (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },
    buscarProcs: () => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM pacotes_servico order by nome', (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },
    buscarDataVendaSub: (id) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT data_agendamento, qnt_sessao, id FROM vendas_sub WHERE id = ?',[id], (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },
    buscarDataAgendaP: (data,id_venda_sub) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT id FROM agenda_p WHERE data = ? and id_venda_sub = ? ',[data,id_venda_sub], (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },
    buscarCOUNT: (id) => {
        return new Promise((aceito,rejeitado) =>{
            db.query('SELECT COUNT(*) FROM agenda_procedimento WHERE id_sub_venda = ? AND (status = 3 or 2) AND cancelado NOT LIKE "%S%"', [id], (error, results)=>{
                if(error) { rejeitado(error); return; }                
                if(results[0]){
                    aceito(results[0])
                }else{
                    aceito(false)
                }
            })
        })
    },
    buscarCOUNT2: (id, data) => {
        return new Promise((aceito,rejeitado) =>{
            db.query('SELECT COUNT(*) FROM agenda_p WHERE id_venda_sub = ? AND assinado < 2 AND data >= ?', [id, data], (error, results)=>{
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