import { useEffect, useState } from "react";
import 'moment/locale/pt-br'
import "./DayForm.css";
import { IconButton, Input } from "@mui/material";
import Day from "../c_layouts/Day";
import Anestesic from "../c_layouts/Anestesic";
import { AiOutlineMenu } from 'react-icons/ai'
import { RiRefreshLine } from 'react-icons/ri'
import { VscChevronRight, VscChevronLeft } from 'react-icons/vsc'
import MonthForm from "./MonthForm";
import Modal from 'react-modal'
import { Pdf } from "../c_layouts/Pdf";
import { NewAten } from "../c_layouts/NewAten";
import { DisabledForm } from "./DisabledForm";
import SalaDay from "../c_layouts/SalaDay";
import { BiPrinter, BiHomeHeart, BiUser } from 'react-icons/bi'
import { MdOutlineMeetingRoom } from 'react-icons/md'
import { BsCalendarX, BsTrash } from 'react-icons/bs'
import { GiLabCoat } from 'react-icons/gi'
import { getColor2 } from "../c_layouts/salaColor";

export default function DayForm(props) {

  const [project, setProject] = useState([])
  const [modalIsOpen, setIsOpen] = useState(false)
  const [currentModal, setCurrentModal] = useState(0)
  const [mes, setMes] = useState(0)

  function handleCloseModal() {
    setIsOpen(false)

  }

  function handleOpenModal(value, month) {
    if (value === 2) {
      setMes(month)
    }
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
      empresa={props.empresa} unidade={props.unidade}
      handleCloseModal={handleCloseModal}
    />,
    <MonthForm
      currentMonth={mes}
      setCurrentDay={props.setCurrentDay}
      setCurrentFormat={handleCloseModal}
    />,
    <DisabledForm
      empresa={props.empresa} unidade={props.unidade}
      handleCloseModal={handleCloseModal}
    />
  ]


  const customStyles = {
    content: {
      left: '50%',
      top: '50%',
      bottom: '-40%',
      right: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      overflowY: 'hidden'

      //height: '400px'

    }
  }
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  function HoverDropdown() {


    const handleMouseEnter = () => {
      setDropdownVisible(true);
    };

    const handleMouseLeave = () => {
      setDropdownVisible(false);
    };
    return (
      <div className="menu">
        <header className="headerMenu">
          <div
            className="menu"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <AiOutlineMenu />

            {isDropdownVisible &&

              <div className="dropdown-menu">

                <ul onClick={() => setDropdownVisible(false)}>
                  <li onClick={() => window.location.replace(`/clientes/${props.unidade}/${props.user}`)}><BiUser /> <span> Clientes</span></li>
                  <li onClick={() => handleOpenModal(0)}> <BiPrinter /> Imprimir</li>
                  <li onClick={() => window.location.replace(`/editA/${props.unidade}/${props.user}`)}><GiLabCoat /><span>Atendentes</span></li>
                  <li onClick={() => props.setCurrentFormat(4, {})}><MdOutlineMeetingRoom /><span>Salas</span></li>
                  <li onClick={() => handleOpenModal(3)}><BsTrash /><span> Desativados</span></li>
                </ul>

              </div>


            }
          </div>
        </header>
      </div>
    );
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


        <Modal
          ariaHideApp={false}
          isOpen={modalIsOpen}
          onRequestClose={handleCloseModal}
          style={customStyles}
        >
          {modals[currentModal]}
        </Modal>


        <HoverDropdown />

        <div className="data">
          <IconButton
            size="small"
            onClick={() => mudar(props.currentDay.clone().subtract(1, "day"))}
          >
            <VscChevronLeft style={{ color: "#143296", fontSize: 40 }} />

          </IconButton>
          <div className="subData" onClick={() => handleOpenModal(2, parseInt(props.currentDay.format('M') - 1))}>
            <span> {props.currentDay.format('DD') + '/' + props.currentDay.format('MMMM')}</span>
            <span style={{ fontSize: '.8em' }}> {props.currentDay.format('dddd')}</span>
          </div>
          <IconButton
            size="small"
            onClick={() => mudar(props.currentDay.clone().add(1, "day"))}
          >
            <VscChevronRight style={{ color: "#143296", fontSize: 40 }} />
          </IconButton>
        </div>


        <div className="headerMenu" onClick={() => window.location.replace(`/calendar/${props.unidade}/${props.user}`)}>
          <RiRefreshLine />
        </div>


      </div>

      <div className="content">

        <WeekCard
          isDropdownVisible={isDropdownVisible}
          refresh={props.refresh}
          setRefresh={props.setRefresh}
          isEdit={props.isEdit}
          setIsEdit={props.setIsEdit}
          setInput={props.setInput}
          user={props.user}
          empresa={props.empresa} unidade={props.unidade}
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
    '20:00',
    '20:40',
    '21:20',


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
    '20:00',
    '20:40',
    '21:20',
    '22:00'
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
            horarioss.map((hora, index) => (
              <div key={index}>
                {hora}
              </div>
            ))
          }
        </div>

        {props.atendentes ? props.atendentes.map((day, index) => (

          <DayCard
            isDropdownVisible={props.isDropdownVisible}
            isEdit={props.isEdit}
            setIsEdit={props.setIsEdit}
            setInput={props.setInput}
            user={props.user}
            color={color[props.atendentes.indexOf(day)]}
            horarios={horarios}
            refresh={props.refresh}
            setRefresh={props.setRefresh}
            countAten={94 / (props.atendentes.length + 1)}
            atendente={day}
            isOne={props.atendentes.length - props.atendentes.indexOf(day)}
            index={index}
            day={props.day}
            empresa={props.empresa} unidade={props.unidade}

          />
        ))

          : () => props.mapCalendar()}

        <Anestesico
          isEdit={props.isEdit}
          horarios={horarios}
          setIsEdit={props.setIsEdit}
          setInput={props.setInput}
          user={props.user}
          day={props.day}
          unidade={props.unidade}
          countAten={94 / (props.atendentes.length + 1)}
          refresh={props.refresh}
          setRefresh={props.setRefresh}
        />

        <Sala
          refresh={props.refresh}
          setRefresh={props.setRefresh}
          isEdit={props.isEdit}
          setIsEdit={props.setIsEdit}
          setInput={props.setInput}
          user={props.user}
          day={props.day}
          empresa={props.empresa} unidade={props.unidade}

        />


      </div>

    </div>



  );
}


