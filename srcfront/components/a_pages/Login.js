import { useContext, useEffect, useState } from 'react';
import React from 'react';
import { InputText, InputPass, Button } from '../d_inputs/Input';
import './Login.css'
import logo2 from '../../img/wall1.png'
import { AuthContext } from '../e_contexts/Auth/AuthProvider';
import {Link}from 'react-router-dom'

function Login() {

    const auth = useContext(AuthContext)
    const [login, setLogin] = useState({ usuario: '', senha: '' })
    function handleChange(e) {
        setLogin({ ...login, [e.target.name]: e.target.value })
    }

    const logar = async () => {
        if (login.usuario && login.senha) {
            const isLogged = await auth.signin(login.usuario, login.senha)
            if (isLogged) {

                console.log(auth)
            } else {
                alert('Erro de acesso!' + isLogged)
            }
        }

    }

    //<img src={logo2} className="logo2" alt="Logo"/>
    return (
        <div className='wall'>
          

            <div className='loginForm'>
                <InputText
                    flex='column'
                    width='10em'
                    title='Usuário'
                    name="usuario"
                    value={login.usuario || ''}
                    handleOnChange={handleChange}
                />
                <InputPass
                    flex='column'
                    width='10em'
                    title='Senha'
                    name="senha"
                    value={login.senha || ''}
                    handleOnChange={handleChange}
                />
                <Link to="/">
                    <Button
                        color='#213e6d'
                        value="Login"
                        click={() => logar()}

                    />
                </Link>
                

            </div>

        </div>
    )

}
export default Login