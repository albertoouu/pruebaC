import { useContext } from 'react'
import { AuthContext } from './AuthProvider'
import React from 'react'

const useAuth = () => {
  const contextValue = useContext(AuthContext)
  return contextValue
}

export default useAuth