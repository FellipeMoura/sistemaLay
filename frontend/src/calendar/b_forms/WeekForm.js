import { useEffect, useState } from "react";
import moment from "moment";
import 'moment/locale/pt-br'
import "./WeekForm.scss";
import { Days } from "../f_aux/WeekStyled";
import calendarBuild from "../f_aux/WeekBuild";
import { IconButton } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Day from "../c_layouts/Day";

export default function WeekForm(props) {

  
  var today = moment().locale("pt-br")
  
  const [currentWeek, setCurrentWeek] = useState(moment().locale("pt-br"));
  const [dateSelected, setDateSelected] = useState([]);
  // const startDate = moment().locale("pt").month(today._d.getMonth()).year('2023')

  const endDate = moment().locale("pt").month('December').year('2023')
  const [calendar, setCalendar] = useState([]);



  useEffect(() => {
    mapCalendar()
  }, [])

  function mapCalendar() {
    setCalendar(calendarBuild(currentWeek));
  }

  console.log(today.format('MMMM'))

  function changeWeek(value) {
    value ? setCurrentWeek(currentWeek.add(7, 'days'))
      : setCurrentWeek(currentWeek.subtract(7, 'days'))
    setCalendar(calendarBuild(currentWeek))
  }

  const mes = currentWeek.format('MMMM YYYY')


  return (
    <div id="calendarPage">

      <div className="headerPage">

        <IconButton
          size="small"
          onClick={() => changeWeek(false)}
        >
          <KeyboardArrowLeftIcon style={{ color: "#143296", fontSize: 40 }} />
        </IconButton>
        <div className="data">
       
        <button
          type="button"
          onClick={()=> props.setCurrentFormat(1)}
        >
          {currentWeek.format('MMMM')}
        </button>
        /
        <button
          type="button"
          onClick={()=> props.setCurrentFormat(0)}
        >
          {currentWeek.format('YYYY')}
        </button>
        </div>
        <IconButton
          size="small"
          onClick={() => changeWeek(true)}
        >
          <KeyboardArrowRightIcon style={{ color: "#143296", fontSize: 40 }} />
        </IconButton>

      </div>

      <div className="content">
    
            <WeekCard
              setCurrentDay={props.setCurrentDay}
              setCurrentFormat={props.setCurrentFormat}
              horarios={props.horarios}
              mapCalendar={mapCalendar}
              size={'3em'}
              mes={mes}
              calendar={calendar}
            />

      </div>

    </div>
  );
}

/*  <MonthCard
                  calendar={calendar}     
                  currentYear={currentYear}
                  dateSelected={dateSelected}
                  setDateSelected={setDateSelected}
                /> */

function WeekCard(props) {

  const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
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
  const temp =[
    {hora:8, color:color[0],size:props.size,status:'gray'},
    {hora:9, color:color[1],size:props.size,status:'gray'},
    {hora:10, color:color[2],size:props.size,status:'gray'},
    {hora:11, color:color[3],size:props.size,status:'gray'},
    {hora:12, color:color[4],size:props.size,status:'gray'},
    {hora:13, color:color[5],size:props.size,status:'gray'},
    {hora:14, color:color[6],size:props.size,status:'gray'},
    {hora:15, color:color[7],size:props.size,status:'gray'},
    {hora:16, color:color[8],size:props.size,status:'gray'},
    {hora:17, color:color[9],size:props.size,status:'gray'},
    {hora:18, color:color[10],size:props.size,status:'gray'},
    {hora:19, color:color[11],size:props.size,status:'gray'},
    {hora:20, color:color[12],size:props.size,status:'gray'}
  ]
  const [horas, setHoras] = useState (temp)
  
  const opacity = [
    'e9',
    'c9',
    'a9',
    '89',
    '69',
    '49',
    '39'    
 
  ]

  

  //console.log(opacity[props.calendar[0].indexOf(props.calendar[0][1])])
  return (
    <div id="monthCard">
      
      <div className="inlineHours">
      
      <div className="horas">
        {
            temp.map((hora) =>(
                <div style={{height:`${hora.size}`,backgroundColor:`${hora.color}`}}>
                    <span>{hora.hora+'h'}</span>
                </div>
            ))
        }
        </div>

      {props.calendar[0] ? props.calendar[0].map((day) => (
      //hora.color = (hora.color+opacity[props.calendar[0].indexOf(day)]),
      console.log(day.color+opacity[props.calendar[0].indexOf(day)]),
      
        <DayCard
        setCurrentFormat={props.setCurrentFormat}
          setCurrentDay={props.setCurrentDay}
          setHoras={setHoras}
          horarios={props.horarios}
          key={day._d.getTime() + props.month}
          day={day}
          opacity={opacity[props.calendar[0].indexOf(day)]}
          month={props.mes}
          horas={temp}
          year={day._d.getYear()}
          dateSelected={props.dateSelected}
          setDateSelected={props.setDateSelected}
        />
      )) : () => props.mapCalendar()}
      </div>

    </div>



  );
}

function DayCard(props) {
  const [state, setState] = useState("");

  const day = props.day._d;

  const currentMonth = new Date(props.month + ",01," + props.year);

  useEffect(() => {
    
    
    props.horarios?
      setState("nonPertenceMonth")
      : props.setHoras("")


  }, [props.day]);

  function toDay(){
    props.setCurrentDay(moment(props.day).locale("pt"))
    props.setCurrentFormat(3)
  }

  return (
    <Days state={state} >
      <div className='weekDaysWeek'>
        <button
          type='button'
          onClick={()=> toDay()}
        >
      { state? props.day.format('ddd DD')+'/'+props.day.format('MMM')
              :props.day.format('ddd DD')
      }
      </button>
      
      </div>

      {
        props.horas.map((hora)=>(
          
          console.log(hora.color+props.opacity),
          <div style={{
            height:`${hora.size}`,
            backgroundColor:`${hora.color}`+`${props.opacity}`,                  
            borderLeft:`5px solid ${hora.status}`,
            margin: '1px',
            borderRadius: '5px'
          }}>
            {
              props.horarios ? props.horarios : ''
            
            }
          </div>
        ))
      }
    </Days>
  );
}

/* 
          */