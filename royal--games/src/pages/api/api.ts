import axios from "axios";
import secureLocalStorage from "react-secure-storage";
                
const apiLocal =  "https://localhost:7104/api/"; // colocar o localhost do visualStudio 
// const apiLocal =  "http://localhost:3000/api"; // colocar o localhost do visualStudio 

const apiRemota = "";

export const api = axios.create({
    baseURL: apiLocal
})

api.interceptors.request.use((config) => {
    const token = secureLocalStorage.getItem("Token");

    token
        ? config.headers.Authorization = "Bearer " + token
        : null;

    return config;
});