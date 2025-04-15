import axios from 'axios'
const token = localStorage.getItem('token')

const instance = axios.create({
  baseURL: 'http://8.137.157.16:9002',
  // baseURL:'/api',
  timeout: 3000,
  headers: {
    Authorization: `Bearer ${token}`
  }
})
export const setToken = (token) => {
  localStorage.setItem('token', token)
  instance.defaults.headers.Authorization = `Bearer ${token}`
}
export default instance