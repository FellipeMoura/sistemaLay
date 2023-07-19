import React, { useState, useEffect } from "react";
import {GiCheckMark} from 'react-icons/gi'
import {FcCancel} from 'react-icons/fc'
import InputDay from "./InputDay";
import Modal from 'react-modal'
import { getColor } from "./salaColor";

function Open(props) {

   const [current, setCurrent] = useState(props.card)
   //console.log(props.card)
const open = (
    <div 
        onClick={ ()=>props.event(props.i, setCurrent) }
       className="cardAtend"
        
        >
            <GiCheckMark style={{ fill: 'rgb(43, 112, 30)' }}/>
        </div>
)
const close = (
    <div 
        onClick={()=>props.event(props.i, setCurrent)}
       className="cardAtend"
        
        >
            <FcCancel/>
        </div>
)

const onoff = [close, open]
   
    return (

        
        onoff[current]


    )
} export default Open