import { useState, useEffect } from 'react'
import { Select, InputText, Button, InputTime } from '../d_inputs/Input'
import './InputDay.css'
import RBar from './RBar'
import { insertA, deleteA, fecharA, editarA, confirmarAgenda } from '../f_aux/functions'
import moment from 'moment'
import { ProcList, SalaList } from './ProcList'
import { GiCheckMark } from 'react-icons/gi'


function InputDay({ setIsEdit, unidade, setCurrentFormat, dataCard, clients, user }) {
    const [project, setProject] = useState(dataCard)
    const [currentName, setCurrentName] = useState(dataCard.nome_cliente && dataCard.nome_cliente != 'Aberto' ? 0 : 1)
    const [currentProc, setCurrentProc] = useState(project.nome_procedimento ? 0 : 1)
    const [currentSala, setCurrentSala] = useState(project.sala ? 0 : 1)
    const [options, setOptions] = useState([])
    const [idC, setIdC] = useState(dataCard.id)
    
    const [confirm, setConfirm] = useState(project.confirm)
    const [sala, setSala] = useState([])


    function handleChange(e) {
        setProject({ ...project, [e.target.name]: e.target.value })
        setCurrentName(0)
    }
    function handleChange2(e) {
        setProject({ ...project, [e.target.name]: e.target.value })
       
    }
    function duracaoChange(e) {
        setProject({ ...project, ['duracao']: e.target.value, ['hora_fim']: moment(`2020.05.05 ${project.hora}`).add(e.target.value, 'minutes').format('HH:mm') })
        //   console.log(project.hora_fim)
    }

    function limpar(x) {



        setProject({ ...project, ['id']: 0, ['nome_cliente']: '', ['procedimento']: '', ['id']: '', ['sala']: '' })

        setCurrentName(1)
        setCurrentProc(1)
        setCurrentSala(1)
        setOptions([])
        //console.log(project)


        !x ? setIdC(0) : console.log('limpar')

    }





    const labelName = (
        <div className='labelName labelN'>
            <p>Cliente: <label >{project.nome_cliente}
                {project.id < 1 &&
                    <button
                        type='button'
                        onClick={() => limpar(true)}
                    >
                        Limpar
                    </button>
                }</label></p>


        </div>
    )

    //const confirmButtons = [yconf, nconf]
    const labelProc = (
        <div>
            <p>Procedimento: <label> {project.nome_procedimento}</label></p>
        </div>
    )
    function setThisSala(){
        setCurrentSala(1)
        buscarSalas()
    }
    const labelSala = (
        <div className='labelName'>
            <p>Aparelho: <label> {project.sala ? project.sala : ''}
                <button
                    type='button'
                    onClick={() => setThisSala()}
                >
                    Alterar
                </button>
            </label></p>
        </div>

    )
    function setName(e) {

        setProject({ ...project, ['id_cliente']: e.id, ['nome_cliente']: e.nome, ['telefone']: e.telefone })
        setCurrentName(0)
        // console.log(e)


    }
    function setName2(e) {

        setProject({ ...project, ['id_cliente']: e.id_cliente, ['nome_cliente']: e.nome_cliente, ['telefone']: e.telefone })
        setCurrentName(0)
        // console.log(e)


    }

    function setProc(e) {
        // console.log('sala:' + e)
        editSala(e)
        currentSala === 1 && currentProc == 1 && setProject({ ...project, ['nome_procedimento']: options[e].nome, ['procedimento']: options[e].id_pacote, ['id_venda_sub']: options[e].id_vendas_sub })

        setCurrentProc(0)


    }
    function editSala(e) {
        // const sala = e.target.value
        fetch(`${process.env.REACT_APP_CALENDAR}/disp/${project.data.substr(0, 10)}/${project.hora}/${project.hora_fim}/${options[e].sala}/${unidade}/${project.atendente}`, {
            method: "GET",
            heders: {
                'Content-type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((resp2) => {
                console.log(resp2)
                if (!resp2) {

                    setProject({ ...project, ['nome_procedimento']: options[e].nome, ['procedimento']: options[e].id_pacote, ['id_venda_sub']: options[e].id_vendas_sub, ['sala']: options[e].sala })
                    options[e].sala ? setCurrentSala(0) : buscarSalas()
                  
                } else {
                    let resp3 = window.confirm(`Sala reservada , confirma o agendamento nesse horário?`)
                    if (resp3) {
                        setProject({ ...project, ['nome_procedimento']: options[e].nome, ['procedimento']: options[e].id_pacote, ['id_venda_sub']: options[e].id_vendas_sub, ['sala']: options[e].sala })
                        options[e].sala ? setCurrentSala(0) : buscarSalas()

                    }
                }
            })
            .catch(err => console.log(err))


    }

    function buscarSalas(){
        fetch(`${process.env.REACT_APP_CALENDAR}/buscarSalas/${unidade}`, {
            method: "GET",
            heders: {
                'Content-type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((resp2) => {

                setSala(resp2)
                console.log(resp2)
            })
            .catch(err => console.log(err))
    }

    function editarSala(e) {
        //console.log(e.target.value)
        fetch(`${process.env.REACT_APP_CALENDAR}/disp/${project.data.substr(0, 10)}/${project.hora}/${project.hora_fim}/${sala[e].indice}/${unidade}/${project.atendente}`, {
            method: "GET",
            heders: {
                'Content-type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((resp2) => {
                if (!resp2) {

                    setProject({ ...project,  ['sala']: sala[e].indice })
                     setCurrentSala(0)
                  
                } else {
                    let resp3 = window.confirm(`Sala reservada para ${resp2[0].atendente}, confirma o agendamento nesse horário?`)
                    if (resp3) {
                        setProject({ ...project,  ['sala']: sala[e].indice })
                        setCurrentSala(0)

                    }
                }
            })
            .catch(err => console.log(err))
    }

    const nameBar = (
        <div className='inline'>
            <RBar
                unidade={unidade}
                handleChange={handleChange}
                setName={setName}
                setName2={setName2}
                setCurrentName={setCurrentName}
                clients={clients}
                setOptions={setOptions}
                users={dataCard} />


        </div>
    )

    const nameStates = [
        labelName,
        nameBar

    ]

    const procStates = [
        labelProc,
        <ProcList
            setProc={setProc}
            procs={options}
        />


    ]

    const salaStates = [
        labelSala,
        <SalaList
            salas={sala}
            editarSala={editarSala}
        />


    ]
    function transferir() {
        setCurrentFormat(1)
        setIsEdit(project)
    }

    //console.log(project)
    return (
        <form className='form'>



            <div className='inputForm'>
                <h1>Agendamento</h1>
                {project.id > 0 &&
                    <div className='labelConfirm'
                        onClick={() => confirmarAgenda(project, user)}> Confirmado:<div> {confirm == 1 && <GiCheckMark />} </div></div>
                }
                <div className='labelName'>
                    {nameStates[currentName]}
                </div>
                {procStates[currentProc]}
                {salaStates[currentSala]}

                <div className='inline2'>
                    <InputTime
                        flex='column'
                        title='Início'
                        name='hora'
                        value={project.hora}
                        width='95px'
                        handleOnChange={handleChange2}
                    />
                    <InputTime
                        flex='column'
                        title='Fim'
                        name='hora_fim'
                        value={project.hora_fim}
                        width='95px'
                        handleOnChange={handleChange2}
                    />
                    <InputText
                        flex='column'
                        title='Duração'
                        value={project.duracao}
                        width='50px'
                        handleOnChange={duracaoChange}
                    />

                </div>
                <p>Data:<label> {project.data && project.data.substr(0, 10).split('-').reverse().join('/')}</label></p>
                <p>Atendente: <label>{project.atendente}</label></p>
              

                    <InputText
                        value={project.nota}
                        handleOnChange={(e) => handleChange2(e)}
                        name='nota'
                        width='500px'
                        flex='column'
                        title='Anotação'
                    />
                



            </div>
            <div className={'buttons'}>

                {project.id > 0 &&
                    <Button
                        color="#2d4492"
                        value='Novo'
                        click={() => limpar(false)}
                    />
                }
                {project.id < 1 ?
                    <Button
                        color="#447461"
                        value='Cadastrar'
                        click={() => insertA(idC, dataCard, project, unidade, user,)}
                    />
                    : <Button
                        color="#447461"
                        value='Salvar'
                        click={() => editarA(project, user)}
                    />
                }

                <Button
                    color="#474747"
                    value='Voltar'
                    click={() => setCurrentFormat(1)}
                />
                {project.id > 0 &&
                    <Button
                        color="#8f2828"
                        value='Excluir'
                        click={() => deleteA(project, unidade, user)}
                    />
                }
                {project.id < 1 &&
                    <Button
                        color="#6c388f"
                        value='Bloquear'
                        click={() => fecharA(project, unidade, user)}
                    />
                }
                {project.id > 0 &&
                    <Button
                        color="#6c388f"
                        value='Transferir'
                        click={() => transferir()}
                    />
                }
            </div>
        </form>
    )
} export default InputDay