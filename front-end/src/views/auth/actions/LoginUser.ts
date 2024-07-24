import { APP } from "../../../shared/App";
import { ILoginInput } from "../auth-types";

export type LoginResponseType = {
    user: {
        id: number,
        name: string,
        email: string
    },
    access_token: string
}

export async function loginUserHttp(input:ILoginInput) {
    
    return new Promise<LoginResponseType>(async(resolve, reject)=>{

        const response = await fetch(`${APP.apiURL}/auth/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'content-Type': 'application/json'
            },
            body: JSON.stringify(input)
        })
        const data = await response.json()

        if (!response.ok) {
            // reject(new Error('An inspected error occurred !'))
            reject(data)
        }

        resolve(data)
    })
}