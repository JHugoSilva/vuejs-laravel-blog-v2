
interface IApi {
    apiStatus: 'developpement'|'production',
    developpement: {
        baseURL: string,
        apiURL: string
    },
    production: {
        baseURL: string,
        apiURL: string
    }
}

const appApi:IApi = {
    developpement: {
        baseURL: 'http://127.0.0.1:8000',
        apiURL: 'http://127.0.0.1:8000/api'
    },
    production: {
        baseURL: '',
        apiURL: ''
    },
    apiStatus: 'developpement',
}

export const APP = appApi.apiStatus == 'developpement' ? appApi.developpement : appApi.production