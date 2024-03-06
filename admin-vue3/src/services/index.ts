import axios, { AxiosResponse } from 'axios';


const request = axios.create({
    timeout:5000
})

request.interceptors.request.use((config)=>{
    
    return config;
})

request.interceptors.response.use((resp:AxiosResponse)=>{

    return resp;
})







export default request;