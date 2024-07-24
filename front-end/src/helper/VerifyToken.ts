import { getUserData } from "./GetUserData";


export function verifyToken() {

    const userData = getUserData()
    
    const config = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+userData?.access_token
        }
    }

    return config
}