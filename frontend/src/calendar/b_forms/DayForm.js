import { useEffect, useState } from "react";
import moment from "moment";
import 'moment/locale/pt-br'
import "./DayForm.scss";

import { IconButton, Input } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Day from "../c_layouts/Day";
import Anestesic from "../c_layouts/Anestesic";
import { AiOutlineFilePdf } from 'react-icons/ai'
import { MdPersonAdd } from 'react-icons/md'
import { SlRefresh } from 'react-icons/sl'
import Modal from 'react-modal'
import { Pdf } from "../c_layouts/Pdf";
import { NewAten } from "../c_layouts/NewAten";


export default function DayForm(props) {

  const [project, setProject] = useState([])

  const [modalIsOpen, setIsOpen] = useState(false)

  function handleCloseModal() {
    setIsOpen(false)

  }

  function handleOpenModal(value) {
    setCurrentModal(value)
    setIsOpen(true)
  }

  const modals = [
    <Pdf
      atendentes={props.atendentes}
      handleCloseModal={handleCloseModal}
    />,
    <NewAten
      user={props.user}
      unidade={props.unidade}
      handleCloseModal={handleCloseModal}
    />
  ]
  const [currentModal, setCurrentModal] = useState(0)


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



  //console.log(props.currentDay.format('ddd'))


  function mudar(value) {


    props.setCurrentDay(value)
    setProject(props.horarios)
    //console.log(props.currentDay)

  }
  return (
    <div id="dayPage">

      <div className="headerPage">

        <IconButton
          size="small"
          onClick={() => mudar(props.currentDay.clone().subtract(1, "day"))}
        >
          <KeyboardArrowLeftIcon style={{ color: "#143296", fontSize: 40 }} />
        </IconButton>
        <Modal
          ariaHideApp={false}
          isOpen={modalIsOpen}
          onRequestClose={handleCloseModal}
          style={customStyles}
        >
          {modals[currentModal]}
        </Modal>
        <div className="pdfHeader" onClick={() => handleOpenModal(0)}>
          <AiOutlineFilePdf />
        </div>
        <div className="pdfHeader" onClick={() => window.location.replace(`/calendar/${props.unidade}/${props.user}`)}>
          <SlRefresh />
        </div>
        <div className="data">
          <button
            type="button"
            onClick={() => ''}
          >
            {props.currentDay.format('DD') + ' /'}
          </button>

          <button
            type="button"
            onClick={() => props.setCurrentFormat(props.currentDay.format('M'))}
          >
            {props.currentDay.format('MMM') + ' /'}
          </button>

          <button
            type="button"
            onClick={() => ''}
          >
            {props.currentDay.format('YY')}
          </button>
        </div>
        <div className="pdfHeader" onClick={() => handleOpenModal(1)}>
          <MdPersonAdd />
        </div>
        <div></div>
        <IconButton
          size="small"
          onClick={() => mudar(props.currentDay.clone().add(1, "day"))}
        >
          <KeyboardArrowRightIcon style={{ color: "#143296", fontSize: 40 }} />
        </IconButton>

      </div>

      <div className="content">

        <WeekCard
          isEdit={props.isEdit}
          setIsEdit={props.setIsEdit}
          setInput={props.setInput}
          user={props.user}
          unidade={props.unidade}
          clients={props.clients}
          atendentes={props.atendentes}
          day={props.currentDay}
          size={'3em'}
        // mes={mes}

        />

      </div>

    </div>
  );
}

function WeekCard(props) {


  //const [horas, setHoras] = useState (horas)

  let horarioss = [
    '08:00',
    '08:40',
    '09:20',
    '10:00',
    '10:40',
    '11:20',
    '12:00',
    '12:40',
    '13:20',
    '14:00',
    '14:40',
    '15:20',
    '16:00',
    '16:40',
    '17:20',
    '18:00',
    '18:40',
    '19:20',
  ]
  let horarios = [
    '08:00',
    '08:40',
    '09:20',
    '10:00',
    '10:40',
    '11:20',
    '12:00',
    '12:40',
    '13:20',
    '14:00',
    '14:40',
    '15:20',
    '16:00',
    '16:40',
    '17:20',
    '18:00',
    '18:40',
    '19:20',
    '20:00'
  ]

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

  return (
    <div id="dayCard">

      <div className="inlineHours">

        <div className="horas">

          {
            horarioss.map((hora) => (
              <div key={horarios.indexOf(hora)}>
                <span>{hora}</span>
              </div>
            ))
          }
        </div>


        <Anestesico
          isEdit={props.isEdit}
          setIsEdit={props.setIsEdit}
          setInput={props.setInput}
          user={props.user}
          day={props.day}
          unidade={props.unidade}
          countAten={94 / (props.atendentes.length + 1)}
        />

        {props.atendentes ? props.atendentes.map((day) => (
          //hora.color = (hora.color+opacity[props.atendentes.indexOf(day)]),
          //console.log(day.color+opacity[props.atendentes.indexOf(day)]),

          <DayCard
            isEdit={props.isEdit}
            setIsEdit={props.setIsEdit}
            setInput={props.setInput}
            user={props.user}
            color={color[props.atendentes.indexOf(day)]}
            horarios={horarios}

            countAten={94 / (props.atendentes.length + 1)}
            atendente={day}
            isOne={props.atendentes.length - props.atendentes.indexOf(day)}
            key={day.nome}
            day={props.day}
            unidade={props.unidade}

          />
        )) : () => props.mapCalendar()}



      </div>

    </div>



  );
}


