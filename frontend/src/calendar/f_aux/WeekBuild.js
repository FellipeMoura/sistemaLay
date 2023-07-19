
export default function calendarBuild(value){

    const startDay = value.clone().startOf('week')
    //console.log(startDay)
    const endDay = value.clone().endOf('week')
   // console.log(endDay)
    const day = startDay.clone().subtract(1, 'day')
   // console.log(day)
    
    const calendar = []

    while(day.isBefore(endDay, 'day')){
        calendar.push(
            Array(7).fill(0).map(()=> day.add(1, 'day').clone())
        )
    }
    //console.log(calendar)
    return(calendar)
} 