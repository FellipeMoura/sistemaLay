const db = require('../db')

module.exports = {
    
    buscarTodos: (id) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT pacotes_servico.nome, pacotes_servico.id as id_pacote, pacotes_servico.chave, vendas_sub.id as id_vendas_sub, pacotes_servico.qnt_sessao FROM pacotes_servico, vendas_sub WHERE pacotes_servico.id = vendas_sub.idproduto AND vendas_sub.venda = "sim" AND pacotes_servico.SP = "S" AND vendas_sub.id_cliente = ?',[id], (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },

    buscarCOUNT: (id) => {
        return new Promise((aceito,rejeitado) =>{
            db.query('SELECT COUNT(*) FROM agenda_procedimento WHERE id_sub_venda = ? AND (status = 3 or 2)', [id], (error, results)=>{
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
    agendar: (id, data) => {
        return new Promise((aceito,rejeitado) =>{
            
            db.query('UPDATE `vendas_sub` SET data_agendamento = ? WHERE id =?',
            [data, id] ,
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