import axios from 'axios'

const api = axios.create({baseURL: process.env.REACT_APP_BACKEND})

export const useApi = () => ({
    validateToken: async(token) => {
        const response = await api.get('/validate', {token})
        
        return response.data;
        
    },
    signin: async(user,pass) => {
        const response = await api.get(`signin/${user}/${pass}`)
        .then((login)=>{
            console.log(login)
            return login
            
        })
        .catch((noLogin)=>{
            return (noLogin)
        })

        return response
        
    },
    logout: async({user, pass}) => {
        const response = await api.post('/logout', {user, pass})
        return response.data
    }

})