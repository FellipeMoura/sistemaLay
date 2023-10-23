import React, { useState, useEffect } from "react";
import { useParams } from 'react-router';
import { InputDate, Button } from "../d_inputs/Input";
import moment from "moment";
import { createPDF } from "../f_aux/createPDF";
import { GiCheckMark } from 'react-icons/gi'
import '../c_layouts/Pdf.css'

import CBar from "../c_layouts/CBar";

export function ClientesForm({ handleCloseModal }) {
    // const { unidade } = useParams()
    const { user } = useParams()
    const [list, setList] = useState([])
    const [project, setProject] = useState({
        data: moment().add(1, 'day').format('YYYY-MM-DD'),
        inicio: moment('2023 07 15').format('YYYY-MM-DD'),
        fim: moment().add(1, 'year').format('YYYY-MM-DD')
    })
    const [clientes, setClientes] = useState([])
    const [cliente, setCliente] = useState({})
    function handleChange(e) {
        setProject({ ...project, [e.target.name]: e.target.value })
        //   console.log(project.hora_fim)
    }
    function setName(e) {

        setProject({ ...project, ['id_cliente']: e.id_cliente, ['nome_cliente']: e.nome_cliente })

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
                setList(resp2)
                //  console.log(resp2)
            })
            .catch(err => console.log(err))

        fetch(`${process.env.REACT_APP_CALENDAR}/clients`, {
            method: "GET",
            heders: {
                'Content-type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((resp2) => {

                setClientes(resp2)
                // console.log(resp2)
            })
            .catch(err => console.log(err))


    }, [])


    function gerarPdf2(download) {
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


    const labelName = (
        <div className='labelName labelN'>
            <p>Cliente: <label >{project.nome_cliente}
                <button
                    type='button'
                    onClick={() => setProject({ ...project, ['id_cliente']: '', ['nome_cliente']: '' })}
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

                        {cliente.nome ?

                            <div className='labelName labelN'>
                                <p>Cliente: <label >{cliente.nome}
                                    <button
                                        className='buttonLabelDay'
                                        type='button'
                                        onClick={() => setCliente({ ...cliente, ['id']: '', ['nome']: '' })}
                                    >
                                        Limpar
                                    </button>
                                </label></p>
                            </div>

                            :
                            <CBar
                                setCliente={setCliente}
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

    const fichas = [<FichaCliente />, <FichaCliente />,]
    const [currentFicha, setCurrentFicha] = useState(0)

    return (
        <div className="pdfForm">
            <div className="pdfBar">
                <div className={currentFicha === 0 ? 'on' : ''}
                    onClick={() => setCurrentFicha(0)}
                >
                    Clientes
                </div >
                <div className={currentFicha === 1 ? 'on' : ''}
                    onClick={() => setCurrentFicha(1)}
                >
                </div >
            </div>
            {fichas[currentFicha]}
        </div>
    )

}