import { useState } from 'react'
import { Select, InputText, InputDate, InputMasks, Button, InputTime } from '../d_inputs/Input'
import './InputDay.css'
import RBar from './RBar'
import { insertA, deleteA, fecharA } from '../f_aux/functions'
import moment from 'moment'
import { ProcList } from './ProcList'
import {GiCheckMark} from 'react-icons/gi'


function InputDay({ unidade, handleCloseModal, dataCard, clients, user }) {
    const [project, setProject] = useState(dataCard)
    const [currentName, setCurrentName] = useState(dataCard.nome_cliente ? 0 : 1)
    const [currentProc, setCurrentProc] = useState(project.procedimento ? 0 : 1)
    const [currentSala, setCurrentSala] = useState(project.sala ? 0 : 1)
    const [options, setOptions] = useState([])
    const [idC, setIdC] = useState(dataCard.id)
    const [confirm, setConfirm] = useState(project.confirm)

    //console.log(project)


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
        { id: 24, nome: 'Laser Lavieen'}
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

            setProject({ ...project, ['nome_cliente']: '', ['procedimento']: '', ['sala']: '', ['sala']: ''})
            setCurrentName(1)
            setCurrentProc(1)
            setCurrentSala(1)
            setOptions([])

        }
        !x ? setIdC(0) : console.log('limpar')

    }

    function editarSala(e) {
        console.log(options)
        fetch(`${process.env.REACT_APP_CALENDAR}/disp/${project.data.substr(0, 10)}/${project.hora}/${project.hora_fim}/${sala[e.target.value].id}/${unidade}`, {
            method: "GET",
            heders: {
                'Content-type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((resp2) => {
                var resp = resp2
                if ((!resp2 || resp2.sala == 0)) {
                    
                    console.log(e.target.value)
                    setProject({ ...project, ['sala']: sala[e.target.value].id })
                    setCurrentSala(0)
                    
                } else {

                    if (resp.atendente !== project.atendente) {
                        window.alert(`Sala reservada para ${resp2.atendente}`)
                    }
                }
            })
            .catch(err => console.log(err))
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
          ( <p>Confirmado:  <div> {confirm==1 && <GiCheckMark/> }</div> </p>)
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
            <p>Aparelho: <label> {sala[project.sala] ? sala[project.sala].nome : ''}
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
        
        setProject({ ...project, ['id_cliente']: e.id, ['nome_cliente']: e.nome, ['telefone']:e.telefone })
        setCurrentName(0)
       // console.log(e)
        

    }
    function setProc(e) {
        console.log('sala:'+e)
        setSala(e)
        currentSala===1 && currentProc== 1 && setProject({ ...project, ['nome_procedimento']: options[e].nome, ['procedimento']: options[e].id_pacote, ['id_venda_sub']: options[e].id_vendas_sub })

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
                if ((!resp2 || resp2.atendente == project.atendente || resp2.sala == 0)) {
                    
                    
                    setProject({ ...project, ['nome_procedimento']: options[e].nome, ['procedimento']: options[e].id_pacote, ['id_venda_sub']: options[e].id_vendas_sub, ['sala']: options[e].sala })
                    options[e].sala ? setCurrentSala(0): console.log('sala indefinida')
                    console.log(options[e])
                } else {

                    if (resp2.atendente !== project.atendente) {
                        window.alert(`Sala reservada para ${resp2.atendente}`)
                    }
                }
            })
            .catch(err => console.log(err))


    }



    const nameStates = [
        labelName,
        <RBar
            handleChange={handleChange}
            setName={setName}
            setCurrentName={setCurrentName}
            clients={clients}
            setOptions={setOptions}
            users={dataCard} />
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


    //console.log(project)
    return (
        <form className='form'>



            <div className='inputForm'>
                <h1>Novo Agendamento</h1>
                {nameStates[currentName]}
                {procStates[currentProc]}
                {salaStates[currentSala]}




                <InputText
                    title='Duração'
                    width='50px'
                    handleOnChange={duracaoChange}
                />

                <div className='inline2'>
                    <p>Início:<label> {project.hora && project.hora.substr(0, 5)}</label></p>
                    <p>Fim:<label> {project.hora_fim}</label></p>
                </div>
                <p>Data:<label> {project.data && project.data.substr(0, 10).split('-').reverse().join('/')}</label></p>
                <p>Atendente: <label>{project.atendente}</label></p>




            </div>
            <div className={'buttons'}>

                <Button
                    color="#2d4492"
                    value='Novo'
                    click={() => limpar(false)}
                />
                <Button
                    color="#447461"
                    value='Cadastrar'
                    click={() => insertA(idC, project, unidade, user)}
                />
                <Button
                    color="#474747"
                    value='Voltar'
                    click={() => handleCloseModal(1)}
                />
                <Button
                    color="#8f2828"
                    value='Excluir'
                    click={() => deleteA(project, unidade, user)}
                />
                <Button
                    color="#6c388f"
                    value='Bloquear'
                    click={() => fecharA(project, unidade, user)}
                />

            </div>
        </form>
    )
} export default InputDay