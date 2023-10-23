import React, { useState, useMemo, useEffect } from 'react';
import styles from './SBar.module.css'
import { AiOutlineEdit } from 'react-icons/ai'
import Modal from 'react-modal'
import { InputText } from './Input';


export default function SubBar(props) {
    const [search, setSearch] = useState('');
    const [procs, setProcs] = useState([{ nome: '', id: '' }])


    useEffect(() => {
        fetch(`${process.env.REACT_APP_CALENDAR}/buscarProcs`, {
            method: "GET",
            heders: {
                'Content-type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((resp2) => {
                //console.log(resp2)
                setProcs(resp2)


            })
            .catch((err) => { return err })

    }, []);


   function setEdit() {
        props.setProject({ ...props.project, ['procedimento']: '', ['id_procedimento']: '' })
    }

    function editName(item) {
        props.setProject({ ...props.project, ['procedimento']: item.nome, ['id_produto']: item.id })
        handleCloseModal()
        
    }
    const customStyles = {
        content: {
            left: '50%',
            top: '50%',
            bottom: '-40%',
            right: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',

            //height: '400px'

        }
    }

    const [modalIsOpen, setIsOpen] = useState(false)

    function handleCloseModal() {
        setIsOpen(false)

    }

    function handleOpenModal() {

        setIsOpen(true)
    }

    const results = useMemo(() => {
        const lowerBusca = search.toLowerCase()
        return procs.filter(proc => (proc.nome.toLowerCase().includes(lowerBusca)));
    }, [search, procs])
    return (
        <div className={styles.formContainer3}>
            <Modal
                ariaHideApp={false}
                isOpen={modalIsOpen}
                onRequestClose={handleCloseModal}
                style={customStyles}
            >
                 <div className='modalProcs'>
                    
                <div className={styles.header3}>

                    <InputText
                        flex='column'
                        width='28em'
                    
                        placeholder="Pesquisar procedimento..."
                        handleOnChange={(e) => setSearch(e.target.value)}
                    />


                </div>

                <ListItem
                    editName={editName}
                    handleChange={props.handleChange}
                    className={styles.tab}
                    results={results}
                    search={search}

                />
            </div>
            </Modal>

            <label className="hover" onClick={() => handleOpenModal()}><AiOutlineEdit />{ props.project.procedimento} </label>



        </div>
    );
}

function ListItem({ editName, results, search, handleChange }) {

    return (


        search.length > 1 ?
            <div className={styles.ulContainer}>

                <table >


                    {results.map((result, index) => (

                        <tr
                            key={index} onClick={()=>editName(result)}

                            className={styles.trClient}

                        //value={results.indexOf(result)}

                        >
                            <td style={{ marginLeft: '20px', width: `25em` }}>
                                {result.nome || '-'}

                            </td>

                            <td style={{ width: `3em` }}>

                                {result.id || '-'}

                            </td>
                        </tr>



                    ))}

                </table>
            </div>
            : ''


    );
}