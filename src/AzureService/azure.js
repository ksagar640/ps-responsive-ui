import axios from "axios";
import { baseURL } from "./url";


const accessToken = localStorage.getItem("token");

export default axios.create({
    baseURL : baseURL,
    headers : {
        "Ocp-Apim-Trace": "true",
        "Authorization" : `Bearer ${accessToken}`
    }
});