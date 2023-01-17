import { auth } from '../services/auth'
import { createUser } from '../services/createUser'
import { useState } from 'react'
import { fetchUser } from '../services/fetchUser'
import { useUserContext } from './useUserContext'
import { updateUser } from '../services/updateUser'

const useAuth = () => {

    const [loading, setLoading] = useState(false)
    const { user, setUser } = useUserContext()

    const logIn = async (email, senha) => {
        setLoading(true)
        const { token, user } = await auth({ email, senha })
        if (token) {
            localStorage.setItem('@Auth:token', token)
        }

        setLoading(false)
        return user
    }

    const register = async (u) => {
        setLoading(true)
        const { token, user } = await createUser(u)
        let userAuthorizated = undefined

        if (token) {
            localStorage.setItem('@Auth:token', token)
        }

        userAuthorizated = user
        setLoading(false)
        return userAuthorizated
    }

    const logOut = async () => {
        setLoading(true)
        localStorage.removeItem('@Auth:token')
        setUser(undefined)
        setLoading(false)
    }

    const updateUserAuth = async () => {
        setLoading(true)
        await updateUser(localStorage.getItem('@Auth:token'), user)
        setUser(user)
        setLoading(false)
    }

    async function checkToken() {
        setLoading(true)
        let u = undefined
        if (localStorage.length > 0) {
            u = await fetchUser(localStorage.getItem('@Auth:token'))
            u = u.user
        }
        setLoading(false)
        return u
    }


    return {
        logIn,
        logOut,
        register,
        loading,
        checkToken,
        updateUserAuth
    }
}

export default useAuth


