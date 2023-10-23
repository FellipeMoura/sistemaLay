import React, { useState, useEffect } from "react";
import { InputDate, Button, LabelText } from "../d_inputs/Input";
import moment from "moment";
import { createPDF } from "../f_aux/createPDF";

import './Clientes.css'
import { SessionContainer, TopContainer } from "../c_layouts/Pages";
import CBar from "../c_layouts/CBar";
import { ReturnButton } from "../d_inputs/LogoutButton";
import { Venda, Historico, Venda0, Assinaturas, NewSub } from "../c_layouts/ClientesLayout";
import { Label1 } from "../c_layouts/Contents";
import Modal from 'react-modal'
import CadastroCliForm from "./CadastroCliForm";

export function ClientesForm({ unidade, user, clientes }) {
    // const { unidade } = useParams()

    const [vendas, setVendas] = useState([])
    const [historico, setHistorico] = useState([])
    const [project, setProject] = useState({
        data: moment().add(1, 'day').format('YYYY-MM-DD'),
        inicio: moment('2023 07 15').format('YYYY-MM-DD'),
        fim: moment().add(1, 'year').format('YYYY-MM-DD')
    })

    const [assinaturas, setAssinaturas] = useState([])
    const [sub, setSub] = useState({})
    const [cliente, setCliente] = useState({})
    function handleChange(e) {
        setProject({ ...project, [e.target.name]: e.target.value })
        //   console.log(project.hora_fim)
    }
    function setName(e) {

        setProject({ ...project, ['id_cliente']: e.id_cliente, ['nome_cliente']: e.nome_cliente })

    }

    function getAss(vendaSub) {
        fetch(`${process.env.REACT_APP_CALENDAR}/getAss/${vendaSub.id}`, {
            method: "GET",
            heders: {
                'Content-type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((resp2) => {
                setAssinaturas(resp2)
                setSub(vendaSub)
                handleOpenModal()

            })
            .catch(err => console.log(err))

    }


    function gerarPdf2(download) {
        fetch(`${process.env.REACT_APP_CALENDAR}/buscarPDFcli/${cliente.id}/${project.inicio}/${project.fim}`, {
            method: "GET",
            heders: {
                'Content-type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((resp2) => {
                setHistorico(resp2)
                createPDF(resp2, false, download)

            })
            .catch(err => console.log(err))


    }





    function Vendas() {

        useEffect(() => {
            //  console.log(cliente.id)
            if (vendas.length < 1) {
                fetch(`${process.env.REACT_APP_CALENDAR}/getVendas/${cliente.id}`, {
                    method: "GET",
                    heders: {
                        'Content-type': 'application/json',
                    },
                })
                    .then((resp) => resp.json())
                    .then((resp2) => {
                        console.log(resp2)
                        setVendas(resp2)
                    })
                    .catch(err => console.log(err))
            }
        }, [])

        const [current, setCurrent] = useState(0)
        const titles = [

            { width: '250px', title: 'Procedimento' },
            { width: '40px', title: 'disp' },
            { width: '40px', title: 'total' },

            { width: '', title: 'id' },
        ]
        const titles2 = [

            { width: '250px', title: 'Procedimento' },
            { width: '40px', title: 'disp' },
            { width: '40px', title: 'total' },
            { width: '', title: 'Data' },
            { width: '', title: 'id' },
        ]
        const status = [
            { nome: 'Pendente', cor: '#696969' },
            { nome: 'Ativo', cor: '#0f8f2f' },
            { nome: 'Encerrado', cor: '#b60000' }
        ]
        return (
            current === 0 ?
                <div className="cliCard">
                    {
                        !Array.isArray(vendas) ?
                            vendas.vendas0.length > 0 ?
                                <Venda0
                                    titles={titles2}
                                >
                                    {vendas.vendas0.map((vendaSub, index) =>
                                        <tr
                                            key={index}>

                                            <td>
                                                {vendaSub.nome_procedimento}
                                            </td>

                                            <td
                                                className='assButton'
                                                style={{ backgroundColor: status[vendaSub.status].cor }}
                                                onClick={() => getAss(vendaSub)}
                                            >
                                                {vendaSub.status == 0 ? '-' :
                                                    vendaSub.qnt_sessao - vendaSub.realizadas}
                                            </td>
                                            <td>
                                                {vendaSub.qnt_sessao}

                                            </td>
                                            <td>
                                                {vendaSub.data.substr(0, 10).split('-').reverse().join('/')}
                                            </td>
                                            <td>
                                                {vendaSub.id}
                                            </td>
                                        </tr>
                                    )}

                                </Venda0>

                                : '' : ''}

                    {!Array.isArray(vendas) ?
                        vendas.vendas1.map((venda, index) =>
                            <Venda
                                status={status}
                                titles={titles}
                                venda={venda}
                                index={index}
                            >
                                {venda.vendas_sub.map((vendaSub, index) =>
                                    <tr
                                        key={index}>

                                        <td>
                                            {vendaSub.nome_procedimento}
                                        </td>

                                        <td
                                            className='assButton'
                                            style={{ backgroundColor: status[vendaSub.status].cor }}
                                            onClick={() => getAss(vendaSub)}
                                        >
                                            {vendaSub.status == 0 ? '-' :
                                                vendaSub.qnt_sessao - vendaSub.realizadas}
                                        </td>
                                        <td>
                                            {vendaSub.qnt_sessao}

                                        </td>
                                        <td>
                                            {vendaSub.id}
                                        </td>
                                    </tr>
                                )}

                            </Venda>
                        )
                        : ''

                    }
                    <Button
                        value='Novo'
                        color='#aaa'
                        click={() => setCurrent(1)}
                    />
                </div>
                : <NewSub
                    id_cliente={cliente.id}
                    user={user}
                    unidade={unidade}
                />

        )
    }

    function Historico() {



        useEffect(() => {
            if (historico.length < 1) {
                fetch(`${process.env.REACT_APP_CALENDAR}/buscarPDFcli/${cliente.id}/${project.inicio}/${project.fim}`, {
                    method: "GET",
                    heders: {
                        'Content-type': 'application/json',
                    },
                })
                    .then((resp) => resp.json())
                    .then((resp2) => {
                        //  console.log(resp2)
                        setHistorico(resp2)
                        if (resp2.length === 0) {
                            setHistorico([0])
                        }

                    })
                    .catch(err => console.log(err))
            }
        }, [project])

        const titles = [

            { width: '90px', title: 'Data' },
            { width: '250px', title: 'Procedimento' },

            { width: '50px', title: 'Hora' },
            { width: '100px', title: 'Status' },
            { width: '60px', title: 'id' },
        ]

        return (
            historico.length > 0 ?
                <div className="cliCard">


                    <div >
                        <h2>Histórico de agendamentos</h2>
                    </div>
                    <div className="inline dataCli">
                        <InputDate

                            name='inicio'
                            title='De'
                            value={project.inicio}
                            handleOnChange={handleChange}
                        />
                        <InputDate

                            name='fim'
                            title='Até'
                            value={project.fim}
                            handleOnChange={handleChange}
                        />
                    </div>


                    <div className='vendaForm'>


                        <div className='table1'>
                            <table >
                                <thead>
                                    <tr className='th1'>

                                        {

                                            titles.map((title, index) =>
                                                <th key={index} style={{ width: title.width }}>{title.title}</th>

                                            )}

                                    </tr>
                                </thead>
                                <tbody className=''>

                                    {historico.map((agendamento, index) =>
                                        <tr
                                            key={index}>

                                            <td>
                                                {agendamento.data ? agendamento.data.substr(0, 10).split('-').reverse().join('/') : ''}
                                            </td>
                                            <td>
                                                {agendamento.nome_procedimento}

                                            </td>
                                            <td>
                                                {agendamento.hora}
                                            </td>
                                            <td >
                                                {agendamento.confirm == 0 ? 'Agendado' :
                                                    parseInt(agendamento.assinado) > 0 ? parseInt(agendamento.assinado) > 1 ? 'Assinado' : 'Ass. Pendente' : 'Confirmado'}
                                            </td>

                                            <td>
                                                {agendamento.id}
                                            </td>
                                        </tr>
                                    )}

                                </tbody>
                            </table>
                        </div>


                    </div>

                    <div className="inlineButton">

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
                : <div>Nenhum agendamento encontrado..</div>

        )
    }

    const [modalIsOpen, setIsOpen] = useState(false)
    const customStyles = {
        content: {
            left: '50%',
            top: '50%',
            bottom: '-40%',
            right: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            overflowY: 'hidden'

            //height: '400px'

        }
    }
    function handleCloseModal() {
        setIsOpen(false)

    }

    function handleOpenModal() {

        setIsOpen(true)
    }
    const [confirm, setConfirm] = useState(0)
    function setCliente2(value) {
        setCliente(value)
        setConfirm(value.envio_confirmacao == 'nao' ? 0 : 'sim' ? 1 : 2)
    }


    const fichas = [
        <CadastroCliForm
            confirm={confirm}
            setConfirm={setConfirm}
            cliente={cliente}
            unidade={unidade}
            user={user}
        />,
        <Vendas />,
        <Historico />,
    ]
    const [currentFicha, setCurrentFicha] = useState(0)
    const navList = ['Cadastro', 'Vendas', 'Histórico']
    function limpar() {
        setCliente({ ...cliente, ['id']: '', ['nome']: '' })
        setVendas([])
        setHistorico([])
    }
    const unidades = [
        0,
        'Matriz',
        'Bueno',
        'Goiânia Shopping',
        'Orion',
        'Campinas',


    ]
    const status2 = [
        { nome: 'Pendente', cor: '#696969' },
        { nome: 'Ativo', cor: '#0f8f2f' },
        { nome: 'Encerrado', cor: '#b60000' }
    ]

    return (
        <div>
            <Modal
                ariaHideApp={false}
                isOpen={modalIsOpen}
                onRequestClose={handleCloseModal}
                style={customStyles}
            >
                <Assinaturas
                    sub={sub}
                >
                    {assinaturas.map((assinatura, index) =>
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{assinatura.data && assinatura.data.substr(0, 10).split('-').reverse().join('/')}</td>
                            <td style={{ backgroundColor: assinatura.status.color, color: '#f1f1f1' }}>{assinatura.status.status}</td>
                            <td>{assinatura.atendente}</td>
                            <td>{unidades[assinatura.unidade]}</td>
                            <td>{assinatura.evolucao}</td>
                            <td>{assinatura.data_evolucao && assinatura.data_evolucao.substr(0, 10).split('-').reverse().join('/')}</td>
                        </tr>
                    )}
                </Assinaturas>
            </Modal>
            <TopContainer
                setStep={setCurrentFicha}
                navList={navList}
                buttons={[
                    <ReturnButton
                        event={() => window.location.replace(`/calendar/${unidade}/${user}`)}
                    />
                ]}
            >
                {cliente.nome ?
                    <div className='labelClients'>
                        <LabelText
                            header='Cliente:'
                            onClick={() => limpar()}
                        >
                            {cliente.nome}
                        </LabelText>
                        <LabelText
                            header='id:'
                           
                        >
                            {cliente.id}
                        </LabelText>
                        
                    </div>

                    :

                    <CBar
                        setCliente={setCliente2}
                        setName={setName}
                        clients={clientes}
                    />
                }

            </TopContainer>
            <SessionContainer>

                {cliente.nome ?

                    fichas[currentFicha]

                    : "Informe o cliente..."

                }


            </SessionContainer>
        </div>
    )

}