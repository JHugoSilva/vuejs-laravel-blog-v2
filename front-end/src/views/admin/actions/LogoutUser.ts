import { verifyToken } from "../../../helper/VerifyToken";
import { APP } from "../../../shared/App";

export type LogoutResponseType = {
    message: string
}

export async function logoutUserHttp() {
    const  { headers } = verifyToken()
    
    return new Promise<LogoutResponseType>(async(resolve, reject)=>{
        
        const response = await fetch(`${APP.apiURL}/auth/logout`, {
            method: 'DELETE',
            headers: headers,
        })
        const data = await response.json()

        if (!response.ok) {
            reject(data)
        }

        resolve(data)
    })
}