import { useState, useEffect } from 'react'
import { Select, InputText, Button, InputTime } from '../d_inputs/Input'
import './InputDay.css'
import RBar from './RBar'
import { insertA, deleteA, fecharA} from '../f_aux/functions'
import moment from 'moment'
import { ProcList } from './ProcList'
import { GiCheckMark } from 'react-icons/gi'


function InputDay({ setIsEdit, unidade, setCurrentFormat, dataCard, clients, user }) {
    const [project, setProject] = useState(dataCard)
    const [currentName, setCurrentName] = useState(dataCard.nome_cliente && dataCard.nome_cliente != 'Aberto' ? 0 : 1)
    const [currentProc, setCurrentProc] = useState(project.nome_procedimento ? 0 : 1)
    const [currentSala, setCurrentSala] = useState(project.sala ? 0 : 1)
    const [options, setOptions] = useState([])
    const [idC, setIdC] = useState(dataCard.id)
    const [nota, setNota] = useState('')
    const [confirm, setConfirm] = useState(project.confirm)
    


    const sala = [
        { id: 0, nome: 'Livre' },
        { id: 1, nome: 'Endermo Glúteo' },
        { id: 2, nome: 'Carboxterapia' },
        { id: 3, nome: 'Criofrequência + Ultracavitação' },
        { id: 4, nome: 'Criolipólise' },
        { id: 5, nome: 'Dermapen' },
        { id: 6, nome: 'Estimulação Russa' },
        { id: 7, nome: 'Heccus' },
        { id: 8, nome: 'Hidrolipoclasia' },
        { id: 9, nome: 'Camuflagem de estrias' },
        { id: 10, nome: 'Lipocavitação + Lipocavity Wave' },
        { id: 11, nome: 'Luz Pulsada' },
        { id: 12, nome: 'Ladshape' },
        { id: 13, nome: 'Mega Shape' },
        { id: 14, nome: 'New Skin' },
        { id: 15, nome: 'Power Shape + Eletroestimulação Total Sculptor' },
        { id: 16, nome: 'Spa Detox' },
        { id: 17, nome: 'Radiofrequência' },
        { id: 18, nome: 'Radiofrequência Fracionada + Jato de Plasma ' },
        { id: 19, nome: 'Laser Venus' },
        { id: 20, nome: 'Vacum Laser + Striort' },
        { id: 21, nome: 'Laser Black Peel + Remoção de Tatuagem + Despigmentação de sobrancelha' },
        { id: 22, nome: 'Depilação a Laser' },
        { id: 23, nome: ' Ultrasson Microfocado' },
        { id: 24, nome: 'Laser Lavieen' },
        { id: 25, nome: 'Enzima Capilar' },
        { id: 26, nome: 'Enzima Papada' },
        { id: 27, nome: 'Enzima Intramuscular' },
        { id: 28, nome: 'Enzima Local' },
        { id: 29, nome: 'Limpeza de Pele' },
        { id: 30, nome: 'Drenagem' },
        { id: 31, nome: 'Criolipólise de Placas' }
    ]

    function handleChange(e) {
        setProject({ ...project, [e.target.name]: e.target.value })
        setCurrentName(0)
    }
    function handleChange2(e) {
        setProject({ ...project, [e.target.name]: e.target.value })
    }
    function duracaoChange(e) {
        setProject({ ...project, ['hora_fim']: moment(`2020.05.05 ${project.hora}`).add(e.target.value, 'minutes').format('HH:mm') })
        //   console.log(project.hora_fim)
    }

    function limpar(x) {

        if (x && idC > 0) { window.alert('Exclua este registro primeiro.') } else {

            setProject({ ...project, ['nome_cliente']: '', ['procedimento']: '', ['id']: '', ['sala']: '' })

            setCurrentName(1)
            setCurrentProc(1)
            setCurrentSala(1)
            setOptions([])
            //console.log(project)

        }
        !x ? setIdC(0) : console.log('limpar')

    }

    function editarSala(e) {
        console.log(e.target.value)
        fetch(`${process.env.REACT_APP_CALENDAR}/disp/${project.data.substr(0, 10)}/${project.hora}/${project.hora_fim}/${sala[e.target.value].id}/${unidade}`, {
            method: "GET",
            heders: {
                'Content-type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((resp2) => {
                console.log(resp2)
                if ((!resp2 || resp2[0].sala == 0 || resp2[0].sala == 30 ||
                    (resp2[0].sala > 25 && resp2[0].sala < 30 && resp2.length < 2)
                )) {

                    console.log(sala[e.target.value])
                    setProject({ ...project, ['sala']: sala[e.target.value].id })
                    setCurrentSala(0)

                } else {

                    if (resp2[0].atendente !== project.atendente) {
                        window.alert(`Sala reservada para ${resp2[0].atendente}`)
                    } else {
                        setProject({ ...project, ['nome_procedimento']: options[e].nome, ['procedimento']: options[e].id_pacote, ['id_venda_sub']: options[e].id_vendas_sub, ['sala']: options[e].sala })
                        options[e].sala ? setCurrentSala(0) : console.log('sala indefinida')
                        console.log(options[e])
                    }
                }
            })
            .catch(err => console.log(err))
    }

    function confirmarAgenda(cadastro) {

        var value2 = cadastro.confirm == 0 ? 1 : 0

        fetch(`${process.env.REACT_APP_CALENDAR}/confirmarAgenda/${cadastro.id_cliente}/${cadastro.data.substr(0, 10)}/${value2}/${cadastro.id_venda_sub}`, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(),
        })
            .then((resp) => resp.json()).then((data) => {
                // agendar(cadastro, value2)
                window.alert(cadastro.confirm == 0 ? "Horário confirmado!" : "Confirmação pendente!")

                window.location.replace(`/calendar/${unidade}/${project.data}/${user}`)
                // history.push(`/prontuario/${id}/${idrecord}/1`)
                //redirect
            })
            .catch(err => console.log(err))
        //    }
    }

    const labelName = (
        <div className='labelName labelN'>
            <p>Cliente: <label >{project.nome_cliente}
                <button
                    type='button'
                    onClick={() => limpar(true)}
                >
                    Limpar
                </button>
            </label></p>
            {project.id > 0 &&
                (<p>Confirmado:  <div onClick={() => confirmarAgenda(project)}> {confirm == 1 && <GiCheckMark />}</div> </p>)
            }

        </div>
    )

    //const confirmButtons = [yconf, nconf]
    const labelProc = (
        <div>
            <p>Procedimento: <label> {project.nome_procedimento}</label></p>
        </div>
    )

    const labelSala = (
        <div className='labelName'>
            <p>Aparelho: <label> {project.sala ? project.sala : ''}
                <button
                    type='button'
                    onClick={() => setCurrentSala(1)}
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
        setSala(e)
        currentSala === 1 && currentProc == 1 && setProject({ ...project, ['nome_procedimento']: options[e].nome, ['procedimento']: options[e].id_pacote, ['id_venda_sub']: options[e].id_vendas_sub })

        setCurrentProc(0)


    }
    function setSala(e) {
        // const sala = e.target.value
        fetch(`${process.env.REACT_APP_CALENDAR}/disp/${project.data.substr(0, 10)}/${project.hora}/${project.hora_fim}/${options[e].sala}/${unidade}`, {
            method: "GET",
            heders: {
                'Content-type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((resp2) => {
                var resp = resp2
                if (!resp2 || resp2[0].sala == 0 || resp2[0].sala == 30 ||
                    (resp2[0].sala > 25 && resp2[0].sala < 30 && resp2.length < 2)
                ) {


                    setProject({ ...project, ['nome_procedimento']: options[e].nome, ['procedimento']: options[e].id_pacote, ['id_venda_sub']: options[e].id_vendas_sub, ['sala']: options[e].sala })
                    options[e].sala ? setCurrentSala(0) : console.log('sala indefinida')
                    console.log(options[e])
                } else {

                    if (resp2[0].atendente !== project.atendente) {
                        window.alert(`Sala reservada para ${resp2[0].atendente}`)
                    } else {
                        setProject({ ...project, ['nome_procedimento']: options[e].nome, ['procedimento']: options[e].id_pacote, ['id_venda_sub']: options[e].id_vendas_sub, ['sala']: options[e].sala })
                        options[e].sala ? setCurrentSala(0) : console.log('sala indefinida')
                        console.log(options[e])
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
        <Select
            flex='column'
            width='15em'
            options={sala}
            value={project.sala}
            name='sala'
            text='Aparelho'
            handleOnChange={editarSala}
        />


    ]
    function transferir(){
        setCurrentFormat(1)
        setIsEdit(project)
    }

    //console.log(project)
    return (
        <form className='form'>



            <div className='inputForm'>
                <h1>Agendamento</h1>
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
                        width='50px'
                        handleOnChange={duracaoChange}
                    />

                </div>
                <p>Data:<label> {project.data && project.data.substr(0, 10).split('-').reverse().join('/')}</label></p>
                <p>Atendente: <label>{project.atendente}</label></p>
                {!project.id_cliente &&

                    <InputText
                        value={nota}
                        handleOnChange={(e) => setNota(e.target.value)}
                        width='500px'
                        flex='column'
                        title='Anotação'
                    />
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

                <Button
                    color="#447461"
                    value='Cadastrar'
                    click={() => insertA(idC, dataCard, project, unidade, user,)}
                />

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
                        click={() => fecharA(project, unidade, user, nota)}
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