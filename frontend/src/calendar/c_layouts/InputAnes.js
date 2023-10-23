import { useState } from 'react'
import { Select, InputText, InputDate, InputMasks, Button, InputTime, LabelText } from '../d_inputs/Input'
import './InputDay.css'
import RBar from './RBar'
import { insertB, deleteA, editarA } from '../f_aux/functions'
import moment from 'moment'
import { ProcList } from './ProcList'


function InputAnes({ setRefresh, setInput, unidade, setCurrentFormat, dataCard, clients, user, setIsEdit }) {

    const [project, setProject] = useState(dataCard[0])
    const [currentName, setCurrentName] = useState(dataCard[0].nome_cliente ? 0 : 1)
    const [currentProc, setCurrentProc] = useState(project.procedimento ? 0 : 1)
    const [currentSala, setCurrentSala] = useState(project.sala ? 0 : 1)
    const [options, setOptions] = useState([])
    const [idC, setIdC] = useState(dataCard[0].id)

    // console.log(params)



    function handleChange(e) {
        setProject({ ...project, [e.target.name]: e.target.value })
        setCurrentName(0)
    }
    function handleChange2(e) {
        setProject({ ...project, [e.target.name]: e.target.value })
    }

    function limpar(x) {

        setProject({
            ...project, ['id']: 0,
            ['nome_cliente']: '',
            ['procedimento']: '',
            ['id']: '',
            ['sala']: '',

        })

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
                        className='buttonLabelDay'
                        type='button'
                        onClick={() => limpar(true)}
                    >
                        Limpar
                    </button>
                }</label></p>


        </div>
    )
    const labelProc = (
        <div>
            <p>Procedimento: <label> {project.nome_procedimento}</label></p>
        </div>


    )
    function setName(e) {
        setProject({ ...project, ['id_cliente']: e.id, ['nome_cliente']: e.nome, ['telefone']: e.telefone })
        setCurrentName(0)
        console.log(e)


    }
    function setProc(e) {
        setProject({ ...project, ['nome_procedimento']: options[e].nome, ['procedimento']: options[e].id_pacote })

        setCurrentProc(0)
        //console.log(options)

    }

    function transferir() {
        setInput(1, dataCard[0])
        setIsEdit(project)
        // window.location.replace(`/calendar/${unidade}/${user}`)
    }

    function inputClose() {
        setInput(1, dataCard[0])
        // setRefresh(dataCard[0])
    }
    function setName2(e) {

        setProject({ ...project, ['id_cliente']: e.id_cliente, ['nome_cliente']: e.nome_cliente, ['telefone']: e.telefone })
        setCurrentName(0)
        // console.log(e)


    }

    const nameStates = [
        labelName,
        <RBar
            user={user}
            setName2={setName2}
            handleChange={handleChange}
            setName={setName}
            setCurrentName={setCurrentName}
            clients={clients}
            setOptions={setOptions}
            users={dataCard[0]} />
    ]

    const procStates = [
        labelProc,
        <ProcList
            setProc={setProc}
            procs={options}
        />
    ]



    // console.log(project)
    return (
        <form className='form'>



            <div className='inputForm'>
                <div className='inline2'>

                    <LabelText
                        header='Data:'
                    >
                        {project.data && project.data.substr(0, 10).split('-').reverse().join('/')}
                    </LabelText>


                </div>
                {nameStates[currentName]}
                <LabelText
                    header="Procedimento:"

                >
                    Anestésico
                </LabelText>

                <div className='inline2'>
                <LabelText
                    header="Início:"

                >
                    {project.hora}
                </LabelText>
                <LabelText
                    header="Fim:"

                >
                    {project.hora_fim}
                </LabelText>
                   

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
                    />
                }

                {project.id < 1 ?
                    <Button
                        color="#447461"
                        value='Agendar'
                        click={() => insertB(idC, project, unidade, user, inputClose)}
                    />
                    : <Button
                        color="#447461"
                        value='Salvar'
                        click={() => editarA(project, inputClose)}
                    />
                }


                <Button
                    color="#474747"
                    value='Voltar'
                    click={() => setInput(1, dataCard[0])}
                />
                {project.id > 0 &&
                    <Button
                        color="#8f2828"
                        value='Excluir'
                        click={() => deleteA(project, inputClose, user)}
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
} export default InputAnes