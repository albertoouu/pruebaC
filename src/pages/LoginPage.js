import React from 'react'
import useAuth from '../auth/useAuth'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const auth = useAuth()
  const handleLogin = () => {
    auth.login()
    navigate('/dashboard')
  }
  return (
    <>
      <div>LoginPage</div>
      <button onClick={handleLogin}>LogIn</button>
    </>
  )
}

export default Login