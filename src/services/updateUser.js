const BASE_URL = "https://wefitapi.onrender.com/user/update"

export const updateUser = async (token, user) => {
    const res = await fetch(BASE_URL, {
        method: 'PATCH',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then((e) => {
        return e.json()
    }).catch((error) => {
        console.log(error);
    })
    return res
}

