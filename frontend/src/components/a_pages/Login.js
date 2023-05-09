import { useEffect, useState } from 'react';
import React from 'react';
import { InputText, InputPass, Button } from '../d_inputs/Input';
import './Login.css'

function Login({login,setLogin,setIsLogin}){

    function handleChange(e) {
        setLogin({...login, [e.target.name]: e.target.value })
        
        console.log(`${process.env.REACT_APP_USER}`)
    
    }

    function logar(){

        
       if( login.usuario == process.env.REACT_APP_USER &&
            login.senha == process.env.REACT_APP_PASS){
                setIsLogin(0)
        }else{
            window.alert('Login incorreto')
        }
    }

    return(
        <div className='wall'>
            <div className='loginForm'>
                <InputText
                    flex='column'
                    width='10em'
                    title='Usuário'
                    name="usuario"
                    value={login.usuario|| ''}
                    handleOnChange={handleChange}
                />
                <InputPass
                    flex='column'
                    width='10em'
                    title='Senha'
                    name="senha"
                    value={login.senha|| ''}
                    handleOnChange={handleChange}
                />
                 <Button
                    color= '#213e6d'
                    value='Login'
                    click={() => logar()}

        /> 
            </div>

        </div>
    )

}
export default Login