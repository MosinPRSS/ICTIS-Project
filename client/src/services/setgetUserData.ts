export async function setUserData(user: object) {
    await fetch('http://127.0.0.1:8000/api/u/update', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    })
}

export async function getUserData(user: object): Promise<object> {
    const response = await fetch('http://localhost:5173/userdata')
    const userData = await response.json()

    return JSON.parse(userData)
}