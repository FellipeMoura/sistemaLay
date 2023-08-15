import { useState, useEffect } from 'react'
import { Select, InputText, Button, InputTime } from '../d_inputs/Input'
import './SalaForm.css'
import { insertSala, deleteSala } from '../f_aux/functions'

import moment from 'moment'
import { MdOutlineDelete, MdLibraryAdd } from 'react-icons/md'

import { CgArrowsExchangeAlt } from 'react-icons/cg'


function SalaForm({ setIsEdit, unidade, setCurrentFormat, dataCard, clients, user }) {
    const [project, setProject] = useState({qnt:1})
    const [alter, setAlter] = useState({})
    const [salas, setSalas] = useState([])
    const [unid, setUnid] = useState(0)
    const unidades = [
        'Geral',
        'Matriz',
        'Erro',
        'Goiânia Shoping',
        'Orion',
        'Campinas'
    ]
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
                console.log(resp2)
            })
            .catch(err => console.log(err))



    }, [])


    function handleChange(e) {
        setProject({ ...project, [e.target.name]: e.target.value })
      //  console.log(project)


    }
    function alterChange(e) {
        setAlter({ ...alter, [e.target.name]: e.target.value })
        console.log(alter)


    }

    function setUnid2(value){
        let unidd = unid === 0? unidade:0
        setUnid(unidd)
        value?
        setProject({ ...project, ['unidade']: unidd })
        : setAlter({ ...project, ['unidade']: unidd })

    }


    //console.log(project)
    return (
        <form className='form'>



            <div className='inputForm'>

                <h1>Salas unidade {unidade}</h1>

                <div className="cPanel">


                    <div className='tableContainer3'>
                        <table >
                            <thead>
                                <tr className=''>
                                    <th className='' style={{ width: '65%' }}>Nome</th>
                                    <th className='' style={{ width: '8%' }}>Qnt</th>
                                    <th className='' style={{ width: '12%' }}>Unid</th>
                                    <th className='' style={{ width: '5%' }}><CgArrowsExchangeAlt /></th>

                                </tr>
                            </thead>
                            <tbody className='tbody3'>
                                <tr>
                                    <td style={{ marginLeft: '20px', width: `300px` }}>
                                        <InputText
                                            width='100%'
                                            placeholder='Insira o nome da sala...'
                                            value={project.nome || ''}
                                            name='nome'
                                            handleOnChange={handleChange}

                                        />

                                    </td>

                                    <td >


                                        <InputText
                                            width='100%'
                                            name="qnt"
                                            value={project.qnt || ''}
                                            handleOnChange={handleChange}
                                            required
                                        />

                                    </td>
                                    <td >
                                        <Button
                                            color='#438ec0'
                                            value={unidades[unid]}
                                            click={()=> setUnid2(true)}
                                        />


                                    </td>

                                    <td className='add2'>
                                        <Button
                                            color='#b4b4b400'

                                            click={()=> insertSala(project, unidade, user)}
                                            value={<MdLibraryAdd />}
                                        />
                                    </td>
                                </tr>
                                {salas.map(sala =>

                                    <tr
                                        key={sala.id} onClick=''
                                        id=""
                                        className=''


                                    >
                                        <td style={{ marginLeft: '20px', width: `300px` }}>
                                            {sala.nome || '-'}

                                        </td>

                                        <td >

                                            {sala.qnt || '-'}

                                        </td>
                                        <td >

                                            {unidades[sala.unidade]}

                                        </td>
                                        <td className='dele2' >


                                            <button disabled
                                                
                                                onClick={()=> deleteSala(sala.id, unidade, user)}
                                            ><MdOutlineDelete /></button>
                                        </td >
                                    </tr>

                                )}
                            </tbody>
                        </table>
                    </div>
                </div>






            </div>
            <div className={'buttons'}>



                <Button
                    color="#447461"
                    value='Salvar'
                 
                />


                <Button
                    color="#474747"
                    value='Voltar'
                    click={() => setCurrentFormat(1)}
                />

            </div>
        </form>
    )
} export default SalaForm