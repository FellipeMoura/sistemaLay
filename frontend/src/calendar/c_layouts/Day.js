import React, { useState, useEffect } from "react";
import './Day.scss'
import InputDay from "./InputDay";
import Modal from 'react-modal'
import moment from "moment";
import { getColor } from "./salaColor";
import { deleteA } from "../f_aux/functions";


function Day(props) {

    const [width, setWidth] = useState((props.countAten/props.card.length)+'vw')
    const[classe, setClasse] = useState('fullBorder')
    const color = "#58c58e"
    //console.log(props.isZero)
    useEffect(() => {
 (
        props.card[0].nome_cliente?
            parseInt(props.card[0].hora.substr(0,2)) === parseInt(props.horario.substr(0,2)) &&
            parseInt(props.card[0].hora.substr(3,2)) === parseInt(props.horario.substr(3,2)) ? 
                 parseInt(props.card[0].hora_fim) <= parseInt(props.horario_fim) ?
                    setClasse('fullBorder') : setClasse('topBorder') && console.log('full'+props.card[0].hora+'='+props.horario):
                    parseInt(props.card[0].hora_fim) <= parseInt(props.horario_fim) ?
                        setClasse('bottomBorder') : setClasse('') : setClasse('')
                
                )
                

                //console.log(props.card[0].nome_cliente+ props.horario + '-'+ props.horario_fim + '-' +props.card[0].hora_fim)

        



    
          setWidth((props.countAten/props.card.length)+'vw')
      }, [props.card,props.horario]);
    
   const abrir = (
    <div className='card indisp' key={props.card[0].atendente+props.index} style={{width: '100%'}} onClick={()=> deleteA(props.card[0], props.unidade, props.user)}>
    <p>fechado</p>
   </div>
   )
    const indisp = (
        <div className="card indisp" key={props.card[0].atendente+props.index} style={{width: width}}></div>
    )


  
    return (
<div className="cards" >
        {props.card.map((item)=>
    
        
      props.disp == '0' ? indisp : item.nome_cliente === 'bloqueio' ? abrir :
      <div key={props.horario+props.index+item.id}>
       
      <div className={`card ${classe}`} style={{width: width, backgroundColor:`${item.sala?getColor(item.sala):'#9fd2e6'}`}} onClick={()=> props.handleOpenModal('1', item)}>
      {
      item.nome_cliente &&
      <div className={props.isOne>2?props.index>1?`balao`:'firstBalao':props.index>1?'lastBalao':'firstLastBalao'}>
       
        <p  ><label >{item.nome_cliente}</label></p>
        <p><label>{item.nome_procedimento}</label></p>
        <p>Sala:<label>{item.sala}</label></p>
        <p>Início:<label>{item && item.hora.substr(0,5)}</label></p>
        <p>Fim:<label>{item && item.hora_fim.substr(0,5)}</label></p>
        <p>Usuário:<label>{item && item.user}</label></p>

    </div>
    }
    
        <p style={{ borderRadius: '10px 10px 0 0', backgroundColor: item.nome_cliente? item.confirm == 1? color : '#ccc': ''}}>{item.hora >= props.horario ? item? item.nome_cliente || props.hora.substr(0,5) : '': ''}</p>
        <p>{item.hora >= props.horario? item.nome_procedimento: ''}</p> 
        <p>{item.hora >= props.horario? item.user: ''}</p> 
    
       </div> 
       </div>
       
        
        )}
        </div>

    )
} export default Day