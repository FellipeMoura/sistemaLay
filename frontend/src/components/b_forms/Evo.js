import React, { useState, useEffect } from 'react';
import {Button, InputMasks, InputDate} from '../d_inputs/Input'
import "./Evo.css"
import {MdOutlineDelete} from 'react-icons/md'

 
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
            //console.log(resp2)
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

    project.session = sessions.length+1
    //console.log(project.session)

    return (
        <div className ="evoPanel">

            <div className="revoPanel">

            <label className='inline'> 

                <div className= 'rHeader'>
                 <InputDate
                    title="Data"
                    name="data"
                    value={project.data || dataAtual}

                    handleOnChange={handleChange}
                />
                 <InputMasks
                 mask='0'
                 title="Horário"
                 name="hora"
                 value={project.hora || ''}

                 handleOnChange={handleChange}
                    
                />
                <Button
                    color= '#447461'
                    value='Registrar'
                    click={() => createSession(project)}
                />
                </div>

                </label>

                <div className= "rBody">                 
                     <div>   
                        <label>Demanda trabalhada:</label>     <br/>           
                        <textarea
                        name="demanda" 
                        id="demanda" 
                        value={project.demanda || ''}   
                        onChange={handleChange}                     
                        />
                    </div>
                    <div>
                        <label>Evolução do caso:</label><br/>
                       
                        <textarea
                        name="evolucao" 
                        id="evolucao"  
                        value={project.evolucao || ''}
                        onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Procedimentos adotados:</label>  <br/>                    
                        <textarea
                        name="proc" 
                        id="proc"  
                        value={project.proc || ''}
                        onChange={handleChange}
                        />
                    </div>

                   

                </div>

            </div>

            <div className="levoPanel">
            {sessions.map(session => {
                let data
                if(session.data){ data = session.data.substr(0, 10).split('-').reverse().join('/');}
                    
                    return (
                        <div className='session'>
                        <div className='sHeader'>
                            <div className='inline'> 
                                <label>Sessão: <label className="value"> {session.session}</label></label>
                                <label>Data: <label className="value"> {data}</label></label>
                                <label>Horario: <label className="value"> {session.hora}</label></label>
                                
                            </div>
                        
                           
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