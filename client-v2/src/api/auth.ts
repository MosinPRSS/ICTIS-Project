// here all functions connected w/ auth
import axios from "axios";

export default async function login(
    email: string,
    password: string
    ) {
    try {
        const res = await axios({
            method: 'post',
            url: "http://127.0.0.1/api/a/api-token", 
            data: {
                "email": email,
                "password": password
            }
        })
        if (res.status === 200) {
            console.log("Working! Code: " + res.status) 
        } else {
            console.log("smth went wrong... " + res.status)
        }
    } catch (error) {
        console.log("unexpected error")
    }
    return
}