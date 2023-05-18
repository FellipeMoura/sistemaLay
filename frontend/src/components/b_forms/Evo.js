import React, { useState, useEffect } from 'react';
import {Button, InputMasks, InputDate, InputText, TextArea} from '../d_inputs/Input'
import "./Evo.css"
import {MdOutlineDelete} from 'react-icons/md'
import FormSessions from '../c_layouts/FormSessions';

 
function Evo({idrecord, iduser}) {

    useEffect(() => {           
        fetch(`${process.env.REACT_APP_BACKEND}sessions/${idrecord}`,{
        method: "GET",
        heders:{
            'Content-type': 'application/json',
        },
        })
        .then((resp) =>resp.json())
        .then((resp2) => {
            setSessions(resp2)
        }).then(() => {
            project.session = sessions.length+1
        })             
        .catch(err => console.log(err))
    }, [])
   
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
        session: 0                                   
            })
    
    

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

    function deleteSession(id) {

        var resp= window.confirm("Confirma a exclusão deste registro?");
        if(resp){
        
   
      
        fetch(`${process.env.REACT_APP_BACKEND}delete2/${id}`,{method: "DELETE", headers: {'Content-type': 'application/json',},})
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


            <div className="sessoes">
            {sessions.map(session => {
                let data
                if(session.data){ data = session.data.substr(0, 10).split('-').reverse().join('/');}
                    
                    return (
                        <div className='session'>
                        <div className='sHeader'>
                                <label>Sessão: <label className="value"> {session.session}</label></label>
                                <label>Data: <label className="value"> {data}</label></label>
                                <label>Horario: <label className="value"> {session.hora}</label></label>                        
                           
                            <button
                                type='button'
                                id={session.id}
                                onClick={(e) => deleteSession(session.id)}

                            >
                                <MdOutlineDelete/>
                            </button>
                        </div>
                        <label>Demanda trabalhada: <label className="value"> {session.demanda}</label></label>
                        <label>Evolução do caso: <label className="value"> {session.evolucao}</label></label>
                        <label>Procedimentos adotados: <label className="value"> {session.proc}</label></label>
                        </div>
                    )
                })}
            
            
            </div>

        </div>
    );
}
 
export default Evo;