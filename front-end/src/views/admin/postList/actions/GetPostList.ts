import { IPostList } from './../types/postList-types';
import { verifyToken } from "../../../../helper/VerifyToken";
import { APP } from "../../../../shared/App";

export type GetPostResponseType = {
    data:Array<IPostList>
} & Record<string, string|number>

export async function getPostHttp(page:number, query:string) {
    const  { headers } = verifyToken()
    return new Promise<GetPostResponseType>(async(resolve, reject)=>{
        
        const response = await fetch(`${APP.apiURL}/posts/posts?page=${page}&query=${query}`, {
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