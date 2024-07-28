import { verifyToken } from "../../../../helper/VerifyToken";
import { APP } from "../../../../shared/App";

export type DeletePostResponseType = {
    message: string
}

export async function deletePostHttp(postId:number) {
    const  { headers } = verifyToken()
    return new Promise<DeletePostResponseType>(async(resolve, reject)=>{
        
        const response = await fetch(`${APP.apiURL}/posts/post/${postId}`, {
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