import { useEffect, useState } from "react";
import moment from "moment";
import "./MonthForm.scss";
import { Days } from "../f_aux/WeekStyled";
import calendarBuild from "../f_aux/WeekBuild";
import { IconButton } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

export default function Calendar() {
  
  const today = moment()
    
  const [currentYear, setCurrentYear] = useState(2023);
  const [currentWeek, setCurrentWeek] = useState();
  const [dateSelected, setDateSelected] = useState([]);
  const startDate = moment().locale("pt").month(today._d.getMonth()).year('2023')

  const endDate = moment().locale("pt").month('December').year('2023')
  const [calendar, setCalendar] = useState([]);
  const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
  
 

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


  useEffect(() => {
    setCalendar(calendarBuild(startDate,endDate));
    
  }, []);


  const week = calendar

  return (
    <div id="calendarPage">

      <div className="headerPage">

        <IconButton
          size="small"
          onClick={() => setCurrentWeek(setCalendar())}
        >
          <KeyboardArrowLeftIcon style={{ color: "#143296", fontSize: 40 }} />
        </IconButton>
        {month[currentWeek]}
        <IconButton
          size="small"
          onClick={() => setCurrentWeek(currentWeek + 1)}
        >
          <KeyboardArrowRightIcon style={{ color: "#143296", fontSize: 40 }} />
        </IconButton>

      </div>

      <div className="content">

      <div id="monthCard">
      <div className="weekDays">
        <WeekCard
            calendar={calendar}
        />
        </div>

    </div>

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
  const [currentWeek, setCurrentWeek] = useState(props.calendar[0])
  console.log(currentWeek)
  return (
    <div id="monthCard">
      <div className="weekDays">
        {weekDays.map((value, index) => (
          <div className="weekDay" key={index}>
            {value}
          </div>
        ))}
      </div>
       
        {props.calendar.map((week) => (
        <div className="week" key={week}>
          {week.map((day) => (
            
            <DayCard
              key={day._d.getTime() + props.month}
              day={day}
              month={day._d.getMonth()}
              year={day._d.getYear()}
              dateSelected={props.dateSelected}
              setDateSelected={props.setDateSelected}
            />
          ))}
        </div>
      ))}
      <button
      type="button"
      onClick={()=> setCurrentWeek(props.calendar[1])}
      />
    </div>


  );
}

function DayCard(props) {
  const [state, setState] = useState("");

  const day = props.day._d;

 /* useEffect(() => {
    const currentMonth = new Date(props.month + ",01," + props.year);

    if (day.getMonth() !== currentMonth.getMonth()) {
      setState("nonPertenceMonth");
      return;
    }

    if (props.dateSelected.find((value) => value.getTime() === day.getTime())) {
      setState("selected");
    } else {
      setState("");
    }
  }, [day, props.month, props.year, props.dateSelected]);

  const handleClickDate = () => {
    if (state !== "nonPertenceMonth")
      if (
        props.dateSelected.find((value) => value.getTime() === day.getTime())
      ) {
        setState("");
        props.setDateSelected(
          props.dateSelected.filter(
            (value) => value.getTime() !== day.getTime()
          )
        );
      } else {
        setState("selected");
        props.setDateSelected([...props.dateSelected, day]);
      }
  };
*/
  return (
    <Days state={state} onClick=''>
      {props.day.format("DD").toString()}
    </Days>
  );
}

/* 
          */