import { Navigate } from 'react-router-dom'
import React from 'react'
import useAuth from '../auth/useAuth'


const PublicRoute = ({ children }) => {
  const auth = useAuth()
  if (!auth.isLogged()) return (<>{children}</>)
  return (<Navigate to='/dashboard' />)

}

export default PublicRoute