function DayCard(props) {
  const [states, setStates] = useState();
  const [card, setCard] = useState([]);
  //const sem = `props.day.${sem}.substr(card.indexOf(hora), 1)`


  function semana(x, hora) {

    if (x == 0) {
      return props.atendente.dom.substr(hora, 1);

    } else if (x == 1) {
      return (props.atendente.seg.substr(hora, 1));
    } else if (x == 2) {
      return (props.atendente.ter.substr(hora, 1));
    } else if (x == 3) {
      return (props.atendente.qua.substr(hora, 1));
    } else if (x == 4) {
      return (props.atendente.qui.substr(hora, 1));
    } else if (x == 5) {
      return (props.atendente.sex.substr(hora, 1));
    } else {
      return (props.atendente.sab.substr(hora, 1));
    }

  }



  useEffect(() => {

    fetch(`${process.env.REACT_APP_CALENDAR}/maestrins/${props.day.format('YYYY-MM-DD')}/${props.atendente.nome}/${props.unidade}`, {
      method: "GET",
      heders: {
        'Content-type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((resp2) => {
        setCard(resp2)
        //  console.log(resp2)

      })
      .catch(err => console.log(err))
    // console.log(card)
  }, [props.day, props.card]);

  return (
    <div className="atendList" >
      <div className='atendente' style={{ width: (props.countAten) + 'vw' }}>
        <button className="atendButton"
          onClick={() => window.location.replace(`/EditA/${props.unidade}/${props.atendente.nome}/${props.user}`)}>
          {props.atendente.nome}

        </button>

      </div>

      {
        card.map((hora) => (

          // console.log(card[card.indexOf(hora)][0]),
          <div
            style={{ backgroundColor: `` }}

            key={card.indexOf(hora)}

          >

            <Day
              isEdit={props.isEdit}
              setIsEdit={props.setIsEdit}
              setInput={props.setInput}
              user={props.user}
              isOne={props.isOne}
              horario={props.horarios[card.indexOf(hora)]}
              horario_fim={props.horarios[card.indexOf(hora) + 1]}
              index={card.indexOf(hora)}
              countAten={props.countAten}
              unidade={props.unidade}
              hora={hora[0].hora}
              color={props.color}
              card={card[card.indexOf(hora)]}
              disp={semana(props.day.format('d'), card.indexOf(hora))}
            />



          </div>
        ))
      }
    </div>
  );
}

function Anestesico(props) {

  const [card, setCard] = useState([]);
  //const sem = `props.day.${sem}.substr(card.indexOf(hora), 1)`





  useEffect(() => {

    fetch(`${process.env.REACT_APP_CALENDAR}/maestrins/${props.day.format('YYYY-MM-DD')}/Anestesico/${props.unidade}`, {
      method: "GET",
      heders: {
        'Content-type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((resp2) => {
        setCard(resp2)

      })
      .catch(err => console.log(err))



  }, [props.day]);

  return (
    <div className="atendList">
      <div className='atendente' style={{ width: (props.countAten) + 'vw' }}>
        <button className="atendButton"
        >
          Anestésico

        </button>

      </div>

      {
        card.map((hora) => (

          //console.log(hora.hora+props.day.format('L')+props.atendente.nome),
          <div
            style={{ backgroundColor: `` }}

            key={hora[0].hora}

          >

            <Anestesic
              isEdit={props.isEdit}
              setIsEdit={props.setIsEdit}
              setInput={props.setInput}
              countAten={props.countAten}
              unidade={props.unidade}
              hora={hora[0].hora}
              color={props.color}
              card={card[card.indexOf(hora)]}

            />



          </div>
        ))
      }
    </div>


  );
}

/* 
          */