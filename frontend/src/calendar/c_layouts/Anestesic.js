import React, { useState, useEffect } from "react";
import './Day.scss'

import moment from "moment";

function Anestesic(props) {

    const [width, setWidth] = useState((props.countAten/props.card.length)+'vw')
    const [hrs, setHrs] = useState({ indice: props.index, hora: props.horario, hora_fim: props.horario_fim })
   
    useEffect(() => {
    //  console.log(props.card[0].nome_cliente && props.card)
          setWidth((props.countAten/props.card.length)+'vw')
      }, [props.card,props.countAten]);

      function alterarAgenda(cadastro) {
        cadastro.hora_fim = moment(`2020.05.05 ${cadastro.hora}`).add(props.isEdit.duracao, 'minutes').format('HH:mm')
        console.log(cadastro)
        //let resp = window.confirm(`Deseja ocultar a ${props.atendente} atendente da agenda?`)
        // if (resp) {
    
        //console.log(`${process.env.REACT_APP_CALENDAR}/agendar/${cadastro.id_venda_sub}/${cadastro.data.substr(0, 10)}/${confirm}/${cadastro.atendente}`)
        fetch(`${process.env.REACT_APP_CALENDAR}/alterarAgenda/${props.isEdit.id}`, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(cadastro),
        })
            .then(() => {
    
                props.setRefresh(cadastro)
        props.setIsEdit(false)
     
        props.setInput(1, cadastro)
            })
            .catch(err => console.log(err))
    
    }

       
    return (
<div className="cards" >
        {props.card.map((item)=>

      
      <div className= {`card ${item.nome_cliente? 'fullBorder':''}`} key={props.card.indexOf(item)} 
      style={{
      width: width,
      backgroundColor:`${item.nome_cliente?'#67767e':'#a7bbff'}`}} 
      onClick={()=>  props.isEdit? 
        alterarAgenda(item)
    :   props.setInput(3,item)}>
        <div>
        <p>{item? item.nome_cliente || props.hora.substr(0,5) : ''}</p>
        <p>{item.nome_procedimento? item.nome_procedimento: ''}</p> 
        <p>{item.user? item.user: ''}</p>
        </div>
       </div> 
        
        )}
        </div>

    )
} export default Anestesic