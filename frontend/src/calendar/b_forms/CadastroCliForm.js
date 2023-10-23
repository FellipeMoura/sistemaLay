import { useState, useEffect } from 'react'
import styles from './UserForm.module.css'
import { InputMasks, Button, InputText } from '../d_inputs/Input'
import { GiCheckMark } from 'react-icons/gi'
import Modal from 'react-modal'
import VendasForm from './VendasForm'
export default function CadastroCliForm({ id, cliente, confirm, setConfirm, user, unidade }) {

    const [cliente2, setCliente2] = useState({})
    const [vendas, setVendas] = useState([])
    //console.log(user)
    const [project, setProject] = useState(cliente)

    function handleChange(e) {
        setProject({ ...project, [e.target.name]: e.target.value })
        console.log(project)
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


    function editPost() {

        let project2 = project
        project2.telefone = project.telefone.replace(/[^0-9]/g, '')


        fetch(`${process.env.REACT_APP_CALENDAR}/alterarAcompanhamento`, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(project2),
        })
            .then((resp) => resp.json()).then((resp2) => {
                //console.log(data);
                //window.alert("Cadastrado alterado!")
                if (resp2) {
                    setCliente2(resp2)

                    fetch(`${process.env.REACT_APP_CALENDAR}/getVendas/${resp2.id}`, {
                        method: "GET",
                        heders: {
                            'Content-type': 'application/json',
                        },
                    })
                        .then((resp) => resp.json())
                        .then((resp2) => {
                            if(resp2.vendas0.length > 0 || resp2.vendas1.length > 0 ){

                                setVendas(resp2)
                                handleOpenModal()
                            }else{ 
                                let resp = window.confirm(`Telefone já cadastrado no sistema! nome: ${cliente2.nome}, id: ${cliente2.id} deseja cancela-lo?`)
                                if(resp){
                                    zerar()
                                    fetch(`${process.env.REACT_APP_CALENDAR}/alterarAcompanhamento`, {
                                        method: "PUT",
                                        headers: {
                                            'Content-type': 'application/json',
                                        },
                                        body: JSON.stringify(project2),
                                    })
                                        .then((resp) => resp.json()).then((resp2) => {
                                            console.log(resp2);
                                            //window.alert("Cadastrado alterado!")
                                            
                            
                                        })
                                        .catch(err => console.log(err))
                                }
                            }
                        })
                        .catch(err => console.log(err))

                } else {
                    window.alert('Cadastro alterado')
                }

            })
            .catch(err => console.log(err))

    }
    function zerar(){
        fetch(`${process.env.REACT_APP_CALENDAR}/agruparCadastros/${cliente2.id}`, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json',
            }
        })
            .then((resp) => resp.json()).then((data) => {
                editPost()
                
            })
            .catch(err => console.log(err))
    }
    function agrupar(){
        fetch(`${process.env.REACT_APP_CALENDAR}/agruparCadastros/${cliente.id}/${cliente2.id}`, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json',
            }
        })
            .then((resp) => resp.json()).then((data) => {
                setProject(cliente)
                window.alert('Agrupado!')
                handleCloseModal()
                
            })
            .catch(err => console.log(err))
    }

    function setConf() {


        fetch(`${process.env.REACT_APP_CALENDAR}/updateEnvio/${cliente.id}/${confirm == 0 ? 1 : 0}`, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json',
            }
        })
            .then((resp) => resp.json()).then((data) => {
                // window.alert(`Alterado!`)
                setConfirm(confirm == 0 ? 1 : 0)
            })
            .catch(err => console.log(err))


    }

    return (
        <form className={styles.form}>

            <Modal
                ariaHideApp={false}
                isOpen={modalIsOpen}
                onRequestClose={handleCloseModal}
                style={customStyles}
            >
                <VendasForm
                    agrupar={agrupar}
                    unidade={unidade}
                    user={user}
                    cliente={cliente2}
                    vendas={vendas}
                    setVendas={setVendas}
                />
            </Modal>
            <div className={styles.steps}>
                <div className={styles.step}>
                    <InputText
                        flex='column'
                        width='25em'
                        title="Nome"
                        name="nome"
                        value={project.nome}
                        placeholder="Insira o nome do paciente..."
                        handleOnChange={handleChange}
                    />

                </div>
                <div className={styles.step}>
                    <InputMasks
                        flex='column'
                        mask='2'
                        title="Telefone"
                        name="telefone"
                        value={project.telefone}
                        placeholder="Insira o telefone do paciente..."
                        handleOnChange={handleChange}
                    />

                </div>
            </div>
            <div className='labelConfirm'>
                Habilitar mensagem de confirmação:
                <div onClick={() => setConf()}>
                    {confirm == 1 && <GiCheckMark />}
                </div>
            </div>
            <div className={styles.steps}>
                <Button
                    color='#213e6d'
                    value='Alterar'
                    click={() => editPost(id, project)}

                />

            </div>

        </form>
    )
}