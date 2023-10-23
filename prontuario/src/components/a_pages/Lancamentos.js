import React, { useEffect, useState } from 'react';
import './Record.css';
import { useParams } from 'react-router';

import logo from '../../img/logop.png'
import { Link } from 'react-router-dom';
import { TiArrowBackOutline } from 'react-icons/ti'
import { HomeButton, LogoutButton } from '../d_inputs/LogoutButton';
import SupervisaoForm from '../b_forms/Supervisao';
import Controls from '../b_forms/Controls';
import './Lancamentos.css'
import Clients from '../b_forms/Clients';

function Record() {
    const { page } = useParams()
    const { iduser } = useParams()
    const { idrecord } = useParams()
    const [project, setProject] = useState({})
    //console.log(param)
    //console.log(id);


    useEffect(() => {

        fetch(`${process.env.REACT_APP_BACKEND}/record/${idrecord}`, {
            method: "GET",
            heders: {
                'Content-type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((resp2) => {
                //console.log(resp2.result)

                setProject(resp2.result)
            })
            .catch(err => console.log(err))



    }, [idrecord])



    //console.log(project)
    function thisPage() {
        switch (page) {
            case '0': return (['on', 'off', 'off', 'off', 'off', 'off'])
            case '1': return (['off', 'on', 'off', 'off', 'off', 'off'])
            case '2': return (['off', 'off', 'on', 'off', 'off', 'off'])
            case '3': return (['off', 'off', 'off', 'on', 'off', 'off'])
            case '5': return (['off', 'off', 'off', 'off', 'on', 'off'])
            case '5': return (['off', 'off', 'off', 'off', 'on', 'off'])
            case '6': return (['off', 'off', 'off', 'off', 'off', 'on'])
            default: return (['off', 'off', 'on', 'off', 'off'])
        }
    }

    const [active, setActive] = useState(thisPage)
    function change(button) {
        if (button === 0) {
            setActive(['on', 'off', 'off', 'off', 'off', 'off'])
            setStep(button)
        } else if (button === 1) {
            setActive(['off', 'on', 'off', 'off', 'off', 'off'])
            setStep(button)
        } else if (button === 2) {
            setActive(['off', 'off', 'on', 'off', 'off', 'off'])
            setStep(button)
        } else if (button === 4) {
            setActive(['off', 'off', 'off', 'on', 'off', 'off'])
            setStep(button)
        } else if (button === 5) {
            setActive(['off', 'off', 'off', 'off', 'on', 'off'])
            setStep(button)
        } else if (button === 6) {
            setActive(['off', 'off', 'off', 'off', 'off', 'on'])
            setStep(button)
        }
    }



    const [step, setStep] = useState(page)

    const steps = [
        <Clients />,
        <Controls />,
        

    ]

    /*function getAge(dateString) {
        const today = new Date();
        const birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        return age;
    }*/

    return (
        <div className="painel">

            <div className="topContainer">

                <div className="header">
                    <Link to="https://www.instagram.com/layaraoliveira.psi/" target="_blank"><img src={logo} className="logo" alt="Logo" /></Link>
                    <label> Controle Geral </label>
                    <button onClick={() => window.location.replace('/home')}><TiArrowBackOutline /></button>
                </div>
                <div>

                    <div className='logoutDiv'>

                        <HomeButton />

                        <LogoutButton />
                    </div>

                    <div className="nav">
                        <div className={`${active[0]}`} onClick={() => change(0)}>Clientes</div>
                        <div className={`${active[1]}`} onClick={() => change(1)}>Lançamentos</div>

                    </div>

                </div>

            </div>

            <div className="sessionContainer">

                {steps[step]}

            </div>
        </div>
    )

}

export default Record;