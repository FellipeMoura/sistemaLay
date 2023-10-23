
const RecordService = require('../services/RecordService')

module.exports = {
    buscarTodos: async(req,res)=> {
        let json = []

        let record = await RecordService.buscarTodos()

        for(let i in record){
            json.push({
                id: record[i].id,
                iduser:record[i].iduser,
                num:record[i].num,
                name:record[i].name,
                inicio:record[i].inicio,
                att:record[i].att,    
                aa:record[i].aa,
                ab:record[i].ab,
                ac:record[i].ac,
                ba:record[i].ba,
                bb:record[i].bb,
                bc:record[i].bc,
                bd1:record[i].bd1,
                bd2:record[i].bd2,
                bd3:record[i].bd3,
                bd4:record[i].bd4,
                be:record[i].be,
                bf:record[i].bf,
                bg:record[i].bg,
                bh:record[i].bh,
                bi:record[i].bi,
                bj:record[i].bj,
                bk1:record[i].bk1,
                bk2:record[i].bk2,
                bk3:record[i].bk3,
                bk4:record[i].bk4,
                bk5:record[i].bk5,
                bk6:record[i].bk6,
                bk7:record[i].bk7,
                bl:record[i].bl,
                bm:record[i].bm,
                ca:record[i].ca,
                obs:record[i].obs


            })
        }
        res.json(json)
    },
    buscarTudo: async(req,res)=> {
        let json = []

        let record = await RecordService.buscarTudo()

        for(let i in record){

            let count = await RecordService.buscarCountControl(record[i].iduser)

            json.push({
                id: record[i].id,
                iduser: record[i].iduser,
                num: record[i].num,
                name: record[i].name,
                ultimo: record[i].ultimo,
                inicio: record[i].inicio,
                count: count,
                status: record[i].status
               
            })
        }
        //console.log(json.length)
        res.json(json)
    },
    buscarUm: async(req,res)=> {
        let json = {error:'',result:{}}

        let id = req.params.id
        let record = await RecordService.buscarUm(id)

        if(record){
            json.result = record
        }
        //console.log(record)
        
        res.json(json)
    },
    inserir: async(req,res)=> {
        let json = {error:'',result:{}}

        let record ={    
            iduser:req.body.iduser,
            num:req.body.num,
            inicio:req.body.inicio,
            att:req.body.att,    
            aa:req.body.aa,
            ab:req.body.ab,
            ac:req.body.ac,
            ba:req.body.ba,
            bb:req.body.bb,
            bc:req.body.bc,
            bd1:req.body.bd1,
            bd2:req.body.bd2,
            bd3:req.body.bd3,
            bd4:req.body.bd4,
            be:req.body.be,
            bf:req.body.bf,
            bg:req.body.bg,
            bh:req.body.bh,
            bi:req.body.bi,
            bj:req.body.bj,
            bk1:req.body.bk1,
            bk2:req.body.bk2,
            bk3:req.body.bk3,
            bk4:req.body.bk4,
            bk5:req.body.bk5,
            bk6:req.body.bk6,
            bk7:req.body.bk7,
            bl:req.body.bl,
            bm:req.body.bm,
            ca:req.body.ca,
            obs:req.body.obs
        }
       // //console.log(record)
        let RecordID = await RecordService.insert(record);
        json.result ={
            id: RecordID, 
            iduser: record.iduser,
            num: record.num,
            inicio: record.inicio,
            att: record.att,
            aa: record.aa,
            ab: record.ab,
            ac: record.ac,
            ba: record.ba,
            bb: record.bb,
            bc: record.bc,
            bd1: record.bd1,
            bd2: record.bd2,
            bd3: record.bd3,
            bd4: record.bd4,
            be: record.be,
            bf: record.bf,
            bg: record.bg,
            bh: record.bh,
            bi: record.bi,
            bj: record.bj,
            bk1: record.bk1,
            bk2: record.bk2,
            bk3: record.bk3,
            bk4: record.bk4,
            bk5: record.bk5,
            bk6: record.bk6,
            bk7: record.bk7,
            bl: record.bl,
            bm: record.bm,
            ca: record.ca,
            obs: record.obs
        };
        
        res.json(json)
    },


    alterar: async(req,res)=> {
        let json = {error:'',result:{}}
        
        let id = req.params.id

        let record ={   
            num:req.body.num, 
            inicio:req.body.inicio,
            att:req.body.att,    
            aa:req.body.aa,
            ab:req.body.ab,
            ac:req.body.ac,
            ba:req.body.ba,
            bb:req.body.bb,
            bc:req.body.bc,
            bd1:req.body.bd1,
            bd2:req.body.bd2,
            bd3:req.body.bd3,
            bd4:req.body.bd4,
            be:req.body.be,
            bf:req.body.bf,
            bg:req.body.bg,
            bh:req.body.bh,
            bi:req.body.bi,
            bj:req.body.bj,
            bk1:req.body.bk1,
            bk2:req.body.bk2,
            bk3:req.body.bk3,
            bk4:req.body.bk4,
            bk5:req.body.bk5,
            bk6:req.body.bk6,
            bk7:req.body.bk7,
            bl:req.body.bl,
            bm:req.body.bm,
            ca:req.body.ca,
            obs:req.body.obs
        }
        await RecordService.alterar(id, record);
        json.result ={
            id,
            num:record.num, 
            inicio:record.inicio,
            att:record.att,    
            aa:record.aa,
            ab:record.ab,
            ac:record.ac,
            ba:record.ba,
            bb:record.bb,
            bc:record.bc,
            bd1:record.bd1,
            bd2:record.bd2,
            bd3:record.bd3,
            bd4:record.bd4,
            be:record.be,
            bf:record.bf,
            bg:record.bg,
            bh:record.bh,
            bi:record.bi,
            bj:record.bj,
            bk1:record.bk1,
            bk2:record.bk2,
            bk3:record.bk3,
            bk4:record.bk4,
            bk5:record.bk5,
            bk6:record.bk6,
            bk7:record.bk7,
            bl:record.bl,
            bm:record.bm,
            ca:record.ca,
            obs:record.obs
            
        };
     //   //console.log(json)
        res.json(json)
    },
    attRecord: async(req,res)=> {
        let json = {error:'',result:{}}

        let record = req.body
        //console.log(req.body)
        let result = await RecordService.attRecord(record)

        if(result){
            json.result = result
        }
       // //console.log(record)
        
        res.json(json)
    },
    excluir: async(req,res) =>{
        let json = {error: '', result:{}}
        await UserService.excluir(req.params.id)

        res.json(json)
    }
}