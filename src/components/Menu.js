import React from 'react'
import styles from './Menu.module.css'

import { NavLink, Link } from 'react-router-dom'

// Hooks
import { useUserContext } from '../hooks/useUserContext'
import useAuth from '../hooks/useAuth'

function Menu() {
    const { user } = useUserContext()
    const {logOut} = useAuth()

    return (
        <nav>
            <div className={styles.header}>
                <h1>Web Fit</h1>
            </div>
            <ul>
                <NavLink to='/'>
                    <li>Minha Ficha</li>
                </NavLink>
                {!user ? (
                    <NavLink to='/login'>
                        <li>Login</li>
                    </NavLink>
                ) : (
                    <Link onClick={logOut} to='/'>
                        <li>Sair</li>
                    </Link>
                )}

            </ul>
        </nav>
    )
}

export default Menu