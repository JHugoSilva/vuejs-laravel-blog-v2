import { LoginResponseType } from './../views/auth/actions/LoginUser';
import Storage from "./Storage";

export function getUserData(): LoginResponseType | undefined {
    const userData = Storage.get('userData')

    if (typeof userData === 'undefined') {
        window.location.href = '/'
    }

    try {
        if (typeof userData !== 'object') {
            const connectedUser:LoginResponseType = JSON.parse(userData)
            return connectedUser
        }
    } catch (error) {
        console.log(error);
    }
}