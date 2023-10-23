import { useState, useContext } from 'react';
import React from 'react';
import { InputText, InputPass, Button } from '../d_inputs/Input';
import './Login.css'
import { Context } from '../e_contexts/AuthContext';
import logo2 from '../../img/wall2.png'

function Login() {
    const [login, setLogin] = useState({ usuario: '', senha: '' })

    const { handleLogin } = useContext(Context)
    //console.log('Login'+verif)


    async function handleChange(e) {
        setLogin({ ...login, [e.target.name]: e.target.value })


    }

    function logar() {


        if (login.usuario === process.env.REACT_APP_USER &&
            login.senha === process.env.REACT_APP_PASS) {
            handleLogin(0)
        } else if (login.usuario === 'maestro' &&
            login.senha === process.env.REACT_APP_PASS2) {
            handleLogin(1)
        } else {
            window.alert('Login incorreto')
        }
    }
    //
    return (
        <div className='wall' >
            
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
                <Button
                    color='#213e6d'
                    value='Login'
                    click={() => logar()}

                />

            </div>

        </div>
    )

}
export default Login