import React, { useState, useEffect } from 'react';
import { Button, InputMasks, InputDate, InputText } from '../d_inputs/Input'
import "./ResumoForm.css"
import { MdOutlineDelete } from 'react-icons/md'

function ResumoForm({ idrecord, iduser }) {

    useEffect(() => {
        fetch(`http://localhost:3333/api/summarys/${iduser}`, {
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
        resumo: ''
    })
    const [search, setSearch] = useState('');
    const [userFilter, setUserFilter] = useState([])



    function createSummary(cadastro) {

        fetch(`http://localhost:3333/api/summary`, {
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



            fetch(`http://localhost:3333/api/delete2/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-type': 'application/json',
                },
            })
                .then((resp) => resp.json()).then((data) => {
                    //console.log(data);
                    window.location.replace(`/prontuario/${iduser}/${idrecord}/2`)

                    //redirect
                })
                .catch(err => console.log(err))
        }
    }

    function handleOnSubmit(event) {
        event.preventDefault();
        setSearch(event.target.value);
        const results = project.filter(user => (user.name.toLowerCase().indexOf(search)) !== -1);
        setUserFilter(results);
    }

    function handleChange(e) {
        setProject({ ...project, [e.target.name]: e.target.value })



    }

    return (
        <div className="resumoPanel">

            <div className="rePanel">

                <div className='rrHeader'>
                <label className='inline'>     <InputDate
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
                        color='#447461'
                        value='Registrar'
                        click={() => createSummary(project)}
                    /></label>
                </div>

                <div className="rBody">
                    <div>
                        <label>Queixa:</label>     <br />
                        <textarea
                            name="queixa"
                            id="queixa"
                            value={project.queixa || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Resumo de sessão:</label><br />

                        <textarea
                            className='resumos'
                            name="resumo"
                            id="resumo"
                            value={project.resumo || ''}
                            onChange={handleChange}
                        />
                    </div>
                    
                </div>

            </div>

            <div className="lePanel">
                {sessions.map(session => {
                    let data
                    if (session.data) { data = session.data.substr(0, 10).split('-').reverse().join('/'); }

                    return (
                        <div className='session'>
                            <div className='sHeader'>
                                <label>Data: <label className="value"> {data}</label></label>
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