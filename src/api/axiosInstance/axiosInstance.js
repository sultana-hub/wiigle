import axios from 'axios'
import { baseUrl } from '../url'

const axiosInstance=axios.create({
    baseURL:baseUrl
})

export default axiosInstance