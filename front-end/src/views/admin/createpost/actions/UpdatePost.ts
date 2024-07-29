import { verifyToken } from "../../../../helper/VerifyToken";
import { APP } from "../../../../shared/App";
import { IUpdatePostInput } from '../types/updatePost.types';


export type PostResponseType = {
    message: string
}

export async function updatePostHttp(input:IUpdatePostInput) {
    const  { headers } = verifyToken()
    return new Promise<PostResponseType>(async(resolve, reject)=>{
        
        const response = await fetch(`${APP.apiURL}/posts/post/${input.id}`, {
            method: 'PUT',
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