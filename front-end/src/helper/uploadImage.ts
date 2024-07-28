import { getUserData } from "./GetUserData"

export function uploadImageHeader(file:any, postId:number) {

    const userData = getUserData()
    const headers = new Headers()
    headers.append('Authorization', 'Bearer '+userData?.access_token)
    const form = new FormData()
    form.append('image', file)
    form.append('id', postId.toString())

    const requestOptions = {
        method: 'POST',
        headers: headers,
        body: form
    }

    return requestOptions
}


export function getSelectImage(e:any, el:string) {

    const selectedImage = e.target.files[0]

    const output = document.getElementById(el) as HTMLImageElement

    output.src = URL.createObjectURL(selectedImage)
    output.onload = function () {
        URL.revokeObjectURL(output.src)
    }

    return selectedImage
}