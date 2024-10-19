import axios from "axios";

const instance = axios.create({
    // baseURL:`${import.meta.env.BASEURL}`
    // baseURL: "http://localhost:4000"
    baseURL:"https://dealsdraytask-be.onrender.com"
})

export default instance