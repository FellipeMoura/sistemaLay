import React, { useState, useEffect } from "react";
import { useParams } from 'react-router';
import { InputDate, Button, Select, InputText } from "../d_inputs/Input";
import moment from "moment";
import { createPDF } from "../f_aux/createPDF";
import { GiCheckMark } from 'react-icons/gi'
import './Pdf.css'

import PdfBar from "./PdfBar";

export function NewAten({unidade, user, handleCloseModal}) {
    const [project, setProject] = useState({unidade: unidade})
    const [_p, set_p] = useState([])
    const unidades = [
        {id: null,nome:null},
        {id: 1,nome:'Matriz'},
        {id: null,nome:null},
        {id: 3,nome:'Goiânia Shopping'},
        {id: 4,nome:'Orion'},
        {id: 5,nome:'Campinas'}
    ]
    
    function handleChange(e) {
        setProject({ ...project, [e.target.name]: e.target.value })
        //  console.log(project)
    }
    function loginChange(e) {
        setProject({ ...project, [e.target.name]: _p[e.target.value].id })
          // console.log()
    }
    function unidadeChange(e) {
        setProject({ ...project, [e.target.name]: unidades[e.target.value].id })
          // console.log()
    }

    useEffect(() => {
       // console.log('teste')
        
        fetch(`${process.env.REACT_APP_CALENDAR}/buscar_p`, {
            method: "GET",
            heders: {
                'Content-type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((resp2) => {
                set_p(resp2)
               // console.log(resp2)
            })
            .catch(err => console.log(err))
        
    }, [])

function cadastrar(){
    console.log(project)
    fetch(`${process.env.REACT_APP_CALENDAR}/insertAtend`, {
        method: "POST",
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(project),
    })
        .then((resp) => resp.json()).then((data) => {
          data.error?
            window.alert(`Este nome já está cadastrado com o login "${data.result.login}" na unidade ${data.result.unidade}`)  
          : 
            window.alert(`Cadastrado!`)
            window.location.replace(`/calendar/${unidade}/${user}`)
        })
        .catch(err => console.log(err))
    }

   
    const labelName = (
        <div className='labelName labelN'>
            <p>Cliente: <label >{project.nome_cliente}
                <button
                    type='button'
                    onClick={() => setProject({ ...project, ['id_cliente']: '', ['nome_cliente']: ''})}
                >
                    Limpar
                </button>
            </label></p>
        </div>
    )



    const [currentUnidade, setCurrentUnidade] = useState(0)
    const unit = [
        <p> <label>Unidade {unidades[project.unidade].id+ ' - '+unidades[project.unidade].nome}
        <button
            type='button'
            onClick={() => setCurrentUnidade(1)}
        >
            Alterar
        </button></label></p>
        ,<Select
        text='Unidade'
        name='unidade'
        options={unidades}
        handleOnChange={unidadeChange}
        />]

    return (
        <div className="pdfForm">
          <div className="pdfAtend">
                <div className="cliCard">
                <div >
                    <h2>Ficha Clientes</h2>
                    
                   {project.nome_cliente? 
                   labelName:
                   <div>
                    <InputText
                    name='nome'
                    value={project.nome}
                    title='Nome'
                    handleOnChange={handleChange}
                   />
                   <Select
                   text='Login'
                   name='login'
                   options={_p}
                   handleOnChange={loginChange}
                   />
                   <div className="labelName">
                    {unit[currentUnidade]}
                   </div>
                   </div>
                   



                }
                    </div>
                    <div className="inlineButton">
                        <Button
                            color='#111111'
                            value='Voltar'
                            click={handleCloseModal}
                        />
                  
                        <Button
                            color='#174fb6'
                            click={cadastrar}
                            value='Cadastrar'
                        />
                    </div>
                    </div>
                    </div>
       
        </div>
    )

}