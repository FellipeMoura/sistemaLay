import { useState } from 'react'
import { useApi } from '../../hooks/useApi'
import { RequireAuth } from './RequireAuth'
import { createContext } from 'react'


export  const AuthContext = createContext() 

export const AuthProvider = ({children}) => {
 const [userlog,setUserlog] =useState({})

 const api = useApi()  

    const signin = async (user,pass) => {
        const data = await api.signin(user,pass)
        if(data){
            setUserlog(data)
           return true           
        }else{

            console.log(`Usuário ou senha incorreto(s)!`+data)
        }
    }

    const signout = async() => {
        await api.logout()
        setUserlog('')
    }

    

    return(
        <AuthContext.Provider value={{userlog, signin, signout}}>
           {RequireAuth({children})}
        </AuthContext.Provider>
    )
}