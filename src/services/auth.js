import { fetchUser } from "./fetchUser"

const BASE_URL = `https://wefitapi.onrender.com/user/login`

export const auth = async (user) => {
    const userAuth = await fetch(BASE_URL, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((data) => {
        return data.json()
    }).catch((error) => {
        return undefined
    })

    return await fetchUser(userAuth.token)
}