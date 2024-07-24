import { APP } from "../../../shared/App";
import { IRegisterInput } from "../auth-types";

type RegisterResponseType = {
    user: IRegisterInput,
    message: string
}

export async function registerUserHttp(input:IRegisterInput) {
    
    return new Promise<RegisterResponseType>(async(resolve, reject)=>{

        const response = await fetch(`${APP.apiURL}/auth/register`, {
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