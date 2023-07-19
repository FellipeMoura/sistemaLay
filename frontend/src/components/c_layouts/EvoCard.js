import React, { useState } from 'react';
import { MdOutlineDelete } from 'react-icons/md'
import { AiOutlineEdit } from 'react-icons/ai'
import FormSessions from './FormSessions';
import {Button, InputMasks, InputDate, InputText, TextArea} from '../d_inputs/Input'

function InfoCard({ sessions, del, edit }) {


    function Card({ session }) {
        const [project, setProject] = useState(session)
        let data
        if (session.data) { data = session.data.substr(0, 10)}
        project.data = data

        const [edita, setEdita] = useState(0)
        
        function handleChange(e) {
            setProject({...project, [e.target.name]: e.target.value })
            
    
        
        }
        const Label =(
            <div className='session' key={session.id}>
            <div className='sHeader'>
                <label>Sessão: <label className="value"> {session.session}</label></label>
                <label>Data: <label className="value"> {data}</label></label>
                <label>Horario: <label className="value"> {session.hora}</label></label>
                <div>
                    <button
                        type='button'
                        id={session.id}
                        onClick={() => setEdita(1)}

                    >
                        <AiOutlineEdit />
                    </button>
                    <button
                        type='button'
                        id={session.id}
                        onClick={() => del(session.id)}

                    >
                        <MdOutlineDelete />
                    </button>
                </div>
            </div>
            <label>Demanda trabalhada: <label className="value"> {session.demanda}</label></label>
            <label>Evolução do caso: <label className="value"> {session.evolucao}</label></label>
            <label>Procedimentos adotados: <label className="value"> {session.proc}</label></label>
        </div>
        )

        const header =(   
            <div>
                <InputDate
                    flex="column"
                    title="Data"
                    name="data"
                    value={project.data || ''}
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
                    name='project'
                    handleOnChange={handleChange}
                />
                <Button
                    color= '#213e6d'
                    value='Editar'
                    click={() => edit(session.id, project)}
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

        const forms = [Label, <FormSessions
            header={header}
            body={body}
        />]
        return(
            <div>
               {forms[edita]}
            </div>
            
        )
    }

    console.log(sessions)
    return (

        <div className="sessoes">
            {sessions.map(session => {
                
                return (
                    <Card
                        session={session}
                    />
                )
            })}


        </div>
    )
}

export default InfoCard;