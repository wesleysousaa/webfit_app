const BASE_URL = 'https://wefitapi.onrender.com/user/fetchUser'

export const fetchUser = async (token) =>{
    const userData = await fetch(BASE_URL, {
        method: 'GET',
        headers: {
            'Accept' : 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    }).then((data) => {
        return data.json()
    }).catch((error) => {
        console.log(error)
    })

    return {user: userData.user, token}
}