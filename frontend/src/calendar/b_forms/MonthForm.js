import { useEffect, useState } from "react";
import moment from "moment";
import "./MonthForm.scss";
import 'moment/locale/pt-br'
import calendarBuild from "../f_aux/CalendarBuild";
import { IconButton } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

export default function MonthForm(props) {
  const [currentYear, setCurrentYear] = useState(2023);
  const [currentMonth, setCurrentMonth] = useState(props.currentMonth);
  const [dateSelected, setDateSelected] = useState([]);

  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthPT = [
    "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
  ];
  moment.updateLocale("pt", {
    months: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ],
  });

  var monthTemp = []
  const [monthList, setMontList] = useState([])

  function toDay(day, month){
    props.setCurrentDay(moment(day).locale("pt-br"))
    props.setCurrentFormat()
    setCurrentMonth(month)
  }

  useEffect(() => {
    month.map((value) => (
      monthTemp.push(
      <MonthCard
      toDay={toDay}
        currentMonth={currentMonth}
        setCurrentFormat={props.setCurrentFormat}
        setCurrentDay={props.setCurrentDay}
        key={value}
        month={value}
        currentYear={currentYear}
        dateSelected={dateSelected}
        setDateSelected={setDateSelected}
      />
      ))
    )
    setMontList([...monthTemp])
  }, []);




  return (
    <div id="calendarPage">
      <div className='mouthPage'>
      <div className="headerPage">

        <IconButton
          size="small"
          onClick={() => setCurrentMonth(currentMonth - 1)}
        >
          <KeyboardArrowLeftIcon style={{ color: "#143296", fontSize: 40 }} />
        </IconButton>
        {monthPT[currentMonth]}
        <IconButton
          size="small"
          onClick={() => setCurrentMonth(currentMonth + 1)}
        >
          <KeyboardArrowRightIcon style={{ color: "#143296", fontSize: 40 }} />
        </IconButton>

      </div>

      <div className="content">

        {monthList[currentMonth]}

      </div>
      </div>
    </div>
  );
}

function MonthCard(props) {

  const [value, setValue] = useState(
    moment().locale("pt").month(props.month).year(props.currentYear)
  );
  const [calendar, setCalendar] = useState([]);
  const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
  

  useEffect(() => {
    setValue(value.year(props.currentYear));
    setCalendar(calendarBuild(value));
   
  }, [value, props.currentYear]);

  return (
    <div id="monthCard">
      <div className="weekDays">
        {weekDays.map((value, index) => (
          <div className="weekDay" key={index}>
            {value}
          </div>
        ))}
      </div>
      {calendar.map((week) => (
        <div className="week" key={week}>
          {week.map((day) => (
            
            <div key ={day.format('DD')}className="Days" onClick={()=> props.toDay(day, parseInt(day.format('M'))-1)}>
              <div style={{color: parseInt(day.format('M'))-1== props.currentMonth? '#0f2879' : '#555353'}}>
            {day.format("DD").toString()}
            </div>
        
      </div>
         ))}
        </div>
      ))}
    </div>
  );
}
