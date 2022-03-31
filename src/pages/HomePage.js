import React, { useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, query, onSnapshot } from 'firebase/firestore'
import firebaseConfig from '../config'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import ModalU from '../components/Modal'
require("moment/locale/es-mx")
const localizer = momentLocalizer(moment)
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)




const HomePage = () => {

  const [data, setData] = useState([])
  const [users, setUsers] = useState([])
  const [modalUserInfo, setModalUserInfo] = useState({})
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const handleClick = e => {
    const user = users.filter(u => {
      if (e.id === u.id) return true
    })
    setModalUserInfo({
      title: user[0].title,
      strPayday: user[0].start.toDateString(),
      strNext_payday: user[0].nextPayDay.toDateString(),
      payday: user[0].nextPayDay,
      id: user[0].id
    })
    handleShow()
  }

  const eventPropGetter = (event, start, end, isSelected) => {
    let newStyle = {
      background: "blue",
      color: "white",
    }
    if (event.paid) {
      newStyle.backgroundColor = 'grey'
    }
    if (event.late) {
      newStyle.backgroundColor = 'red'
    }
    return {
      className: "",
      style: newStyle
    }
  }

  useEffect(() => {
    //mounts
    const q = query(collection(db, 'Users'))
    const unsub = onSnapshot(q, (snap) => {
      const array = snap.docs.map(doc => {
        return {
          id: doc.id,
          title: doc.get('name'),
          start: doc.get('payday').toDate(),
          nextPayDay: doc.get('next_payday').toDate(),
          end: doc.get('payday').toDate(),
          allDay: true,
          paid: true
        }
      })
      const payDays = snap.docs.map(doc => {
        let late = true
        if (new Date().getTime() < doc.get('next_payday').toDate().getTime()) late = false
        return {
          id: doc.id,
          title: doc.get('name'),
          start: doc.get('next_payday').toDate(),
          end: doc.get('next_payday').toDate(),
          allDay: true,
          paid: false,
          late
        }
      })
      const allDays = array.concat(payDays)
      setUsers([...array])
      setData([...allDays])
    })
    //unmounts
    return () => { unsub() }
  }, [])

  /* const handleRangeChange = e => {
     console.log(e)
   }
   */

  return (
    <>
      <div>HomePage</div>
      <Calendar
        //onRangeChange={handleRangeChange}
        localizer={localizer}
        events={data}
        style={{ height: 500, margin: "50px" }}
        onSelectEvent={handleClick}
        selectable
        eventPropGetter={eventPropGetter}
      />
      <ModalU show={show} setShow={setShow} modalUserInfo={modalUserInfo} />
    </>
  )
}

export default HomePage