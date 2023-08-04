import { useEffect, useState } from "react";
import moment from "moment";
import "./MonthForm.scss";
import { Days } from "../f_aux/MonthStyled";
import calendarBuild from "../f_aux/CalendarBuild";
import { IconButton } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

export default function MonthForm(props) {
  const [currentYear, setCurrentYear] = useState(2023);
  const [currentMonth, setCurrentMonth] = useState(props.currentMonth);
  const [dateSelected, setDateSelected] = useState([]);

  console.log(props.currentMonth);

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
  const [monthList, setMontList] = useState([])

  useEffect(() => {
    month.map((value) => (
      monthTemp.push(
      <MonthCard
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

      <div className="headerPage">

        <IconButton
          size="small"
          onClick={() => setCurrentMonth(currentMonth - 1)}
        >
          <KeyboardArrowLeftIcon style={{ color: "#143296", fontSize: 40 }} />
        </IconButton>
        {month[currentMonth]}
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
            <DayCard
            setCurrentFormat={props.setCurrentFormat}
            setCurrentDay={props.setCurrentDay}
              key={day._d.getTime() + props.month}
              day={day}
              month={props.month}
              year={props.currentYear}
              dateSelected={props.dateSelected}
              setDateSelected={props.setDateSelected}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function DayCard(props) {
  const [state, setState] = useState("");

  const day = props.day._d;

  useEffect(() => {
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

  function toDay(){
    props.setCurrentDay(moment(props.day).locale("pt"))
    props.setCurrentFormat(1)
  }

  return (
    <Days state={state} onClick={handleClickDate}>
      <button
        className="buttonMonth"
          type='button'
          onClick={()=> toDay()}
        >
          {props.day.format("DD").toString()}
        </button>
      
    </Days>
  );
}