import React, { useState } from 'react';
import { MdOutlineDelete } from 'react-icons/md'
import { AiOutlineEdit } from 'react-icons/ai'
import FormSessions from './FormSessions';
import { Button, InputDate, InputText, TextArea } from '../d_inputs/Input'

function InfoCard({ sessions, del, edit }) {


    function Card({ session }) {
        const [project, setProject] = useState(session)
        
        let data
        if (session.data) { data = session.data.substr(0, 10)}
        project.data = data

        const [edita, setEdita] = useState(0)

        function handleChange(e) {
            setProject({ ...project, [e.target.name]: e.target.value })



        }
        const Label = (
          
                        <div className='session' key={session.id}>
                            <div className='sHeader'>
                                <label>Data: <label className="value"> {session.data.split('-').reverse().join('/')}</label></label>
                                <label>Sessão: <label className="value"> {session.sessao}</label></label>
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
                            
                            <label>Resumo: <label className="value"> {session.resumo}</label></label>
                        </div>
                    )


        const header = (
            <div>
                <InputDate
                    flex='column'
                    title="Data"
                    name="data"
                    value={project.data || ''}
                    handleOnChange={handleChange}
                />

                <InputText
                    flex='column'
                    width='2.5em'
                    title="Sessão"
                    value={project.sessao || ''}
                    name='sessao'
                    handleOnChange={handleChange}
                />

                <Button
                    color='#213e6d'
                    value='Editar'
                    click={() => edit(session.id, project)}
                />
               

            </div>

        )

        const body = (
            <div>
          
                <TextArea
                    height='50vh'
                    name='resumo'
                    value={project.resumo || ''}
                    handleOnChange={handleChange}
                    title='Resumo'
                />
            </div>


        )
      
        const forms = [Label, <FormSessions
            header={header}
            body={body}
        />]
        return (
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