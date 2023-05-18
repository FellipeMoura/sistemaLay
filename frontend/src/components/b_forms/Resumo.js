import React, { useState, useEffect } from 'react';
import { Button, TextArea, InputDate, InputText } from '../d_inputs/Input'
import "./Resumo.css"
import { MdOutlineDelete } from 'react-icons/md'
import FormSessions from '../c_layouts/FormSessions';


function ResumoForm({ idrecord, iduser }) {

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND}summarys/${iduser}`, {
            method: "GET",
            heders: {
                'Content-type': 'application/json',
            },
        })
            .then((resp) => resp.json())
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
        iduser: iduser,
        queixa: '',
        resumo: '',
        sessao: 0
    })
    const [search, setSearch] = useState('');
    //const [userFilter, setUserFilter] = useState([])



    function createSummary(cadastro) {

        fetch(`${process.env.REACT_APP_BACKEND}summary`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(cadastro),
        })
            .then((resp) => resp.json()).then((data) => {

                window.location.replace(`/prontuario/${iduser}/${idrecord}/5`)
                //redirect
            })
            .catch(err => console.log(err))
    }

    function deleteSession(id) {

        var resp = window.confirm("Confirma a exclusão deste registro?");
        if (resp) {



            fetch(`${process.env.REACT_APP_BACKEND}delete4/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-type': 'application/json',
                },
            })
                .then((resp) => resp.json()).then((data) => {
                    //console.log(data);
                    window.location.replace(`/prontuario/${iduser}/${idrecord}/5`)

                    //redirect
                })
                .catch(err => console.log(err))
        }
    }

    function handleChange(e) {
        setProject({ ...project, [e.target.name]: e.target.value })



    }

    const header = (
        <div>
            <InputDate
                flex='column'
                title="Data"
                name="data"
                value={project.data || dataAtual}
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
                color='#447461'
                value='Registrar'
                click={() => createSummary(project)}
            />

        </div>

    )

    const body = (
        <div>
            <TextArea
                height='30vh'
                name='queixa'
                value={project.queixa || ''}
                handleOnChange={handleChange}
                title='Queixa'
            />
            <TextArea
                height='20vh'
                name='resumo'
                value={project.resumo || ''}
                handleOnChange={handleChange}
                title='Resumo de sessão'
            />
        </div>


    )

    return (
        <div className="evoPanel">

            <FormSessions
                header={header}
                body={body}
            />

            <div className="sessoes">
                {sessions.map(session => {
                    let data
                    if (session.data) { data = session.data.substr(0, 10).split('-').reverse().join('/'); }

                    return (
                        <div className='session'>
                            <div className='sHeader'>
                                <label>Data: <label className="value"> {data}</label></label>
                                <label>Sessão: <label className="value"> {session.sessao}</label></label>
                                <button
                                    type='button'
                                    id={session.id}
                                    onClick={(e) => deleteSession(session.id)}

                                >
                                    <MdOutlineDelete />
                                </button>
                            </div>
                            <label>Queixa: <label className="value"> {session.queixa}</label></label>
                            <label>Resumo: <label className="value"> {session.resumo}</label></label>
                        </div>
                    )
                })}


            </div>

        </div>
    );
}

export default ResumoForm