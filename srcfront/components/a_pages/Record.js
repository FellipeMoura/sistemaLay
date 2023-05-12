import React, { useEffect, useState } from 'react';
import './Record.css';
import { useParams } from 'react-router';
import Geral from '../b_forms/Geral';
import Evo from '../b_forms/Evo';
import Control from '../b_forms/Control';
import RecordForm from '../b_forms/EditGeral'
import EditUser from '../b_forms/EditUser';
import ResumoForm from '../b_forms/SessionForm';
import logo from '../../img/logop.png'
import { Link } from 'react-router-dom';
import {TiArrowBackOutline} from 'react-icons/ti'

 


function Record() {
    const {page} = useParams()
    const {iduser} = useParams()
    const{idrecord} =useParams()
    const [project, setProject] = useState({})
    //console.log(param)
    //console.log(id);
    

    useEffect(() => {
        
        fetch(`${process.env.REACT_APP_BACKEND}record/${idrecord}`,{
        method: "GET",
        heders:{
            'Content-type': 'application/json',
        },
        })
        .then((resp) => resp.json())
        .then((resp2) => {
            console.log(resp2.result)
            resp2.result.inicio = resp2.result.inicio.substr(0, 10).split('-').reverse().join('/')
            setProject(resp2.result)
        })            
        .catch(err => console.log(err))

        
        
    }, [])

  
   
    //console.log(project)
   function thisPage(){
    switch(page){
        case '0': return(['on','off','off','off','off'])
        case '1': return(['off','on','off','off','off'])
        case '2': return(['off','off','on','off','off'])
        case '3': return(['off','off','off','on','off'])
        case '5': return(['off','off','off','off','on'])
        default: return(['off','off','on','off','off'])
    }
   } 

    const [active, setActive] = useState(thisPage)
    function change(button){
        if(button === 0){
            setActive(['on','off','off','off','off'])
            setStep(button)
        }else if(button === 1){
            setActive(['off','on','off','off','off'])
            setStep(button)
        }else if(button === 2){
            setActive(['off','off','on','off','off'])
            setStep(button)
        }else if(button === 4){
            setActive(['off','off','off','on','off'])
            setStep(button)
        }else if(button === 5){
            setActive(['off','off','off','off','on'])
            setStep(button)
        }
    }

    

    const [step, setStep] = useState(page)
    
    const steps = [
        <Geral setStep = {setStep} project={project}/> ,
        <Control iduser={iduser} idrecord={idrecord}/>, 
        <Evo iduser={iduser} idrecord={idrecord}/>, 
        <RecordForm project={project} iduser={iduser} idrecord={idrecord}/>,
        <EditUser id={iduser} idrecord={idrecord}/>,
        <ResumoForm iduser={iduser} idrecord={idrecord}/>
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

    return(
            <div className="painel">

                <div className="topContainer">
                
                    <div className="header">
                        <Link to="https://www.instagram.com/layaraoliveira.psi/" target="_blank"><img src={logo} className="logo" alt="Logo"/></Link>
                        <label> Paciente: {project.name} </label>
                        <button onClick={()=>window.location.replace('/')}><TiArrowBackOutline/></button>
                    </div>

                    <div className="nav">
                        <div className={`${active[3]}`} onClick={()=> change(4)}>Pessoal</div>
                        <div className={`${active[0]}`} onClick={()=> change(0)}>Geral</div>
                        <div className={`${active[1]}`} onClick={()=> change(1)}>Controle</div>
                        <div className={`${active[2]}`} onClick={()=> change(2)}>Evolução</div>
                        <div className={`${active[4]}`} onClick={()=> change(5)}>Resumo</div>
                    </div>

                </div>
              
                <div className="sessionContainer">
                    
                    {steps[step]}
                    
                </div>
            </div>
    )

}
 
export default Record;