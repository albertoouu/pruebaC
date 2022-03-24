import React, { useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app'
import { getFirestore, addDoc, collection, query, onSnapshot } from 'firebase/firestore'
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

  useEffect(() => {
    //mounts
    const q = query(collection(db, 'Users'))
    const unsub = onSnapshot(q, (snap) => {
      const array = snap.docs.map(doc => {
        return {
          id: doc.id,
          title: doc.get('name'),
          start: doc.get('date_start').toDate(),
          end: doc.get('date_start').toDate(),
          allDay: true
        }
      })
      setData([...array])
    })
    //unmounts
    return () => { unsub() }
  }, [])

  const handleRangeChange = e => {
    console.log(e)
  }

  return (
    <>
      <div>HomePage</div>
      <Calendar
        onRangeChange={handleRangeChange}
        localizer={localizer}
        events={data}
        style={{ height: 500, margin: "50px" }}
        onSelectSlot={handleClick}
        selectable
      />
    </>
  )
}

export default HomePage