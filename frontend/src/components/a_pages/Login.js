import { useEffect, useState, useContext } from 'react';
import React from 'react';
import { InputText, InputPass, Button } from '../d_inputs/Input';
import './Login.css'
import logo2 from '../../img/wall1.png'
import { Context } from '../e_contexts/AuthContext';

function Login(){
    const [login, setLogin] = useState({usuario:'',senha:''})
    const [isLogin, setIsLogin] = useState(1)

    const {verif, handleLogin} = useContext(Context)
    //console.log('Login'+verif)
    

   async function handleChange(e) {
        setLogin({...login, [e.target.name]: e.target.value })
        
    
    }

    function logar(){

        
       if( login.usuario == process.env.REACT_APP_USER &&
            login.senha == process.env.REACT_APP_PASS){
                setIsLogin(0)
        }else{
            window.alert('Login incorreto')
        }
    }
//<img src={logo2} className="logo2" alt="Logo"/>
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
                    click={() => handleLogin()}

        /> 
            </div>

        </div>
    )

}
export default Login