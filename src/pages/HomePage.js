import React, { useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app'
import { getFirestore, addDoc, collection, query, onSnapshot, orderBy, startAt, endAt } from 'firebase/firestore'
import firebaseConfig from '../config'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
require("moment/locale/es-mx")
const localizer = momentLocalizer(moment)
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const handleClick = e => {
  const title = prompt('enter a title', e.start)
  const event = {
    title: title ? title : e.start,
    start: e.start,
    end: e.start,
    allDay: true
  }
  addDoc(collection(db, 'CalendarTest'), event)
}



const HomePage = () => {

  const [data, setData] = useState([])
  const [range, setRange] = useState({
    start: new Date(),
    end: new Date()
  })

  useEffect(() => {
    //mounts
    const q = query(collection(db, 'CalendarTest'), orderBy('start'), startAt(range.start), endAt(range.end))
    const unsub = onSnapshot(q, (snap) => {
      const array = snap.docs.map(doc => {
        return {
          id: doc.id,
          title: doc.get('title'),
          start: doc.get('start').toDate(),
          end: doc.get('end').toDate(),
          allDay: doc.get('allDay')
        }
      })
      console.log(array)
      setData([...array])
    })
    //unmounts
    return () => { unsub() }
  }, [range])

  const handleRangeChange = e => {
    setRange({ start: e.start, end: e.end })
  }

  return (
    <>
      <div>HomePage</div>
      <Calendar
        localizer={localizer}
        events={data}
        style={{ height: 500, margin: "50px" }}
        onSelectSlot={handleClick}
        selectable
        onRangeChange={handleRangeChange}
      />
    </>
  )
}

export default HomePage