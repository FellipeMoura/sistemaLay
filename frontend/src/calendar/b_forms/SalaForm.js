import { useState, useEffect } from 'react'
import { InputDate, InputText, Button, InputTime } from '../d_inputs/Input'
import './SalaForm.css'
import { insertSala, deleteSala } from '../f_aux/functions'
import { getColor } from '../c_layouts/salaColor'
import moment from 'moment'
import { MdOutlineDelete, MdLibraryAdd } from 'react-icons/md'
import { AiOutlineEdit } from 'react-icons/ai'
import { TbCalendarTime } from 'react-icons/tb'
import { CgArrowsExchangeAlt } from 'react-icons/cg'
import Modal from 'react-modal'

function SalaForm({ setIsEdit, unidade, setCurrentFormat, dataCard, clients, user }) {
    const [project, setProject] = useState({ qnt: 1 })
    const [alter, setAlter] = useState({})
    const [salas, setSalas] = useState([])
    const [sala, setSala] = useState({})
    const [unid, setUnid] = useState(0)
    const [refresh, setRefresh] = useState({})
    const unidades = [
        'Geral',
        'Matriz',
        'Erro',
        'Goiânia Shoping',
        'Orion',
        'Campinas'
    ]

    const [modalIsOpen, setIsOpen] = useState(false)
    const customStyles = {
        content: {
            left: '50%',
            top: '50%',
            bottom: '0%',
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

    function handleOpenModal(value) {
        setSala(value)
        setIsOpen(true)
    }


    useEffect(() => {
        //console.log(unidade)
        fetch(`${process.env.REACT_APP_CALENDAR}/buscarSalas/${unidade}`, {
            method: "GET",
            heders: {
                'Content-type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((resp2) => {

                setSalas(resp2)
                //console.log(resp2)
            })
            .catch(err => console.log(err))



    }, [refresh])


    function handleChange(e) {
        setProject({ ...project, [e.target.name]: e.target.value })
        //  console.log(project)


    }
    function alterChange(e) {
        setAlter({ ...alter, [e.target.name]: e.target.value })
        console.log(alter)


    }

    function setUnid2(value) {
        let unidd = unid === 0 ? unidade : 0
        setUnid(unidd)
        value ?
            setProject({ ...project, ['unidade']: unidd })
            : setAlter({ ...project, ['unidade']: unidd })

    }

    function insertSala(cadastro) {

        (fetch(`${process.env.REACT_APP_CALENDAR}/insertSala`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(cadastro),
        })
            .then((resp) => resp.json()).then((data) => {
                window.alert('Cadastrado!')
                setRefresh(cadastro)
            })
            .catch(err => console.log(err)))
    }

    function alterarSala(sala, setRowState) {
        fetch(`${process.env.REACT_APP_CALENDAR}/alterarSala`, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(sala),
        })
            .then(() => {
                setRowState(0)
                setRefresh(sala.id)


            })
            .catch(err => console.log(err))
    }

    function SalaGrid({ sala, setRowState }) {
        // console.log(sala)
        return (
            <tr
                key={sala.id}
                id=""
                className=''


            >
                <td >

                    {sala.id}

                </td>
                <td style={{ width: `300px`, backgroundColor: getColor(sala.id) }}>
                    {sala.nome || '-'}

                </td>

                <td >

                    {sala.qnt || '-'}

                </td>
                <td >

                    {sala.duracao || '-'}

                </td>
                <td >

                    {unidades[sala.unidade]}

                </td>
                <td className='dele2' onClick={() => setRowState(1)} >

                    <AiOutlineEdit />

                </td >
                <td className='offSala' onClick={() => handleOpenModal(sala)} >

                    <TbCalendarTime />

                </td >
            </tr>
        )
    }

    function SalaInput({ sala, setRowState }) {

        const [project, setProject] = useState(sala)

        function handleChange(e) {
            setProject({ ...project, [e.target.name]: e.target.value })



        }



        return (
            <tr
                key={sala.id}
                id=""
                className=''


            >
                <td >



                </td>
                <td style={{ width: `300px`, backgroundColor: getColor(sala.id) }}>
                    <InputText
                        name='nome'
                        value={project.nome}
                        handleOnChange={handleChange}
                        width='99%'
                    />

                </td>

                <td >

                    <InputText
                        width='99%'
                        name="qnt"
                        value={project.qnt || ''}
                        handleOnChange={handleChange}
                        required
                    />

                </td>
                <td >

                    <InputText
                        width='99%'
                        name="duracao"
                        value={project.duracao || ''}
                        handleOnChange={handleChange}
                        required
                    />

                </td>


                <td >
                    {project.unidade}

                </td>
                <td className='dele2' onClick={() => setRowState(1)} >

                    <Button
                        color='#0f41ad'
                        value='Salvar'
                        click={() => alterarSala(project, setRowState)}
                    />

                </td >
            </tr>
        )
    }


    function SalaCard({ sala }) {

        const [rowState, setRowState] = useState(0)

        const row = [<SalaGrid sala={sala} setRowState={setRowState} />,
        <SalaInput sala={sala} setRowState={setRowState} />]



        return (

            row[rowState]

        )

    }


    function Block({sala}) {

        const [project, setProject] = useState({
            sala: sala.id,
            nome_procedimento: sala.nome,
            user: user,
            unidade: unidade,
            data: moment().format('YYYY-MM-DD'),
            data_fim: moment().format('YYYY-MM-DD'),
            hora: '08:00',
            hora_fim: '22:00',
            nota: ''
        })

        function bloquear() {
            fetch(`${process.env.REACT_APP_CALENDAR}/insertBlockSala`, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(project),
            })
                .then((resp) => resp.json()).then((data) => {

                    window.alert(`Bloqueado`)
                    handleCloseModal()

                })
                .catch(err => console.log(err))
        }
        function handleChange(e) {
            
            
            if (project.data === project.data_fim && e.target.name === 'hora' && project.hora_fim < e.target.value) {

                window.alert('O horário de início deve ser anterior ao final ')

            } else if (project.data === project.data_fim && e.target.name === 'hora_fim' && e.target.value < project.hora) {

                window.alert('O horário final deve ser posterior ao de início ')


            }else{


            if (e.target.name === 'data' && project.data_fim < e.target.value) {

                setProject({ ...project, ['data']: e.target.value, ['data_fim']: e.target.value })

            } else if (e.target.name === 'data_fim' && e.target.value < project.data) {

                setProject({ ...project, ['data']: e.target.value, ['data_fim']: e.target.value })


            } else {
                setProject({ ...project, [e.target.name]: e.target.value })
            }
        }
        }
        return (
            <div style={{ backgroundColor: '#ddd', padding: '5px 5px 2px 5px' }}>
                <div className="inline1">
                    <InputDate

                        name='data'
                        title="De: "
                        value={project.data}
                        handleOnChange={handleChange}
                    />
                    <InputTime

                        name='hora'

                        value={project.hora}
                        handleOnChange={handleChange}
                    />

                </div>
                <div className="inline1">
                    <InputDate

                        name='data_fim'
                        title='Até'
                        value={project.data_fim}
                        handleOnChange={handleChange}
                    />
                    <InputTime

                        name='hora_fim'

                        value={project.hora_fim}
                        handleOnChange={handleChange}
                    />
                </div>
                <InputText
                    flex='column'
                    name='nota'
                    width='400px'
                    title='Justificativa: '
                    value={project.nota}
                    handleOnChange={handleChange}
                />
                <div className="inlineButton">

                    <Button
                        value='Bloquear'
                        color='#961414'
                        click={() => bloquear()}
                    />
                    <Button
                        value='Voltar'
                        color='#222'
                        click={() => handleCloseModal()}
                    />
                </div>


            </div>
        )
    }
    //console.log(project)
    return (

        <form className='salaForm'>
            <Modal
                ariaHideApp={false}
                isOpen={modalIsOpen}
                onRequestClose={handleCloseModal}
                style={customStyles}
            >
                <Block
                    sala={sala}
                />
            </Modal>
            <div className='inputForm'>

                <h1>Salas unidade {unidade}</h1>

                <div className="cPanel">
                    <div className='tableContainer3'>
                        <table >
                            <thead>
                                <tr className=''>
                                    <th className='' style={{ width: '10%' }}>id</th>
                                    <th className='' style={{ width: '65%' }}>Nome</th>
                                    <th className='' style={{ width: '10%' }}>Qnt</th>
                                    <th className='' style={{ width: '10%' }}>Tempo</th>
                                    <th className='' style={{ width: '12%' }}>Unid</th>

                                    <th className='' style={{ width: '5%' }}><CgArrowsExchangeAlt /></th>
                                    <th className='' style={{ width: '5%' }}>Bloquear</th>
                                </tr>
                            </thead>
                            <tbody className='tbody3'>
                                <tr>
                                    <td >



                                    </td>
                                    <td style={{ width: `300px` }}>
                                        <InputText
                                            width='98%'
                                            placeholder='Insira o nome da sala...'
                                            value={project.nome || ''}
                                            name='nome'
                                            handleOnChange={handleChange}

                                        />

                                    </td>

                                    <td >


                                        <InputText
                                            width='98%'
                                            name="qnt"
                                            value={project.qnt || ''}
                                            handleOnChange={handleChange}
                                            required
                                        />

                                    </td>
                                    <td >


                                        <InputText
                                            width='98%'
                                            name="duracao"
                                            value={project.duracao || ''}
                                            handleOnChange={handleChange}
                                            required
                                        />

                                    </td>
                                    <td >
                                        <Button
                                            color='#438ec0'
                                            value={unidades[unid]}
                                            click={() => setUnid2(true)}
                                        />


                                    </td>

                                    <td className='add2'>
                                        <Button
                                            color='#b4b4b400'

                                            click={() => insertSala(project, unidade, user)}
                                            value={<MdLibraryAdd />}
                                        />
                                    </td>
                                    <td></td>
                                </tr>
                                {salas.map(sala =>

                                    <SalaCard sala={sala} />
                                )}
                            </tbody>
                        </table>
                    </div>


                </div>

            </div>
            <div className={'buttons'}>

                <Button
                    color="#474747"
                    value='Voltar'
                    click={() => setCurrentFormat(1)}
                />

            </div>
        </form>
    )
} export default SalaForm