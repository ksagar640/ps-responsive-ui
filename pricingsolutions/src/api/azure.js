import axios from "axios";

export default axios.create({
    baseURL : "https://apim-price-intg-01.azure-api.net",
    headers : {
        "Ocp-Apim-Trace": "true",
    }
});