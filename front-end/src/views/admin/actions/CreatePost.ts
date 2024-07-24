import { verifyToken } from "../../../helper/VerifyToken";
import { APP } from "../../../shared/App";
import { ICreatePostInput } from "../admin-types";


export type PostResponseType = {
    message: string
}

export async function createPostHttp(input:ICreatePostInput) {
    const  { headers } = verifyToken()
    return new Promise<PostResponseType>(async(resolve, reject)=>{
        
        const response = await fetch(`${APP.apiURL}/posts/post`, {
            method: 'POST',
            headers: headers,
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