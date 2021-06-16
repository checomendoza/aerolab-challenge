import Axios from 'axios'
const URL_API='https://coding-challenge-api.aerolab.co'
const TOKEN ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGM2OTkyODliNzc4MTAwMjA5YzVhYzkiLCJpYXQiOjE2MjM2MjgwNzJ9.8S2EWxviaSLApOGpm6pJuNxpDheSKNCzgz1bfPtJioM'
Axios.defaults.headers.common['Authorization'] = `Bearer ${TOKEN}`

export async function getUser(){
    return Axios.get(`${URL_API}/user/me`)
}
export async function postPoints(){
    return Axios.post(`${URL_API}/user/points`, {'amount': 1000})
}