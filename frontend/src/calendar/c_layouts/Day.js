import React, { useState, useEffect } from "react";
import './Day.scss'
import { getColor } from "./salaColor";
import { confirmarAgenda, deleteA, insertC } from "../f_aux/functions";
import moment from "moment";
import { LabelText, LabelText2 } from "../d_inputs/Input";
import { GiCheckMark } from 'react-icons/gi'
import copy from "copy-to-clipboard"; 

function Day(props) {
    const [hrs, setHrs] = useState({ indice: props.index, hora: props.horario, hora_fim: props.horario_fim })
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
            } else if (card.hora_fim <= props.horario_fim) {
                return ('bottomBorder')
            }

            if (card.hora < props.horario && card.hora_fim > props.horario_fim) {

                return ('mediumBorder')

            }
        } else {
            return ('empCard')
        }
    }
    useEffect(() => {

        setWidth((props.countAten / props.card.length) + 'vw')
    }, [props.card, props.horario]);

    function alterarAgenda(cadastro) {
        cadastro.confirm = props.isEdit.confirm
        cadastro.assinado = props.isEdit.assinado
        cadastro.hora = props.horario
        cadastro.indice = props.index
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

    function anularTransferencia(user) {
        window.alert('Horário bloqueado por ' + user)
        props.setIsEdit(false)
    }

    function inputClose() {
        props.setRefresh(props.card)
    }

    function Aberto({ item, index }) {
        return (
            <div
                //border: `${parseInt(item.id) == 0 ?                         
                onClick={() =>
                    props.isEdit ?
                        alterarAgenda(item)
                        : props.setInput(2, item, hrs)
                } className={`card aberto`} style={{ width: width }} key={index}
            >
                <p style={{ color: '#4c95e2' }} >
                    {
                        item.hora >= props.horario ?
                            item.hora.substr(0, 5)
                            : ''
                    }
                </p>

            </div>

        )
    }
    function Bloqueio({ item, index }) {
        return (
            <div
                onClick={() =>
                    props.isEdit ?
                        anularTransferencia(item.user) :
                        deleteA(props.card[0], inputClose, props.user)
                } className={` bloqueio`} style={{ width: width }} key={index}
            >
                <p>
                    {item.nota}

                </p>

            </div>
        )
    }

    function Agendado({ item, index }) {
        
        const confirms = [
            '',
            <GiCheckMark/>,
        ]

        return (
            <div
                style={{
                    width: width,
                    backgroundColor: `${parseInt(item.assinado) > 0 ?
                        '#b2b6b9'
                        : getColor(item.sala)
                        }`,
                }}
                className={`card ${setClass(item)}`} key={index}
                
            >
                <p onClick={() =>
                    props.isEdit ?
                        alterarAgenda(item)
                        : props.setInput(2, item, hrs)
                }>
                    {item.hora >= props.horario && item.nome_cliente?
                    item.nome_cliente : ''    
                }
                </p>
                <p onClick={() =>
                    props.isEdit ?
                        alterarAgenda(item)
                        : props.setInput(2, item, hrs)
                }
                style={{color:item.assinado === 1 ? '#ee4235':'', fontWeight:500}}
                >{
                    item.hora >= props.horario ?
                        parseInt(item.assinado) > 1 ?
                        'Assinatura:'
                        : parseInt(item.assinado) === 1 ?
                            'Não assinado'
                            : item.nome_procedimento
                    :''
                        }   
                </p>
                <p >{
                    item.hora >= props.horario ? item.user &&
                        parseInt(item.assinado) > 1 ?
                        item.assinado
                        : item.nota ?
                            <label className="labelA">{item.nota}</label>
                            : item.assinado === 0 && item.telefone.length > 0? <div className="inline2">
                                <span onClick={()=> copy(item.telefone)}>{`(${item.telefone.substr(2,2)})${item.telefone.substr(4,item.telefone.length-8)}-${item.telefone.substr(-4,4)}`}</span>
                                <div className="check" onClick={()=>confirmarAgenda(item,inputClose)}> {confirms[item.confirm]} </div>
                            </div> 
                    : <div></div> : <div></div>
                }
                </p>
            </div>
        )
    }

    function Disp0({ item, index }) {
        const [disp, setDisp] = useState(false)
        function abrir(){
            let resp = window.confirm('Deseja abrir esse horário?')
            if(resp){
                setDisp(true)
            }
        }
        return (
            <div>
             {disp?
                <div
                //border: `${parseInt(item.id) == 0 ?                         
                onClick={() =>
                    props.isEdit ?
                        alterarAgenda(item)
                        : props.setInput(2, item, hrs)
                } className={`card aberto`} style={{ width: width }} key={index}
            >
                <p style={{ color: props.color }} >
                    {
                        item.hora >= props.horario ?
                            props.hora.substr(0, 5)
                            : ''
                    }
                </p>

            </div>
            :
            <div
                className="card disp0" key={index} style={{ width: width, backgroundColor: props.card.length > 1 && '#fff' }}
                onClick={() => props.isEdit ?
                    alterarAgenda(item)
                    : abrir()
                        
                }

            >      </div>}
            </div>
        
        )
    }

    return (
        <div className="cards" >
            {props.card.map((item, index) =>


                item && item.nome_cliente ?

                    item.procedimento == 4 ?
                        <Bloqueio item={item} index={index} />
                    
                    :   item.procedimento == 2 ?
                            <Aberto item={item} index={index} />
                         
                        :   <Agendado item={item} index={index} />
                
                :  item && props.disp && props.disp== 1 && item.disp && item.disp == 1 && (item.data == moment().format('YYYY-MM-DD') && item.hora > moment().format('HH:mm') || item.data > moment().format('YYYY-MM-DD')) ?

                    <Aberto item={item} index={index} />
                    :   <Disp0 item={item} index={index} />
            )}
        </div>


    )
} export default Day