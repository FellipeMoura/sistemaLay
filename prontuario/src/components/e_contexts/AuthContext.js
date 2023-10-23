import { createContext, useState, useEffect } from "react";
import { api } from "../hooks/useApi";
import history from "./history";
import Login from "../a_pages/Login";

const Context = createContext();

function AuthProvider({ children }) {
    const [verif, setVerif] =useState(false)
    const [loading, setLoading] = useState(true)
   
    useEffect(()=>{
        const token = localStorage.getItem('token')

        if(token){
            api.defaults.headers.Authorization = `Bearer ${(token)}`
         //   console.log((token))
            setVerif(token)
        }

        setLoading(false)

    }, [])

    async function handleLogin(x){

        
        const { data: {token} } = await api.post(`verif`)
        api.defaults.headers.Authorization = `Bearer ${token}`;
        localStorage.setItem('token', JSON.stringify(token))        
        setVerif(true)
        //history.push('/')
        x==0?window.location.replace('/home') : window.location.replace('/s')     
        

    }

    function handleLogout(){
        api.defaults.headers.Authorization = undefined;
        localStorage.removeItem('token')
        
        setVerif(false)

        history.push('/login')
        window.location.replace('/login')       
        

    }

    if (loading){
        return <h1>Loading...</h1>
    }



    return(
        <Context.Provider value ={{verif, handleLogin, handleLogout}}>
            {verif ? children :
            <Login/>}
        </Context.Provider>
    )
}

export { Context, AuthProvider}