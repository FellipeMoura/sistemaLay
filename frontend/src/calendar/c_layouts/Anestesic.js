import React, { useState, useEffect } from "react";
import './Day.scss'
import {alterarAgenda } from "../f_aux/functions";

function Anestesic(props) {

    const [width, setWidth] = useState((props.countAten/props.card.length)+'vw')

    useEffect(() => {
    //  console.log(props.card[0].nome_cliente && props.card)
          setWidth((props.countAten/props.card.length)+'vw')
      }, [props.card,props.countAten]);

      function alterarAg(item){
        alterarAgenda(props.isEdit,item)
        props.setIsEdit(false)
        window.location.replace(`/calendar/${props.unidade}/${item.data}/${props.user}`)
    }
   
    return (
<div className="cards" >
        {props.card.map((item)=>

      
      <div className= {`card ${item.nome_cliente? 'fullBorder':''}`} key={props.card.indexOf(item)} 
      style={{
      width: width,
      backgroundColor:`${item.nome_cliente?'#c7c3ee':'#a7bbff'}`}} 
      onClick={()=>  props.isEdit? 
        alterarAg(item)
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