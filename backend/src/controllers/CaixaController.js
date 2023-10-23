const CaixaService = require('../services/CaixaService')
const CrediService = require('../services/CrediService')

module.exports = {
    buscarPagamento: async (req, res) => {
        
        let venda = req.params.id_venda
        


        res.json(json)
    },
    buscarVenda: async (req, res) => {
        let json = [
            [],
            {total: 0, totalCred: 0, pagamentos: []},
            []
        ]

        const hoje = new Date().getFullYear()
        let unidade = parseInt(req.params.unidade) < 100 ? '='+req.params.unidade : '<'+req.params.unidade 


        let data = req.params.data
        let fim = req.params.fim 
        //console.log(req.params.unidade)
        let venda = await CaixaService.buscarVenda(data, fim, unidade)

        let id_pagamentos = await CaixaService.buscarId_pagamentos(data, fim, unidade)
       
        for (let i in id_pagamentos){
            let pagamentos = await CaixaService.buscarPagamentos(id_pagamentos[i].id_pagamento, data, fim, unidade)
            json[1].pagamentos.push(
                pagamentos[0]
            )
            
        }
        let pagamentoC = await CaixaService.buscarPagamentosC(data, fim, unidade)
        
        //console.log(pagamentoC)
        pagamentoC[0].soma? json[1].pagamentos.push({nome_forma: 'CARTÃO DE CRÉDITO', soma: pagamentoC[0].soma}):''

        for (let i in venda) {
            let subPagamento = await CaixaService.buscarPagamento(venda[i].id_venda)
            let jsonSub = [{},[]]
            let vendas_sub = await CaixaService.buscarVendaSub(venda[i].id_venda)
            let total = 0
            jsonSub[0] = {
                nome: venda[i].nome_l,
                avaliadora: venda[i].avaliadora,
                venda: venda[i].id_venda,
                caixa: venda[i].caixa
            }
            //console.log(pagamento)
            for (let j in vendas_sub) {
                
                jsonSub[1].push({
                    procedimento:  vendas_sub[j].nome.substr(0, vendas_sub[j].nome.indexOf('(')) || vendas_sub[j].nome,
                    sessoes: vendas_sub[j].qnt_sessao,
                    venda_sub: vendas_sub[j].id_venda_sub,
                    sp: vendas_sub[j].SP,
                    valor: vendas_sub[j].valor,
                    id_produto: vendas_sub[j].idproduto,
                    desconto: vendas_sub[j].desconto,
                    total: parseFloat(vendas_sub[j].valor) - parseFloat(vendas_sub[j].desconto)
                
                })
                total += jsonSub[1][j].total
                json[1].total += jsonSub[1][j].total
                
            }

            let date = new Date(venda[i].data)

            let pagamento = []
            for (let k in subPagamento) {
                
                pagamento.push({
                    id: subPagamento[k].id,
                   id_forma_pagamento: subPagamento[k].id_forma_pagamento,
                    itens_qnt: subPagamento[k].itens_qnt,
                    nome_forma: subPagamento[k].nome_forma,
                    nome_itens: parseInt(subPagamento[k].itens_qnt)< 30? subPagamento[k].itens_qnt+'X': 'À Vista',
                    valor: subPagamento[k].valor,
                    
                })
              
                
            }

            json[0].push({
                vendas_sub: jsonSub,
                nome: venda[i].nome_l,
                data: `${date.getDate()}/${date.getMonth()+1}${date.getFullYear() === hoje? '': '/'+date.getFullYear()}`,
                unidade: venda[i].empresa,
                hora: venda[i].data.toString().substr(16, 5),
                valor: total,
                pagamento: pagamento


            })


            json[2] = await CaixaService.buscarCrediario(data, fim, unidade)
            console.log(json[2])
            let somaCred = 0.0
            for(let item of json[2]){
                somaCred += parseFloat(item.valor)
            }
            json[1].totalCred = somaCred
        }



        res.json(json)
    },


    buscarUm: async (req, res) => {
        let json = { error: '', result: {} }

        let id = req.params.id
        let user = await CaixaService.buscarUm(id)

        if (user) {
            json.result = user
        }


        res.json(json)
    },
    buscarFormas: async (req, res) => {
        let json = [[],[]]
        let id = req.params.id
        
        let formas = await CaixaService.buscarFormas()
        json[0]=formas

        if(id){
            let parcelas = await CaixaService.buscarParcelas(id)
            for(let parcela of parcelas){
                json[1].push({
                    nome: parcela.nome,
                    id: parcela.qnt
                })
            }
        }
        //console.log(json)

        res.json(json)
    },
    buscarParcelas: async (req, res) => {
        let json = []

        
               
           let id_pagamento = req.params.id_pagamento

           console.log(id_pagamento)
    
            let parcelas = await CaixaService.buscarParcelas(id_pagamento)
  
            for(let parcela of parcelas){
                json.push({
                    nome: parcela.nome,
                    id: parcela.qnt
                })
            }
        
       
        //console.log(json)

        res.json(json)
    },
    insertPg: async (req, res) => {
        let json = { error: '', result: {} }

        let pagamento = req.body
       
        let result = await CaixaService.insertPg(pagamento);
        
        console.log(result)
        res.json(json)
    },
    alterar: async (req, res) => {
        let json = { error: '', result: {} }

        let id = req.params.id

        let user = {
            name: req.body.name,
            cpf: req.body.cpf,
            endereco: req.body.endereco,
            tel: req.body.tel,
            etel: req.body.etel,
            email: req.body.email,
            sexo: req.body.sexo,
            nasc: req.body.nasc,
            filhos: req.body.filhos,
            civil: req.body.civil,
            profissao: req.body.profissao
        }
        await CaixaService.alterar(id, user);
        json.result = {
            id,
            name: user.name,
            cpf: user.cpf,
            endereco: user.endereco,
            tel: user.tel,
            etel: user.etel,
            email: user.email,
            sexo: user.sexo,
            nasc: user.nasc,
            filhos: user.filhos,
            civil: user.civil,
            profissao: user.profissao
        };
        //console.log(json)
        res.json(json)
    },
   
    alterarFechamento: async (req, res) => {
        let json = { error: '', result: {} }

        let venda = req.body

        await CaixaService.alterarFechamento(venda);
        await CaixaService.alterarSub(venda);
        //console.log(json)
        res.json(json)
    },
    alterarPg: async (req, res) => {
        let json = { error: '', result: {} }

        let pagamento = req.body
        console.log(pagamento)
        await CaixaService.alterarPg(pagamento);
        
        
        res.json(json)
    },
    deletePg: async (req, res) => {
        let json = { error: '', result: {} }
        await CaixaService.deletePg(req.params.id)
        console.log(req.params.id)
        res.json(json)
    }
}