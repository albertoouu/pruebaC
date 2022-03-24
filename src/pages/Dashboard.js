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
    const q = query(collection(db, 'Users'), orderBy('date_start'), startAt(range.start), endAt(range.end))
    const unsub = onSnapshot(q, (snap) => {
      const array = snap.docs.map(doc => {
        let color = 'default'
        if (new Date().getTime() > doc.get('date_start').toDate().getTime()) color = 'grey'
        return {
          id: doc.id,
          title: doc.get('name'),
          start: doc.get('date_start').toDate(),
          allDay: true,
          color
        }
      })
      console.log(array)
      setData([...array])
    })
    //unmounts
    return () => { unsub() }
  }, [range])

  const handleDatesSet = (e) => {
    //console.log(e)
    setRange({ start: e.start, end: e.end })
  }

  return (
    <>
      <Link to='comunity'>Comunidad</Link>
      <br />
      <Link to='form'>formulario</Link>
      <div>Dashboard</div>
      <Outlet />
      <FullCalendar
        events={data}
        plugins={[dayGridPlugin, interactionPlugin]}
        dateClick={handleClick}
        datesSet={handleDatesSet}
      />
    </>
  )
}

export default Dashboard