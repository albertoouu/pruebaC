import React from 'react'
import { NavLink } from 'react-router-dom'
import useAuth from '../auth/useAuth'


const Navbar = () => {
    const auth = useAuth()
    return (
        <>
            <ul>
                <li>
                    <NavLink to='/'>Home</NavLink>
                </li>
                <li>
                    <NavLink to='/about'>About</NavLink>
                </li>
                {auth.isLogged() && (
                    <>
                        <li>
                            <NavLink to='/dashboard'>Dashboard</NavLink>
                        </li>
                        <li>
                            <NavLink to='/payments'>Payments</NavLink>
                        </li>
                    </>
                )}
                <li>
                    <NavLink to='/users'>Users</NavLink>
                </li>
                {!auth.isLogged() && (
                    <>
                        <li>
                            <NavLink to='/register'>Register</NavLink>
                        </li>
                        <li>
                            <NavLink to='/login'>Login</NavLink>
                        </li>
                    </>
                )}
                {auth.isLogged() && (
                    <li>
                        <button onClick={auth.logout}>LogOut</button>
                    </li>
                )}
            </ul>
        </>
    )
}

export default Navbar