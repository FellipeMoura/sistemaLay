import React, { useState, useEffect } from 'react';
import {Button, InputMasks, InputDate, InputText, TextArea} from '../d_inputs/Input'
import "./Evo.css"

import FormSessions from '../c_layouts/FormSessions';
import InfoCard from '../c_layouts/EvoCard';

 
function Evo({idrecord, iduser}) {
    var data = new Date();
    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth() + 1).padStart(2, '0');
    var ano = data.getFullYear();
    var dataAtual = ano + '-' + mes + '-' + dia;
    //console.log(dataAtual);
    const [sessions, setSessions] = useState([])
    const [project, setProject] = useState({
        data: dataAtual,
        hora: '',
        idrecord: idrecord,
        session: ''                                   
            })

    useEffect(() => {           
        fetch(`${process.env.REACT_APP_BACKEND}/sessions/${idrecord}`,{
        method: "GET",
        heders:{
            'Content-type': 'application/json',
        },
        })
        .then((resp) =>resp.json())
        .then((resp2) => {
            setSessions(resp2)
        })             
        .catch(err => console.log(err))
    }, [idrecord, project])
   
   
    
    

function createSession(cadastro) {
      
    fetch(`https://backend.protuarioreact.com.br/api/session`,{
        method: "POST",
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(cadastro),
    })
      .then((resp) => resp.json()).then((data) => {
        
        window.location.replace(`/prontuario/${iduser}/${idrecord}/2`)            
        //redirect
      })
      .catch(err => console.log(err))
    }

    function editSession(id, cadastro) {
        let project = cadastro
        if(cadastro.data){ project.data =cadastro.data.substr(0, 10)}   
        console.log(project)
        fetch(`${process.env.REACT_APP_BACKEND}/update4/${id}`,{
            method: "PUT",
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify(project),
        })
          .then((resp) => resp.json()).then((data) => {
            //console.log(data);
              window.alert("Cadastrado alterado!")
             window.location.replace(`/prontuario/${iduser}/${idrecord}/2`)
            // history.push(`/prontuario/${id}/${idrecord}/1`)
            //redirect
          })
          .catch(err => console.log(err))
        }


    function deleteSession(id) {

        var resp= window.confirm("Confirma a exclusão deste registro?");
        if(resp){
        
   
      
        fetch(`${process.env.REACT_APP_BACKEND}/delete2/${id}`,{method: "DELETE", headers: {'Content-type': 'application/json',},})
          .then((resp) => resp.json()).then((data) => {
            //console.log(data);
            window.location.replace(`/prontuario/${iduser}/${idrecord}/2`) 
            
            //redirect
          })
          .catch(err => console.log(err))
        }
    }
    
    function handleChange(e) {
        setProject({...project, [e.target.name]: e.target.value })
        

    
    }
    //console.log(project.session)
    const header =(   
                <div>
                    <InputDate
                        flex="column"
                        title="Data"
                        name="data"
                        value={project.data || dataAtual}
                        handleOnChange={handleChange}
                    />
                    <InputMasks
                        flex="column"
                        mask='0'
                        title="Horário"
                        name="hora"
                        value={project.hora || ''}
                        handleOnChange={handleChange}                           
                    />
                    <InputText
                        width='2.5em'
                        title="Sessão"
                        flex="column"
                        value={project.session || ''}
                        name='session'
                        handleOnChange={handleChange}
                    />
                    <Button
                        color= '#447461'
                        value='Registrar'
                        click={() => createSession(project)}
                    />
                </div>

    )

    const body = (
        <div>
                    <TextArea
                        height='20vh'
                        name='demanda'
                        value={project.demanda || ''}
                        handleOnChange={handleChange}
                        title="Demanda trabalhada"
                    />
                    <TextArea
                        name='evolucao'
                        value={project.evolucao || ''}
                        handleOnChange={handleChange}
                        title="Evolução do caso"
                    />
                    <TextArea
                        placeholder='Escuta clínica'
                        name='proc'
                        value={project.proc || ''}
                        handleOnChange={handleChange}
                        title="Procedimentos adotados"
                    />
                </div>


    )

    return (
        <div className ="evoPanel">

            <FormSessions
                header={header}
                body={body}
            />


            <InfoCard
                sessions={sessions}
                del={deleteSession}
                edit={editSession}
            />

        </div>
    );
}
 
export default Evo;