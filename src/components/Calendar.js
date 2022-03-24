import React from 'react'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
require("moment/locale/es-mx") // Opcional.....
//import 'moment-timezone'
//moment.tz.setDefault("America/Mexico_City")
const localizer = momentLocalizer(moment)

const events = [
  {
    title: "Fecha1",
    allDay: true,
    start: new Date("2022-03-04"),
    end: new Date("2022-03-04")
  },
  {
    title: "Fecha2",
    allDay: true,
    start: new Date("2022-03-03"),
    end: new Date("2022-03-03")
  },
  {
    title: "Fecha3",
    allDay: true,
    start: new Date("2022-03-03"),
    end: new Date("2022-03-03")
  },
]

const Calendar = () => {
  return (
    <>
      <div>Calendar</div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
      />
    </>
  )
}

export default Calendar