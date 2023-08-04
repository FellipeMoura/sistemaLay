import React, { useState, useEffect } from "react";
import './Day.scss'
import { getColor } from "./salaColor";
import { deleteA, insertC, alterarAgenda } from "../f_aux/functions";
import moment from "moment";

function Day(props) {

    // const [props.card, setCard] = useState(props.props.card)
    const [width, setWidth] = useState((props.countAten / props.card.length) + 'vw')
    const [classe, setClasse] = useState('fullBorder')
    // console.log(props.card[0])
    const color = "#58c58e"
    //console.log(props.isZero)
    function setClass(card) {
        if (card.nome_cliente) {

            if (card.hora >= props.horario) {
                if (card.hora_fim <= props.horario_fim) {

                    return ('fullBorder')
                } else {
                    return ('topBorder')
                }
            } else if (parseInt(card.hora_fim) <= parseInt(props.horario_fim)) {
                return ('bottomBorder')
            }

            if (card.hora_fim <= props.horario || card.hora >= props.horario_fim) {

                return ('')

            }
        } else {
            return ('')
        }
    }
    useEffect(() => {


        /*      if (props.card[0].nome_cliente) {
                 
                  if (props.card[0].hora >= props.horario) {
                      if (props.card[0].hora_fim <= props.horario_fim) {
                          //  console.log(
                          //      props.card[0].hora + ' <= ' + props.horario +'fim'+props.card[0].hora_fim + ' <= ' + props.horario_fim + 'fullBorder '+props.card[0].atendente
                          //      )
                          // console.log(props.card[0])
  
                          setClasse('fullBorder')
                      } else {
                          setClasse('topBorder')
                          //   console.log('top' + props.card[0].hora + '=' + props.horario)
                      }
                  } else if (parseInt(props.card[0].hora_fim) <= parseInt(props.horario_fim)) {
                      setClasse('bottomBorder')
                  }
  
                  if (props.card[0].hora_fim <= props.horario || props.card[0].hora >= props.horario_fim) {
                      //  let temp = props.card
                      //  console.log(props.card[0])
                      // temp[i] = {}    
                      setClasse('')
  
                  }
              }*/

        setWidth((props.countAten / props.card.length) + 'vw')
    }, [props.card, props.horario]);


    function alterarAg(item){
        alterarAgenda(props.isEdit.id,item)
        props.setIsEdit(false)
        window.location.replace(`/calendar/${props.unidade}/${item.data}/${props.user}`)
    }

    return (
        <div className="cards" >
            {props.card.map((item) =>


                item.nome_cliente || (props.disp == '1' && (item.data == moment().format('YYYY-MM-DD') && item.hora > moment().format('HH:mm') || item.data > moment().format('YYYY-MM-DD'))) ?
    
                        item.nome_cliente === 'bloqueio' ?
                            <div 
                                className='card indisp' 
                                key={item.atendente + props.index} 
                                style={{ width: '100%' }} 
                                onClick={() => deleteA(props.card[0], props.unidade, props.user)}
                            >
                                <p>{
                                    item.nome_procedimento?
                                        item.nome_procedimento 
                                    :   'fechado'
                                    }
                                </p>
                            
                            </div>
                        :
                            <div key={props.horario + props.index + item.id}>

                                <div 
                                    className={`card ${setClass(item)}`} 
                                    style={
                                        { width: width, 
                                          backgroundColor: `${
                                            item.sala ?
                                                parseInt(item.assinado) > 0 ?
                                                    '#b2b6b9' 
                                                :   getColor(item.sala) 
                                            :   '#9fd2e6'
                                            }`
                                        }
                                    } 
                                    onClick={() => 
                                        props.isEdit? 
                                            alterarAg(item)
                                        :   props.setInput(2,item)
                                    }
                                >
                                    {
                                        item.nome_cliente &&
                                        <div 
                                            className={
                                                `bal ${props.isOne > 2 ?
                                                        props.index > 1 ?
                                                            `balao` 
                                                        :   'firstBalao' 
                                                    :   props.index > 1 ?
                                                            'lastBalao' 
                                                        :   'firstLastBalao'}`
                                            }
                                            >

                                            <p><label >{item.nome_cliente}</label></p>
                                            <p><label >{item.telefone}</label></p>
                                            <p><label>{item.nome_procedimento}</label></p>
                                            <p>Sala: <label>{item.sala}</label></p>
                                            <p>Início: <label>{item && item.hora.substr(0, 5)}</label></p>
                                            <p>Fim: <label>{item && item.hora_fim.substr(0, 5)}</label></p>
                                            <p>Usuário: <label>{item && item.user}</label></p>
                                            <p>ID: <label>{item &&`e${item.id}|v${item.id_venda_sub}|c${item.id_cliente}`}</label></p>

                                        </div>
                                    }

                                    <div>
                                        <p style={{ 
                                            borderRadius: '10px 10px 0 0',
                                            backgroundColor:
                                                item.nome_cliente ? 
                                                    parseInt(item.assinado) > 1 ?
                                                        '#348fda' 
                                                    :parseInt(item.assinado) === 1 ? 
                                                        '#cf5a5a' 
                                                    :item.confirm == 1 ? 
                                                        color 
                                                    :'#ccc' 
                                                : '' 
                                                  }}
                                        >
                                            {
                                            item.hora >= props.horario ?
                                                item ? 
                                                    item.nome_cliente || props.hora.substr(0, 5) 
                                                : '' 
                                            : ''
                                            }
                                        </p>                                        
                                        <p>{
                                            item.hora >= props.horario ?
                                                parseInt(item.assinado) > 1 ?
                                                    'Assinatura:' 
                                                :parseInt(item.assinado) === 1 ?
                                                    'Anulado' 
                                                : item.nome_procedimento 
                                            : ''
                                            }
                                        </p>
                                        <p>{
                                            item.hora >= props.horario ?
                                                parseInt(item.assinado) > 1 ?
                                                    item.assinado 
                                                :item.nome_cliente == 'Aberto'? 
                                                    item.hora 
                                                :item.user 
                                            : ''
                                            }
                                        </p>
                                    </div>

                                </div>
                            </div> : <div className="card indisp" onClick={()=>insertC(props.disp, item, props.unidade, props.user)} key={item.atendente + props.index + item.id} style={{ width: width }}></div>


            )}
        </div>

    )
} export default Day