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
import Modal from 'react-modal'
import './calendar.css'
function Calendar() {
    const { data } = useParams()
    const { unidade } = useParams()
    const { user } = useParams()
    const [clients, setClients] = useState([])
    const [atendentes, setAtendentes] = useState([])

    const [dataCard, setDataCard] = useState([{atendente:''}])
    const [isEdit, setIsEdit] = useState(false)
    const [refresh, setRefresh] = useState('')
    const [next, setNextt] = useState(false)
    // console.log(user)
    //console.log()
    useEffect(() => {

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

         
    }, [next])

    const [currentDay, setCurrentDay] = useState(data ? moment(data.split('-')).clone().locale("pt-br").subtract(1, 'month') : moment().locale("pt-br"));
    const [currentFormat, setCurrentFormat] = useState(1)



    function setInput(page, dataCard, hrs) {
        setDataCard([dataCard, hrs])
        page == 1 ? handleCloseModal()
            : handleOpenModal()

        setRefresh(Math.random())
    }

    function setNext() {
        window.alert('foi')
        setNextt(Math.random())
        setRefresh(Math.random())
        
    }

    const customStyles = {
        content: {
            left: '50%',
            top: '50%',
            bottom: '-40%',
            right: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',

            //height: '400px'

        }
    }

    const [modalIsOpen, setIsOpen] = useState(false)

    function handleCloseModal() {
        setIsOpen(false)

    }

    function handleOpenModal() {

        setIsOpen(true)
    }



    const pers = [
        <MonthForm
            currentMonth={''}
            setCurrentDay={setCurrentDay}
            setCurrentFormat={setCurrentFormat}
        />,
        <DayForm
            setNext={setNext}
            refresh={refresh}
            setRefresh={setRefresh}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            setInput={setInput}
            user={user}
            clients={clients}
            currentDay={currentDay}
            setCurrentDay={setCurrentDay}
            unidade={unidade}
            atendentes={atendentes}

            setCurrentFormat={setCurrentFormat}
        />,
        <InputDay
            setRefresh={setRefresh}
            setIsEdit={setIsEdit}
            user={user}
            unidade={unidade}
            dataCard={dataCard}
            setInput={setInput}
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
        <div className="container">
            <Modal
                ariaHideApp={false}
                isOpen={modalIsOpen}
                onRequestClose={handleCloseModal}
                style={customStyles}
            >{dataCard[0].atendente == 'Anestesico' ?
                <InputAnes
                    setIsEdit={setIsEdit}
                    setRefresh={setRefresh}
                    user={user}
                    unidade={unidade}
                    setInput={setInput}
                    dataCard={dataCard}
                    setCurrentFormat={setCurrentFormat}
                    clients={clients}
                /> :
                <InputDay
                    setRefresh={setRefresh}
                    setIsEdit={setIsEdit}
                    user={user}
                    setInput={setInput}
                    unidade={unidade}
                    dataCard={dataCard}
                    setCurrentFormat={setCurrentFormat}
                    clients={clients}
                />}
            </Modal>
            {pers[currentFormat]}
        </div>
    )
}

export default Calendar