function DayCard(props) {

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

      })
      .catch(err => console.log(err))

  }, [props.day, props.refresh]);

  return (
    <div className="atendList" >
      <div className='atendente' style={{ width: (props.countAten) + 'vw' }} >

        {props.atendente.nome}

      </div>

      {
        card.map((hora, index) => (

          // console.log(card[card.indexOf(hora)][0]),
          <div
            style={{ backgroundColor: `` }}

            key={index}

          >

            <Day
              refresh={props.refresh}
              setRefresh={props.setRefresh}
              isEdit={props.isEdit}
              setIsEdit={props.setIsEdit}
              setInput={props.setInput}
              user={props.user}
              isOne={props.isOne}
              horario={props.horarios[index]}
              horario_fim={props.horarios[index + 1]}
              index={index}
              countAten={props.countAten}
              empresa={props.empresa} unidade={props.unidade}
              hora={hora[0].hora}
              color={getColor2(props.index)}
              card={hora}
              disp={semana(props.day.format('d'), index)}
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
    // console.log(props.refresh)
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


  }, [props.day, props.refresh]);

  return (
    <div className="atendList" >
      <div className='atendente' style={{ width: (props.countAten) + 'vw' }} >

        Anestésico

      </div>

      {
        card.map((hora, index) => (

          //console.log(hora.hora+props.day.format('L')+props.atendente.nome),
          <div
            style={{ backgroundColor: `` }}

            key={index}

          >

            <Anestesic
              refresh={props.refresh}
              setRefresh={props.setRefresh}
              user={props.user}
              horario={props.horarios[index]}
              horario_fim={props.horarios[index + 1]}
              index={index}
              isEdit={props.isEdit}
              setIsEdit={props.setIsEdit}
              setInput={props.setInput}
              countAten={props.countAten}
              empresa={props.empresa} unidade={props.unidade}
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

function Sala(props) {
  const [card, setCard] = useState([]);
  //const sem = `props.day.${sem}.substr(card.indexOf(hora), 1)`





  useEffect(() => {
    // console.log(props.refresh)
    fetch(`${process.env.REACT_APP_CALENDAR}/buscarBloqueio/${props.day.format('YYYY-MM-DD')}/${props.unidade}`, {
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



  }, [props.day, props.refresh]);

  return (
    card.map((item, index) =>
      <div key={index} className="atendList" >


        <div className='atendente' style={{ width: '20px' }} >

          {item[0].sala}

        </div>

        {
          item.map((hora, index) =>

            //console.log(hora.hora+props.day.format('L')+props.atendente.nome),
            <div
              style={{ backgroundColor: `` }}

              key={index}

            >

              <SalaDay
                refresh={props.refresh}
                setRefresh={props.setRefresh}
                user={props.user}
                isEdit={props.isEdit}
                setIsEdit={props.setIsEdit}
                setInput={props.setInput}
                countAten={props.countAten}
                empresa={props.empresa} unidade={props.unidade}
                hora={item.hora}
                color={props.color}
                card={hora}

              />


            </div>
          )}

      </div>


    ));
}

/* 
          */