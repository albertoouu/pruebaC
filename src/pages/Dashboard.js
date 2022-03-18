import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <>
      <Link to='comunity'>Comunidad</Link>
      <br />
      <Link to='form'>formulario</Link>
      <div>Dashboard</div>
      <Outlet />
    </>
  )
}

export default Dashboard