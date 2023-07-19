import React, { useState, useEffect } from "react";
import './Day.scss'

function Anestesic(props) {

    const [width, setWidth] = useState((props.countAten/props.card.length)+'vw')

    useEffect(() => {
    
          setWidth((props.countAten/props.card.length)+'vw')
      }, [props.card,props.countAten]);
   
    return (
<div className="cards" >
        {props.card.map((item)=>

      
      <div className= {`card ${item.nome_cliente? 'fullBorder':''}`} key={props.card.indexOf(item)} 
      style={{
      width: width,
      backgroundColor:`${item.nome_cliente?'#a1a1a1':'#a7bbff'}`}} 
      onClick={()=> props.handleOpenModal(2, item)}>
        
        <p>{item? item.nome_cliente || props.hora.substr(0,5) : ''}</p>
        <p>{item.nome_cliente? item.hora.substr(0,5): ''}</p> 
        
       </div> 
        
        )}
        </div>

    )
} export default Anestesic