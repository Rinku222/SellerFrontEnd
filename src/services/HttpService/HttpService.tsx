 
import axios from 'axios';
import {Auth} from 'aws-amplify';

const baseUrl = ""

Auth.currentSession().then(res=>{
    const accessToken = res.getAccessToken()
    const jwt = accessToken.getJwtToken()
     //You can print them to see the full objects
     console.log(`myAccessToken: ${JSON.stringify(accessToken)}`)
     console.log(`myJwt: ${jwt}`)
    return axios.interceptors.request.use(async(config)=>{
        config.headers['Content-Type'] = 'application/json'
        config.headers.Authorization = accessToken
        return config
    })
})


export async function createService(endpoint:string, body = {}, params = {}) {
    return axios.post(baseUrl + endpoint, body,params)
        .then((res) => {
            return res
        })
        .catch((error) => {
            console.log("create data error is" + JSON.stringify(error))
            // return error
            if (error.response) {
                console.log(error.response);
                console.log("server responded");
                return error.response
            } 
        })
}
 
export async function readService(endpoint:string, params = {}) {
    return axios.get(baseUrl + endpoint,params)
        .then((res) => {
            return res
        })
        .catch((error) => {
            return error
        })
}
 
export async function updateService(endpoint:string, params = {}, body:object) {
    return axios.put(baseUrl + endpoint, body, params)
        .then((res) => {
            return res
        })
        .catch((error) => {
            return error
        })
}
 
export async function deleteService(endpoint:string, params = {}) {
    return axios.delete(baseUrl + endpoint,params)
        .then((res) => {
            return res
        })
        .catch((error) => {
            return error
        })
}

