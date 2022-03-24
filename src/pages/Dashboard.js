import { useState, useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, query, onSnapshot, orderBy, startAt, endAt } from 'firebase/firestore'
import firebaseConfig from '../config'
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const handleClick = e => {
  console.log('click')
}
const Dashboard = () => {

  const [data, setData] = useState([])
  const [range, setRange] = useState({
    start: new Date(),
    end: new Date()
  })
  useEffect(() => {
    //mounts
    const q = query(collection(db, 'Users'), orderBy('next_payday'), startAt(range.start), endAt(range.end))
    const unsub = onSnapshot(q, (snap) => {
      const array = snap.docs.map(doc => {
        let color = 'default'
        if (new Date().getTime() > doc.get('payday').toDate().getTime()) color = 'grey'
        return {
          id: doc.id,
          title: doc.get('name'),
          start: doc.get('payday').toDate(),
          allDay: true,
          color
        }
      })
      const payDays = snap.docs.map(doc => {
        return {
          id: doc.id,
          title: doc.get('name'),
          start: doc.get('next_payday').toDate(),
          allDay: true,
          color: 'blue'
        }
      })
      const allDays = array.concat(payDays)
      setData([...allDays])
    })
    //unmounts
    return () => { unsub() }
  }, [range])

  const handleDatesSet = (e) => {
    //console.log(e)
    setRange({ start: e.start, end: e.end })
  }

  const calendarStyle = {
    margin: '40px',
    maxWidth: 1000
  }

  return (
    <>
      <Link to='comunity'>Comunidad</Link>
      <br />
      <Link to='form'>formulario</Link>
      <div>Dashboard</div>
      <Outlet />
      <div style={calendarStyle}>
        <FullCalendar
          events={data}
          plugins={[dayGridPlugin, interactionPlugin]}
          dateClick={handleClick}
          datesSet={handleDatesSet}
        />
      </div>
    </>
  )
}

export default Dashboard