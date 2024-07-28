import { verifyToken } from "../../../helper/VerifyToken";
import { APP } from "../../../shared/App";

export type UserIsLoggedInResponseType = {
    message: string
}

export async function userIsLoggedInHttp() {
    const  { headers } = verifyToken()
    
    return new Promise<UserIsLoggedInResponseType>(async(resolve, reject)=>{
        
        const response = await fetch(`${APP.apiURL}/auth/check/user/loggedin`, {
            method: 'GET',
            headers: headers,
        })
        const data = await response.json()

        if (!response.ok) {
            // reject(new Error('An inspected error occurred !'))
            reject(data)
        }

        resolve(data)
    })
}