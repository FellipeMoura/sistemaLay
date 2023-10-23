import React, { useState } from 'react';
import { MdOutlineDelete } from 'react-icons/md'
import { AiOutlineEdit } from 'react-icons/ai'
import FormSessions from './FormSessions';
import { Button, InputDate, InputText, TextArea } from '../d_inputs/Input'

function InfoCard({ sessions, del, edit }) {
    const [sessionC, setSessionC] = useState(sessions[0] || { conceito: 'erro' })

    console.log(sessions[0])
    function Card({ session }) {
        const [project, setProject] = useState(session)

        let data
        if (session.data) { data = session.data.substr(0, 10) }
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

                <label>Supervisão: <label className="value"> {session.supervisao}</label></label>
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
                    height='30vh'
                    name='supervisao'
                    value={project.supervisao || ''}
                    handleOnChange={handleChange}
                    title='Supervisao'
                />
            </div>


        )


        const forms = [Label,
            <FormSessions
                header={header}
                body={body}
            />
        ]
        return (
            <div>
                {forms[edita]}
            </div>

        )
    }

    const [editaC, setEditaC] = useState(0)
    function handleC(e) {
        setSessionC({ ...sessionC, [e.target.name]: e.target.value })
    }

    const inputC = (
        <div>
            <TextArea
                height='30vh'
                name='conceito'
                value={sessionC ? sessionC.conceito : '' || ''}
                handleOnChange={handleC}
                title='Conceitualização'
            />
            <Button
                color='#213e6d'
                value='Editar'
                click={() => edit(sessionC.id, sessionC)}
            />

        </div>
    )

    const conceito = [
        <div className='session'>
            <div className='inline'>
                <label>Conceitualização: <label className='value'>{sessionC.conceito}</label></label>
                <button
                    type='button'
                    className='buttonCo'
                    onClick={() => setEditaC(1)}

                ><AiOutlineEdit /></button>
            </div>
        </div>,
        inputC
    ]


    return (

        <div className="sessoes">

            {sessions[0] && conceito[editaC]}

            {sessions.map(session => {

                return (
                    sessions.indexOf(session) > 0 &&
                    <Card
                        session={session}
                    />
                )
            })}


        </div>
    )
}

export default InfoCard;