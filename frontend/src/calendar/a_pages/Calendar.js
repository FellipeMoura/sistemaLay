import React, { useState, useEffect } from "react";
import { useParams } from 'react-router';
import YearForm from '../b_forms/YearForm'
import MonthForm from '../b_forms/MonthForm'
import WeekForm from '../b_forms/WeekForm'
import DayForm from '../b_forms/DayForm'
import SalaForm from '../b_forms/SalaForm'
import moment from "moment";
import InputDay from "../c_layouts/InputDay";
import InputAnes from "../c_layouts/InputAnes";

function Calendar() {
    const { data } = useParams()
    const { unidade } = useParams()
    const { user } = useParams()
    const [clients, setClients] = useState([])
    const [atendentes, setAtendentes] = useState([])
    const [mes, setMes] = useState(0)
    const [dataCard, setDataCard] = useState({})
    const [isEdit, setIsEdit] = useState(false)

    // console.log(user)
    //console.log()
    useEffect(() => {
        //console.log(unidade)
        fetch(`${process.env.REACT_APP_CALENDAR}/clients`, {
            method: "GET",
            heders: {
                'Content-type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((resp2) => {

                setClients(resp2)
                // console.log(resp2.length)
            })
            .catch(err => console.log(err))

        fetch(`${process.env.REACT_APP_CALENDAR}/atendentes/${unidade}`, {
            method: "GET",
            heders: {
                'Content-type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((resp2) => {

                setAtendentes(resp2)
            })
            .catch(err => console.log(err))


        fetch(`${process.env.REACT_APP_CALENDAR}/attAssinado/${moment().locale("pt-br").format('Y-MM-DD/HH:mm')}`, {
            method: "PUT",
            heders: {
                'Content-type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((resp2) => {

            })
            .catch(err => console.log(err))



    }, [])

    const [currentDay, setCurrentDay] = useState(data ? moment(data.split('-')).clone().locale("pt-br").subtract(1, 'month') : moment().locale("pt-br"));
    const [currentFormat, setCurrentFormat] = useState(1)
    function setToMonth(month) {
        setMes(month - 1)
        console.log(month - 1)
        setCurrentFormat(0)
    }
    const color = [

        '#5dbda5',
        '#5dbabd',
        '#5da7bd',
        '#5d97bd',
        '#5d83bd',
        '#5d73bd',
        '#5d63bd',
        '#725dbd',
        '#8a5dbd',
        '#a25dbd',
        '#b55dbd',
        '#bd5d98',
        '#bd5d75',

    ]

    function setInput(page, dataCard) {
        setDataCard(dataCard)
        setCurrentFormat(page)

    }


    const pers = [
        <MonthForm
            currentMonth={mes}
            setCurrentDay={setCurrentDay}
            setCurrentFormat={setCurrentFormat}
        />,
        <DayForm
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            setInput={setInput}
            user={user}
            clients={clients}
            currentDay={currentDay}
            setCurrentDay={setCurrentDay}
            unidade={unidade}
            atendentes={atendentes}
            setToMonth={setToMonth}
            setCurrentFormat={setCurrentFormat}
        />,
        <InputDay
            setIsEdit={setIsEdit}
            user={user}
            unidade={unidade}
            dataCard={dataCard}
            setCurrentFormat={setCurrentFormat}
            clients={clients}
        />,
        <InputAnes
            setIsEdit={setIsEdit}
            user={user}
            unidade={unidade}
            dataCard={dataCard}
            setCurrentFormat={setCurrentFormat}
            clients={clients}
        />,
        <SalaForm
        user={user}
            unidade={unidade}
            setCurrentFormat={setCurrentFormat}
    />
    ]



    return (
        pers[currentFormat]
    )
}

export default Calendar