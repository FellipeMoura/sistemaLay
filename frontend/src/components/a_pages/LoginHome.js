import React, { useState } from "react";
import Home from "./Home";
import Login from "./Login";

function HomeLogin(){

    const [login, setLogin] = useState({usuario:'',senha:''})
    const [isLogin, setIsLogin] = useState(1)

    const page = [ <Home />, <Login login = {login} setIsLogin= {setIsLogin} setLogin = {setLogin}/>]

    return(
        <div>
        {page[isLogin]}
        </div>
    )
}

export default HomeLogin