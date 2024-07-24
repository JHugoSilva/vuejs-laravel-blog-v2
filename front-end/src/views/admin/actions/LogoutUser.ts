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
            // body: JSON.stringify({userId:userId})
        })
        const data = await response.json()

        if (!response.ok) {
            // reject(new Error('An inspected error occurred !'))
            reject(data)
        }

        resolve(data)
    })
}