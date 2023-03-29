import axios from 'axios'

export const axiosIns = axios.create({baseURL: 'http://localhost:8000'});