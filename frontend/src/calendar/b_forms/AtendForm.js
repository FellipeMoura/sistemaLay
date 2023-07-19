import { useEffect, useState } from "react";
import { useParams } from 'react-router';
import 'moment/locale/pt-br'
import "./AtendForm.scss";
import Open from "../c_layouts/Open";
import {VscSave} from 'react-icons/vsc'
import {ImCancelCircle} from 'react-icons/im'
import {FiEyeOff} from 'react-icons/fi'
import moment from "moment";

export function AtendForm(props) {

  const [project, setProject] = useState([])
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

  function setTotal(e, projeto) {
    let temp = project

    temp[e].check = projeto


   // console.log(temp)
    setProject(temp)
    //console.log(temp)
    //console.log(props.atendente.check)
  }

  //console.log(props.currentDay.format('ddd'))
  useEffect(() => {

    //console.log(moment('2023-01-01 08:00').format('HH:mm'))
    
    let x = moment('2023-01-01 08:00')
    let y //= moment('2023-01-01 08:00')
    
    x.subtract(1, 'minutes')
   
    console.log(x.format('HH:mm'))

    fetch(`${process.env.REACT_APP_CALENDAR}/atendente/${props.atendente}`, {
      method: "GET",
      heders: {
        'Content-type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((resp2) => {

        setProject(resp2[0])


      })
      .catch(err => console.log(err))
    

  }, [])

  function alterarA(atendente) {
    let resp = window.confirm(`Deseja ocultar a ${props.atendente} atendente da agenda?`)
    if (resp) {
    fetch(`${process.env.REACT_APP_CALENDAR}/alterarA/${atendente}/${props.unidade + 90}`, {
      method: "PUT",
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(),
    })
      .then((resp) => resp.json()).then((data) => {
       // console.log(data);
        window.alert("Status alterado!")

        window.location.replace(`/calendar/${props.unidade}/${props.user}`)
        // history.push(`/prontuario/${id}/${idrecord}/1`)
        //redirect
      })
      .catch(err => console.log(err))
    }
  }

  function alterarS() {
    fetch(`${process.env.REACT_APP_CALENDAR}/alterarS/${props.atendente}`, {
      method: "PUT",
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json()).then((data) => {
       // console.log(data);
        window.alert("Agenda alterada!")

        window.location.replace(`/calendar/${props.unidade}/${props.user}`)
        // history.push(`/prontuario/${id}/${idrecord}/1`)
        //redirect
      })
      .catch(err => console.log(err))
  }


  return (
    <div className="atend">
      <div className="headerAtend">
        <span>Atendente: {props.atendente}</span>
        <button  style={{border:`1px solid #128f18`}}onClick={() => alterarS()}>
          salvar <VscSave />
        </button>
        <button style={{border:`1px solid #222`}} onClick={() => window.location.replace(`/calendar/${props.unidade}/${props.user}`)}>
          cancelar <ImCancelCircle/>
        </button>
        <button style={{border:`1px solid #8f1212`}} onClick={() => alterarA(props.atendente)}>
          ocultar <FiEyeOff/>
        </button>
      </div>

      <div className="bodyAtend">

        <div className="atendHora" >

          {
            horarios.map((hora) => (
              <div className="atendHoras" key={horarios.indexOf(hora)} style={{ height: `${hora.size}` }}>
                <span>{hora}</span>
              </div>
            ))
          }
        </div>
        <div className="atendOpt">
          {project.map((day) => (
            //hora.color = (hora.color+opacity[props.atendentes.indexOf(day)]),
            //console.log(day.color+opacity[props.atendentes.indexOf(day)]),

            <DayCard
              setTotal={setTotal}
              indice={project.indexOf(day)}
              project={project}
              state={day}
              key={project.indexOf(day)}
              horarios={horarios}
              dia={project[project.indexOf(day)].nome}

              dateSelected={props.dateSelected}
              setDateSelected={props.setDateSelected}
            />


          ))}

        </div>






      </div>

    </div>
  );
}


function DayCard(props) {
  const [state, setState] = useState("");
  const [card, setCard] = useState(props.state.check);

  function setDisp(e, troca) {
    let temp = card

    temp[e] == '0' ?
      temp[e] = '1' : temp[e] = '0';

    temp[e] == '0' ?
      troca(0) : troca(1);


    setCard(temp)
    props.setTotal(props.indice, temp)
    //console.log(temp)
    //console.log(props.atendente.check)
  }

  useEffect(() => {


 


  }, [props.day, props.project]);

  return (
    <div className="daysAtend">
      <div className="semAtend">
        <span>
          {props.dia}
        </span>

      </div>

      {
        props.horarios.map((hora) => (

          <Open

            card={card[props.horarios.indexOf(hora)]}
            i={props.horarios.indexOf(hora)}
            key={props.horarios.indexOf(hora)}
            event={setDisp}
          >
            {card[props.horarios.indexOf(hora)] == 1 ? 'aberto' : 'fechado'}
          </Open>




        ))
      }
    </div>
  );
}

/* 
          */