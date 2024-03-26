import axios from "axios";

const axios_instance = axios.create({
    baseURL: 'http://localhost:8080/',
})


axios_instance.interceptors.response.use(response =>{
    const response_data = {
        data: response?.data,
        status: response.status
    }
    return response_data;
},(err)=>{
    console.log(err);
})





export default axios_instance;