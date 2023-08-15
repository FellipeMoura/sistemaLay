import { useState } from 'react'
import { Select, InputText, InputDate, InputMasks, Button, InputTime } from '../d_inputs/Input'
import './InputDay.css'
import RBar from './RBar'
import { insertB, deleteA, fecharA } from '../f_aux/functions'
import moment from 'moment'
import { ProcList } from './ProcList'


function InputDay({ unidade, setCurrentFormat,dataCard, clients, user, setIsEdit }) {

    const [project, setProject] = useState(dataCard)
    const [currentName, setCurrentName] = useState(dataCard.nome_cliente ? 0 : 1)
    const [currentProc, setCurrentProc] = useState(project.procedimento ? 0 : 1)
    const [currentSala, setCurrentSala] = useState(project.sala ? 0 : 1)
    const [options, setOptions] = useState([])
    const [idC, setIdC] = useState(dataCard.id)

    // console.log(params)


    const sala = [
        { id: 0, nome: 'Camuflagem de estrias' },
        { id: 1, nome: 'Endermo Glúteo' },
        { id: 2, nome: 'Carboxterapia' },
        { id: 3, nome: 'Criofrequência + Ultracavitação' },
        { id: 4, nome: 'Criolipólise' },
        { id: 5, nome: 'Dermapen' },
        { id: 6, nome: 'Estimulação Russa' },
        { id: 7, nome: 'Heccus' },
        { id: 8, nome: 'Hidrolipoclasia' },
        { id: 9, nome: 'Limpeza Completa + Limpeza Simples' },
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
        { id: 24, nome: ' Laser Lavieen' }
    ]

    function handleChange(e) {
        setProject({ ...project, [e.target.name]: e.target.value })
        setCurrentName(0)
    }
    function handleChange2(e) {
        setProject({ ...project, [e.target.name]: e.target.value })
    }

    function limpar(x){

        if(x && idC > 0){window.alert('Exclua este registro primeiro.')}else{
        
        setProject({ ...project, ['nome_cliente']: '' }) 
        setCurrentName(1) 
        setCurrentProc(1) 

        }
        !x?setIdC(0):console.log('ok')

    }

    const labelName = (
        <div className='labelName'>
            <p>Cliente: <label >{project.nome_cliente}
                <button
                    type='button'
                    onClick={() => limpar(true)}
                >
                    Limpar
                </button>
            </label></p>
        </div>
    )
    const labelProc = (
        <div>
            <p>Procedimento: <label> {project.nome_procedimento}</label></p>
        </div>
    )

    const labelSala = (
        <div>
            <p>Aparelho: <label> {sala[project.sala] ? sala[project.sala].nome : ''}</label></p>
        </div>

    )
    function setName(e) {
        setProject({ ...project, ['id_cliente']: e.id, ['nome_cliente']: e.nome, ['telefone']:e.telefone })
        setCurrentName(0)
        console.log(e)
        

    }
    function setProc(e) {
        setProject({ ...project, ['nome_procedimento']: options[e].nome, ['procedimento']: options[e].id_pacote })
        
        setCurrentProc(0)
      //console.log(options)

    }
    function setSala(e) {
        const sala = e.target.value
        fetch(`${process.env.REACT_APP_CALENDAR}/disp/${project.data.substr(0, 10)}/${project.hora}/${e.target.value}`, {
            method: "GET",
            heders: {
                'Content-type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((resp2) => {
                if (resp2) {
                    window.alert(`Sala reservada para ${resp2[0].atendente}`)
                } else {
                    setProject({ ...project, [e.target.name]: sala })
                    setCurrentSala(0)
                   // console.log(project)
                }
            })
            .catch(err => console.log(err))


    }

    function transferir(){
        setCurrentFormat(1)
        setIsEdit(project)
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

   

   // console.log(project)
    return (
        <form className='form'>



            <div className='inputForm'>
                <h1>Novo Agendamento</h1>
                {nameStates[currentName]}
                <p>Data:<label> {project.data && project.data.substr(0, 10).split('-').reverse().join('/')}</label></p>
                <p>Atendente: <label>{project.atendente}</label></p>
                {procStates[currentProc]}
                
                <div className='inline2'>               
                <p>início:<label>{project.hora}</label></p>
                    
                <p>Fim:<label>{project.hora_fim || moment(`2020.05.05 ${project.hora}`).add(40,'minutes').format('HH:mm')}</label>
                        </p>
                    

                </div> 



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
                    click={() => insertB(idC, project, unidade, user,)}
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