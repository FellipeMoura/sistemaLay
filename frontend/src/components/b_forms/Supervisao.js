import React, { useState, useEffect } from 'react';
import { Button, TextArea, InputDate, InputText } from '../d_inputs/Input'
import "./Resumo.css"
import FormSessions from '../c_layouts/FormSessions';
import InfoCard from '../c_layouts/SupervisaoCard';


function SupervisaoForm({ idrecord, iduser }) {

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND}/supervisao/${iduser}`, {
            method: "GET",
            heders: {
                'Content-type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((resp2) => {

                setSessions(resp2)
              //  console.log(resp2)
            })
            .catch(err => console.log(err))
    }, [iduser])

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
        conceito: '',
        supervisao: '',
        sessao: 0
    })



    function createSummary(cadastro) {

        fetch(`${process.env.REACT_APP_BACKEND}/supervisao`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(cadastro),
        })
            .then((resp) => resp.json()).then((data) => {

                window.location.replace(`/prontuario/${iduser}/${idrecord}/6`)
                //redirect
            })
            .catch(err => console.log(err))
    }

    function editSession(id, cadastro) {
        let project = cadastro
        if(cadastro.data){ project.data =cadastro.data.substr(0, 10)}   
        console.log(project)
        fetch(`${process.env.REACT_APP_BACKEND}/update6/${id}`,{
            method: "PUT",
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify(project),
        })
          .then((resp) => resp.json()).then((data) => {
            //console.log(data);
              window.alert("Cadastrado alterado!")
             window.location.replace(`/prontuario/${iduser}/${idrecord}/6`)
            // history.push(`/prontuario/${id}/${idrecord}/1`)
            //redirect
          })
          .catch(err => console.log(err))
        }

    function deleteSession(id) {

        var resp = window.confirm("Confirma a exclusão deste registro?");
        if (resp) {



            fetch(`${process.env.REACT_APP_BACKEND}/delete6/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-type': 'application/json',
                },
            })
                .then((resp) => resp.json()).then((data) => {
                    //console.log(data);
                    window.location.replace(`/prontuario/${iduser}/${idrecord}/6`)

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
                height='50vh'
                name='supervisao'
                value={project.supervisao || ''}
                handleOnChange={handleChange}
                title='Supervisão'
            />
        </div>


    )

    return (
        <div className="evoPanel">

            <FormSessions
                header={header}
                body={body}
            />

        
              {sessions.length > 0 &&  <InfoCard
                sessions={sessions}
                edit={editSession}
                    del={deleteSession}
                />}


        

        </div>
    );
}

export default SupervisaoForm