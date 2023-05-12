import { useContext } from "react"
import { AuthContext } from "./AuthProvider"
import Login from "../../a_pages/Login"

export const RequireAuth = ({children}) =>{
    const auth = useContext(AuthContext)
    console.log(auth)
    if(!(auth)){
        return <Login/>
    }
    return children
}