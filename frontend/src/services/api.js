import axios from "axios";

const API = axios.create({

    baseURL: import.meta.env.VITE_API_URL

});

export const getPredictions = () => API.get("/predictions");

export const getWarehouseRecords = () => API.get("/warehouse");

export default API;