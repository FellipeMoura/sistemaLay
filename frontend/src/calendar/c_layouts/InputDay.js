import { useState } from 'react'
import { InputText, Button, InputTime, LabelText, ConfirmButton } from '../d_inputs/Input'
import './InputDay.css'
import RBar from './RBar'
import { insertA, deleteA, fecharA, editarA, confirmarAgenda } from '../f_aux/functions'
import moment from 'moment'
import { ProcList, SalaList } from './ProcList'
import { BsArrowReturnLeft, BsTrash } from 'react-icons/bs'
import { AiOutlineFileAdd, AiOutlineForm, AiOutlineCarryOut, AiOutlineLock, AiOutlineSwap } from 'react-icons/ai'

function InputDay({ setInput, setIsEdit, unidade, dataCard, clients, user }) {
    const [project, setProject] = useState(dataCard[0])
    const [currentName, setCurrentName] = useState(dataCard[0].nome_cliente ? dataCard[0].nome_cliente != 'Aberto' ? 0 : 1 : 1)
    const [currentProc, setCurrentProc] = useState(project.nome_procedimento ? 0 : 1)
    const [currentSala, setCurrentSala] = useState(project.sala ? 0 : 1)
    const [options, setOptions] = useState([])
    const [idC, setIdC] = useState(dataCard[0].id)
    const [salaValue, setSalaValue] = useState(false)
    const [confirm, setConfirm] = useState(project.confirm)
    const [sala, setSala] = useState([])

    //console.log(project)
    function handleChange(e) {
        setProject({ ...project, [e.target.name]: e.target.value })
        setCurrentName(0)
    }
    function handleChange2(e) {
        setProject({ ...project, [e.target.name]: e.target.value })

    }
    function duracaoChange(e) {
        let e1 = e
        if (moment(`2020.05.05 ${project.hora}`).add(e.target.value, 'minutes').format('HH:mm') > moment(`2020.01.01 ${'20:00'}`).format('HH:mm')) {
            let duracao =
                (20 - parseInt(project.hora.substr(0, 2))) * 60 + parseInt(project.hora.substr(3, 2))

            window.alert('Duração máxima permitida: ' + duracao + ' min.')
        } else if (moment(`2020.05.05 ${project.hora}`).add(e.target.value, 'minutes').format('HH:mm') < project.hora) {
            window.alert(`hora de início: ${project.hora} e hora de término: ${moment(`2020.05.05 ${project.hora}`).add(e.target.value, 'minutes').format('HH:mm')} ???`)
        } else {
            setProject({ ...project, ['duracao']: e.target.value, ['hora_fim']: moment(`2020.05.05 ${project.hora}`).add(e.target.value, 'minutes').format('HH:mm') })
            //   console.log(project.hora_fim)
        }
    }
    function horaChange(e) {
        let e1 = e
        if (e.target.value > moment(`2020.01.01 ${dataCard[0].hora_fim}`).format('HH:mm')) {
            window.alert('Ínicio máximo permitido: ' + dataCard[0].hora_fim)
        } else {
            // moment(dataCard[0].hora).add(39, 'minutes') < moment(e.target.value)? console.log(`${moment(dataCard[0].hora).add(39, 'minutes').format('HH.mm')}>`+e.target.value): console.log(console.log(`${moment(dataCard[0].hora).add(39, 'minutes').format('HH:mm')}<`+e.target.value)) 
            setProject({ ...project, ['hora']: e.target.value, ['hora_fim']: moment(`2020.05.05 ${e.target.value}`).add(project.duracao, 'minutes').format('HH:mm') })
            console.log(moment(dataCard[0].hora).add(39, 'minutes'))

        }
    }
    function horaFimChange(e) {
        let e1 = e
        if (e.target.value > moment(`2020.01.01 ${'20:00'}`).format('HH:mm')) {
            window.alert('Horário máximo permitido: 20:00')
        } else {
            let duracao = (parseInt(e.target.value.substr(0, 2)) - parseInt(project.hora.substr(0, 2))) * 60 + parseInt(e.target.value.substr(3, 2)) - parseInt(project.hora.substr(3, 2))
            setProject({ ...project, ['hora_fim']: e.target.value, ['duracao']: duracao })
            console.log(moment(dataCard[0].hora).add(39, 'minutes'))
        }
    }

    function limpar(x) {



        setProject({
            ...project, ['id']: 0,
            ['nome_cliente']: '',
            ['procedimento']: '',
            ['id']: '',
            ['unidade']: 0,
            ['sala']: '',
            ['hora']: dataCard[1].hora,
            ['hora_fim']: dataCard[1].hora_fim,
            ['indice']: dataCard[1].indice,
        })

        setCurrentName(1)
        setCurrentProc(1)
        setCurrentSala(1)
        setOptions([])
        //console.log(project)


        !x ? setIdC(0) : console.log('limpar')

    }






    function setName(e) {
        let e1 = e
        setProject({ ...project, ['id_cliente']: e.id, ['nome_cliente']: e.nome, ['telefone']: e.telefone })
        setCurrentName(0)
        // console.log(e)


    }
    function setName2(e) {
        let e1 = e
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
                //      console.log(options)
                if (resp2.disp) {
                    setSalaValue(options[e].sala + ' - ' + options[e].nome_sala)
                    setProject({ ...project, ['nome_procedimento']: options[e].nome, ['procedimento']: options[e].id_pacote, ['id_venda_sub']: options[e].id_vendas_sub, ['sala']: options[e].sala, ['duracao']: resp2.result, ['hora_fim']: moment(`2020.05.05 ${project.hora}`).add(resp2.result, 'minutes').format('HH:mm') })
                    options[e].sala ? setCurrentSala(0) : buscarSalas()

                } else {
                    let resp3 = window.confirm(`Sala reservada para ${resp2.atendente} , confirma o agendamento nesse horário? [${resp2.id}]`)
                    if (resp3) {
                        setSalaValue(options[e].sala + ' - ' + options[e].nome_sala)
                        setProject({ ...project, ['nome_procedimento']: options[e].nome, ['procedimento']: options[e].id_pacote, ['id_venda_sub']: options[e].id_vendas_sub, ['sala']: options[e].sala, ['duracao']: resp2.result, ['hora_fim']: moment(`2020.05.05 ${project.hora}`).add(resp2.result, 'minutes').format('HH:mm') })
                        options[e].sala ? setCurrentSala(0) : buscarSalas()

                    }
                }
            })
            .catch(err => console.log(err))


    }

    function buscarSalas() {
        fetch(`${process.env.REACT_APP_CALENDAR}/buscarSalas/${unidade}`, {
            method: "GET",
            heders: {
                'Content-type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((resp2) => {

                setSala(resp2)
                //   console.log(resp2)
            })
            .catch(err => console.log(err))
    }

    function editarSala(e) {
        //console.log(e.target.value)
        fetch(`${process.env.REACT_APP_CALENDAR}/disp/${project.data.substr(0, 10)}/${project.hora}/${project.hora_fim}/${e}/${unidade}/${project.atendente}`, {
            method: "GET",
            heders: {
                'Content-type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((resp2) => {
                //   console.log(e)
                if (resp2.disp) {
                    setSalaValue(sala[e].id + ' - ' + sala[e].nome)
                    setProject({ ...project, ['sala']: sala[e].id, ['duracao']: resp2.result, ['hora_fim']: moment(`2020.05.05 ${project.hora}`).add(resp2.result, 'minutes').format('HH:mm') })
                    setCurrentSala(0)

                } else {
                    let resp3 = window.confirm(`Sala reservada para ${resp2.atendente} , confirma o agendamento nesse horário?`)
                    if (resp3) {
                        setSalaValue(sala[e].id + ' - ' + sala[e].nome)
                        setProject({ ...project, ['sala']: sala[e].id, ['duracao']: resp2.result, ['hora_fim']: moment(`2020.05.05 ${project.hora}`).add(resp2.result, 'minutes').format('HH:mm') })
                        setCurrentSala(0)

                    }
                }
            })
            .catch(err => console.log(err))
    }


    function setThisSala() {
        setCurrentSala(1)
        buscarSalas()
    }

    const nameStates = [
        <LabelText
            header="Cliente:"

            onClick={() => limpar(true)}

        >
            {project.nome_cliente}
        </LabelText>,
        <RBar
            user={user}
            unidade={unidade}
            handleChange={handleChange}
            setName={setName}
            setName2={setName2}
            setCurrentName={setCurrentName}
            clients={clients}
            setOptions={setOptions}
            users={dataCard[0]} />

    ]

    const procStates = [
        <LabelText
            header="Procedimento:"

            onClick={() => setCurrentProc(1)}

        >
            {project.nome_procedimento}
        </LabelText>,
        <ProcList
            setProc={setProc}
            procs={options}
        />


    ]

    const salaStates = [
        <LabelText
            header="Sala:"

            onClick={() => setThisSala()}

        >
            {project.sala ? salaValue || project.sala : ''}
        </LabelText>,
        <SalaList
            salas={sala}
            editarSala={editarSala}
        />


    ]
    function transferir() {
        setInput(1, dataCard[0])
        setIsEdit(project)
    }

    function inputClose() {
        setInput(1, dataCard[0])
        // setRefresh(dataCard[0][0])
    }

    //console.log(project)
    return (
        <form className='form'>



            <div className='inputForm'>

                <div className='inline2'>

                    <LabelText
                        header='Data:'
                    >
                        {project.data && project.data.substr(0, 10).split('-').reverse().join('/')}
                    </LabelText>
                    <LabelText
                        header="Atendente:"
                    >
                        {project.atendente}
                    </LabelText>
                    {project.id > 0 &&
                        <ConfirmButton
                            color={confirm == 1 ? "#4a8370" : "#515253"}
                            value={confirm == 1 ? "Confirmado" : "Confirmar"}
                            onClick={() => confirmarAgenda(project, inputClose)}

                        />

                    }
                </div>


                {nameStates[currentName]}

                {procStates[currentProc]}
                {salaStates[currentSala]}

                <div className='inline1'>
                    <InputTime
                        flex='column'
                        title='Início'
                        name='hora'
                        value={project.hora}
                        width='95px'
                        handleOnChange={horaChange}
                    />


                    <InputTime
                        flex='column'
                        disabled={false}
                        title=' Final '
                        name='hora'
                        value={project.hora_fim}
                        width='95px'
                        handleOnChange={horaFimChange}
                    />

                    <InputText
                        flex='column'
                        title='Duração'
                        value={project.duracao}
                        width='50px'
                        handleOnChange={duracaoChange}
                    />
                </div>



                <InputText
                    value={project.nota}
                    handleOnChange={(e) => handleChange2(e)}
                    name='nota'
                    width='500px'
                    flex='column'
                    title='Anotação'
                />

                {project.id ?
                    <div className='inline2'>
                        <LabelText
                            header='Agendado:'
                        >
                            {project.data_agendamento && project.data_agendamento.substr(0, 10).split('-').reverse().join('/') + ' - ' + project.data_agendamento.substr(11, 5).split(':').join('h')}
                        </LabelText>


                        <LabelText
                            header={'a' + project.id + ' |v' + project.id_venda_sub + ' |c' + project.id_cliente}
                        />


                    </div>
                    : ''
                }


            </div>
            <div className={'buttons'}>

                {project.id > 0 &&
                    <Button
                        color="#2d4492"
                        value='Novo'
                        click={() => limpar(false)}
                    >
                        <AiOutlineFileAdd />
                    </Button>
                }
                {project.id < 1 ?
                    <Button
                        color="#447461"
                        value='Agendar'
                        click={() => insertA(idC, dataCard[0], project, unidade, user, inputClose)}
                    >
                        <AiOutlineCarryOut />
                    </Button>
                    : <Button
                        color="#447461"
                        value='Salvar'
                        click={() => editarA(project, inputClose)}
                    >
                        <AiOutlineForm />
                    </Button>
                }

                <Button
                    color="#474747"
                    value='Voltar'
                    click={() => setInput(1, dataCard[0])}
                >
                    <BsArrowReturnLeft />
                </Button>
                {project.id > 0 &&
                    <Button
                        color="#8f2828"
                        value='Desativar'
                        click={() => deleteA(project, inputClose, user)}
                    >
                        <BsTrash />
                    </Button>
                }
                {project.unidade == 0 &&
                    <Button
                        color="#6c388f"
                        value='Bloquear'
                        click={() => fecharA(project, unidade, user, inputClose)}
                    >
                        <AiOutlineLock />
                    </Button>
                }
                {project.id > 0 &&
                    <Button
                        color="#6c388f"
                        value='Transferir'
                        click={() => transferir()}
                    >
                        <AiOutlineSwap />
                    </Button>
                }
            </div>
        </form>
    )
} export default InputDay