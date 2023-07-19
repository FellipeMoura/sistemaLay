import React, {useState, useMemo } from 'react';
import ListItem from './ListItem'
import styles from './SBar.module.css'
import Modal from 'react-modal'
import {AiOutlineSearch} from 'react-icons/ai'
//import {Link} from 'react-router-dom'
import CreateForm from '../b_forms/CreateUser';
import {Button} from '../d_inputs/Input';




function RBar(props) {
    const [search, setSearch] = useState('');
        
    const[modalIsOpen, setIsOpen] =useState(false)

    function handleOpenModal(){
        setIsOpen(true)
    }

    function handleCloseModal(){
        setIsOpen(false)
    }

    const customStyles = {
        content: {
            left: '50%',
            top:'50%',
            bottom: '-40%',           
            right:'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',

        }
    }
    
    const results = useMemo(() =>{
        const lowerBusca = search.toLowerCase()
        return props.users.filter(user =>( user.name.toLowerCase().includes(lowerBusca.toLowerCase())));
    },[search])
    return (
        <div className={styles.formContainer2}>
            <div className={styles.header}>
                <AiOutlineSearch/>
                <input
                    type="text"
                    placeholder="Pesquisar paciente..."
                    onChange={(e)=>setSearch(e.target.value)}
                />
                <Button
                color = '#447461'
                value='Cadastrar'
                click={handleOpenModal}
                />
                
            </div>                                     
                
            <ListItem 
            className={styles.tab}
            users={results}
            search={search}
            />

            <Modal
            isOpen={modalIsOpen}
            onRequestClose={handleCloseModal}
            style={customStyles}
        >
        <CreateForm handleCloseModal={handleCloseModal}></CreateForm>
        </Modal>
        </div>
    );
}

export default RBar;