import { useState, useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, query, onSnapshot, orderBy, startAt, endAt } from 'firebase/firestore'
import firebaseConfig from '../config'
import ModalU from '../components/Modal'
/*
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
*/

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)



const Dashboard = () => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [data, setData] = useState([])
  const [range, setRange] = useState({
    start: new Date(),
    end: new Date()
  })


  const handleClick = e => {
    console.log('click')
  }

  const handleSelected = e => {
    console.log(e)
    handleShow()
  }

  const handleEventClick = e => {
    console.log(e)
  }

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
      console.log(data)
    })
    //unmounts
    return () => { unsub() }
  }, [range])

  const handleDatesSet = (e) => {
    //console.log(e)
    setRange({ start: e.start, end: e.end })
  }

  const calendarStyle = {
    margin: '100px',
    maxWidth: 800
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
          select={handleSelected}
          selectable={true}
          eventClick={handleEventClick}
        />
      </div>
      <ModalU show={show} setShow={setShow} />
    </>
  )
}

export default Dashboard