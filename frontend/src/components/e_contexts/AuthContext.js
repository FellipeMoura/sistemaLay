import { createContext, useState } from "react";
import { api } from "../hooks/useApi";
import history from "./history";

const Context = createContext();

function AuthProvider({ children }) {
    const [verif, setVerif] =useState(false)
    const login = {user:'layaradb', pass: 'Perl1551@@@'}
    async function handleLogin(){
        const { data: {token} } = await api.post(`verif`)
        
        localStorage.setItem('token', JSON.stringify)
        
        api.defaults.headers.Authorization = `Bearer ${token}`;
        
        setVerif(true)
        
        history.push('/')
    
        
        

    }





    return(
        <Context.Provider value ={{verif, handleLogin}}>
            {children}
        </Context.Provider>
    )
}

export { Context, AuthProvider}