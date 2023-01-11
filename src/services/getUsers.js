const BASE_URL = "https://wefitapi.onrender.com/user"

export const getUsers = async (token) => {
    const data = await fetch(BASE_URL, {
        method: 'GET',
        headers: {
            'Accept' : 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    }).then((e) => {
        return e.json()
    }).catch((error) => {
        console.log(error);
    })

    const users = data.users
    return users
}

