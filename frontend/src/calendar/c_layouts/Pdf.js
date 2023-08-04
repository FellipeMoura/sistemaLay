import React, { useState, useEffect } from "react";
import { useParams } from 'react-router';
import { InputDate, Button } from "../d_inputs/Input";
import moment from "moment";
import { createPDF } from "../f_aux/createPDF";
import { GiCheckMark } from 'react-icons/gi'
import './Pdf.css'

import PdfBar from "../c_layouts/PdfBar";

export function Pdf({atendentes, handleCloseModal}) {

   // const { unidade } = useParams()
    const { user } = useParams()
    const [list, setList] = useState([])
    const [project, setProject] = useState({
        data: moment().add(1, 'day').format('YYYY-MM-DD'),
        inicio: moment('2023 07 15').format('YYYY-MM-DD'),
        fim: moment().add(1, 'year').format('YYYY-MM-DD')
    })
    const [tudo, setTudo] = useState(false)
    const [clientes, setClientes] = useState([])
    
    function handleChange(e) {
        setProject({ ...project, [e.target.name]: e.target.value })
        //   console.log(project.hora_fim)
    }
    function setName(e) {

        setProject({ ...project, ['id_cliente']: e.id_cliente, ['nome_cliente']: e.nome_cliente})
      
    }
    useEffect(() => {

        fetch(`${process.env.REACT_APP_CALENDAR}/buscarClientes`, {
            method: "GET",
            heders: {
                'Content-type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((resp2) => {
                setClientes(resp2)
                //console.log(resp2)
            })
            .catch(err => console.log(err))


       
            atendentes.map((atendente) =>

            atendentes.indexOf(atendente) > 0 ? setList((list) => [...list, { nome: atendente.nome, status: false }]) : setList([{ nome: atendente.nome, status: false }])
        )
        
        /*   fetch(`${process.env.REACT_APP_CALENDAR}/atendentes/${unidade}`,{
           method: "GET",
           heders:{
               'Content-type': 'application/json',
           },
           })
           .then((resp) => resp.json())
           .then((resp2) => console.log(resp2))
               //if (atendentes.length > list.length){ 
                 //  resp2.map((atendente) =>
                      
                    //  setList(list => [...list, {nome: atendente.nome, status: true}])
                       
                //   )
              // }else{
             /    // console.log(atendentes.length +'-'+ list.length)
              // }
              // setAtendentes(resp2)
                
             
           .catch(err => console.log(err))*/

        //setAtendentes(old => [...old, 'teste'] ) 
        
    }, [])

     console.log(list)

    /*const handleSecondFriend = () => {
    setFriends(
        friends.map((friend) =>
            // Here you accept a id argument to the function and replace it with hard coded 🤪 2, to make it dynamic.
            friend.id === 2
                ? { ...friend, name: "Changed Name" }
                : { ...friend }
        )
    );
};*/
    function checkStatus(nome) {
        if (nome) {
            setList(
                list.map(item =>
                    item.nome === nome ? { ...item, status: item.status ? false : true } : { ...item }
                )
            )
        } else {
            const value = tudo ? false : true
            setTudo(tudo ? false : true)
            setList(
                list.map(item =>
                    item.nome === nome ? { ...item, status: value } : { ...item, status: value }

                )
            )
        }
    }
    function gerarPdf(download) {
        list.map((atendente) => {
            if (atendente.status) {

                fetch(`${process.env.REACT_APP_CALENDAR}/buscarPDF/${project.data}/${atendente.nome}/${atendentes[0].unidade}`, {
                    method: "GET",
                    heders: {
                        'Content-type': 'application/json',
                    },
                })
                    .then((resp) => resp.json())
                    .then((resp2) => {
                        // setCard(resp2)
                        createPDF(resp2, true, download)

                    })
                    .catch(err => console.log(err))
            }
        })

    }

    function gerarPdf2(download) {
        console.log(`${process.env.REACT_APP_CALENDAR}/buscarPDFcli/${project.id_cliente}/${project.inicio}/${project.fim}`)
                fetch(`${process.env.REACT_APP_CALENDAR}/buscarPDFcli/${project.id_cliente}/${project.inicio}/${project.fim}`, {
                    method: "GET",
                    heders: {
                        'Content-type': 'application/json',
                    },
                })
                    .then((resp) => resp.json())
                    .then((resp2) => {
                        // setCard(resp2)
                        createPDF(resp2, false, download)

                    })
                    .catch(err => console.log(err))
    

    }

    function FichaAtend() {
        return (
            <div className="pdfAtend">
                <div className="atendCard">
                    <h2>Ficha Atendentes</h2>


                    <InputDate
                        name='data'
                        value={project.data}
                        handleOnChange={handleChange}
                    />


                    <div className="pdfOpt" >
                        <button
                            onClick={() => checkStatus(false)}
                        >
                            {tudo && <GiCheckMark />}

                        </button>
                        {tudo ? 'Desmarcar tudo' : 'Marcar tudo'}
                    </div>
                    {
                        list.map((atendente) => (

                            //console.log(hora.hora+props.day.format('L')+props.atendente.nome),
                            <div
                                className="pdfOpt"

                                key={list.indexOf(atendente)}

                            >
                                <button
                                    onClick={() => checkStatus(atendente.nome)}
                                >
                                    {atendente.status && <GiCheckMark />}
                                </button>
                                {atendente.nome}




                            </div>
                        ))
                    }
                    <div className="inlineButton">
                        <Button
                            color='#111111'
                            value='Voltar'
                            click={handleCloseModal}
                        />
                        <Button
                            color='#9e1b1b'
                            click={() => gerarPdf(true)}
                            value='Gerar PDF'
                        />
                        <Button
                            color='#174fb6'
                            click={() => gerarPdf(false)}
                            value='Imprimir'
                        />
                    </div>
                </div>

            </div>

        )
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
    function FichaCliente() {
        return (
            <div className="pdfAtend">
                <div className="cliCard">
                <div >
                    <h2>Ficha Clientes</h2>
                    
                   {project.nome_cliente? labelName:<PdfBar
                    setName={setName}
                        clients={clientes}
                    />
                }
                    </div>
                    <div className="inline dataCli">
                        <InputDate
                            
                            name='data'
                            title='De'
                            value={project.inicio}
                            handleOnChange={handleChange}
                        />
                        <InputDate
                            
                            name='data'
                            title='Até'
                            value={project.fim}
                            handleOnChange={handleChange}
                        />
                    </div>
                    
                    <div className="inlineButton">
                        <Button
                            color='#111111'
                            value='Voltar'
                            click={handleCloseModal}
                        />
                        <Button
                            color='#9e1b1b'
                            click={() => gerarPdf2(true)}
                            value='Gerar PDF'
                        />
                        <Button
                            color='#174fb6'
                            click={() => gerarPdf2(false)}
                            value='Imprimir'
                        />
                    </div>
                </div>

            </div>

        )
    }

    const fichas =[<FichaAtend />, <FichaCliente />]
    const [currentFicha, setCurrentFicha] = useState(0)

    return (
        <div className="pdfForm">
            <div className="pdfBar">
                <div className={currentFicha === 0? 'on':''}
                    onClick={()=> setCurrentFicha(0)}
                >
                    Atendentes
                </div >
                <div className={currentFicha === 1? 'on':''}
                    onClick={()=> setCurrentFicha(1)}
                >
                    Clientes
                </div >
            </div>
           {fichas[currentFicha]}
        </div>
    )

}