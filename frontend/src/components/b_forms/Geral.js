import React from 'react';
import './Geral.css'
import Info from '../c_layouts/Info';

 
function Geral({project,setStep}) {
    
    const bds =[' Autopsíquica', " Alopsíquica", 'Temporal', 'Espacial']
    const bks = ['Distimia', 'Angústia', 'Ansiedade', 'Irritabilidade', 'Medo', 'Ambivalência afetiva', 'Pânico']
 

   const left =(
    <div >
    <label>Prontuário nº:<label className="value"> {project.num}</label></label>

        <label>Data de início:<label className="value"> {project.inicio?project.inicio.split('-').reverse().join('/'):''}</label></label>
        
        <label >Queixa Principal:<label  className="value">{project.aa}</label></label>
        
        <label>Medicamentos utilizados: <label  className="value">{project.ab}</label></label>
        
        <label >Outros Tratamentos: <label  className="value">{project.ac}</label></label>
        
        <label >Hipótese Diagnóstica: <label  className="value">{project.ca}</label></label>

         <label>Observação: <label className="value"> {project.obs}</label></label>
    </div>
   )

   const right =(

    <div>
    <label> a) Aparência : <label className="value"> {project.ba}</label></label>
        <label>b) Comportamento:<label className="value"> {project.bb}</label></label> 
        <label>c) Atitude para com o entrevistador: <label className="value"> {project.bc}</label></label>
        <label>d) Orientaçao:
        {bds.map(bd => { 
            var index = bds.indexOf(bd)+1
            var pos = 'bd'+index
            if(project[pos] > 0 ){
            
            return (
                <label key={bd} className="value"> , {bd} </label>
                )
        }
            
        })}
        </label>
        <label>e) Atenção: <label className="value"> {project.be}</label></label>
        <label>f) Tenacidade: <label className="value"> {project.bf}</label></label>
        <label>g) Discurso: <label className="value"> {project.bg}</label></label>
        <label>h) Sensopercepção: <label className="value"> {project.bh}</label></label>
        <label>i) Pensamento: <label className="value"> {project.bi}</label></label>
        <label>j) Linguagem: <label className="value"> {project.bj}</label></label>
        <label>l) Humor: <label className="value"> {project.bl}</label></label>
        <label>k) Afetividade:
        {bks.map(bk => { 
            var index = bks.indexOf(bk)+1
            var pos = 'bk'+index
            if(project[pos] > 0 ){
            
            return (
                <label key={bk} className="value">, {bk} </label>
                )
        }
            
        })}
        </label>
        <label>m) Consciência da doença atual: <label className="value"> {project.bm}</label></label>

    </div>

   )
    return (
        <Info
            right={right}
            left={left}
            click={()=>setStep(3)}
        />
    );
}
 
export default Geral