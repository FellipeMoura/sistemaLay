import React, { useState, useEffect } from "react";
import './Day.scss'
import { getColor } from "./salaColor";
import { deleteA, insertC } from "../f_aux/functions";
import moment from "moment";

function SalaDay(props) {
    
    function alert() {
        let resp = window.confirm(`Deseja excluir o bloqueio?`)
        if(resp){
            fetch(`${process.env.REACT_APP_CALENDAR}/delete5/${props.card.id}`, {
                method: "DELETE",
                headers: {
                    'Content-type': 'application/json',
                },
            })
                .then((resp) => resp.json()).then((data) => {
                   props.setRefresh(Math.random())
                })
                .catch(err => console.log(err))
        }
    }


    return (
        <div className="cards" >

           { 
            !props.card.data?
           <div
                className='card indisp'
                style={{backgroundColor: '#bac1ce', width: '20px'}}
            >
                <p>
                    

                </p>

            </div>
            :
            <div >

                <div
                    className='card bCard' 
                    style={{ backgroundColor: getColor(props.card.sala)}}
                    onClick={() => alert()}
                >
                    
                    {
                        props.card.user &&
                        <div
                            className={
                                `bal blockBalao`
                            }
                        >

                           
                           
                            <p>Sala Bloqueada:</p>
                            <p>{props.card.sala+' - '+props.card.nome_procedimento}</p>
                            <p>Início: </p>
                            <p>{props.card && props.card.data.substr(0, 10).split('-').reverse().join('/')+' - '+ props.card.hora.substr(0, 5).split(':').join('h')}</p>
                            <p>Fim: </p>
                            <p>{props.card && props.card.data_fim.substr(0, 10).split('-').reverse().join('/')+' - '+props.card.hora_fim.substr(0, 5).split(':').join('h')}</p>
                             <p>Data do bloqueio:</p>
                            <p><label >{props.card && props.card.data_agendamento.substr(0, 10).split('-').reverse().join('/') + ' - ' + props.card.data_agendamento.substr(11, 5).split(':').join('h')}</label></p>
                            <p>Usuário: <label>{props.card && props.card.user}</label></p>
                           
                        </div>
                    }
                <div style={{width:'20px'}}></div>
                </div>
            </div> }

        </div>

    )
} export default SalaDay