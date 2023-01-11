import { fetchUser } from "./fetchUser"
const BASE_URL = 'https://wefitapi.onrender.com/user/register'

export const createUser = async (user) => {
    const data = await fetch(BASE_URL, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((data) => {
        return data.json()
    }).catch((error) => {
        return error
    })

    if (data.token) {
        return await fetchUser(data.token)
    }

    return data
}