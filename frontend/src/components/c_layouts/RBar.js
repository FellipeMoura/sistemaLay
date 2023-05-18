import React, {useState } from 'react';
import ListItem from './ListItem'
import styles from './SBar.module.css'
import Modal from 'react-modal'
import {AiOutlineSearch} from 'react-icons/ai'
//import {Link} from 'react-router-dom'
import CreateForm from '../b_forms/CreateUser';
import {Button} from '../d_inputs/Input';



function RBar(props) {
    const [search, setSearch] = useState('');
    //const [recordsFilter, setRecordsFilter] = useState([])
    const [userFilter, setUserFilter] = useState([])
    
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
    
    //const [user, setUser] = useState({});




  /*  function handleOnSubmit(event) {
        event.preventDefault();
        setSearch(event.target.value);
        console.log(props.records.name)
        const results = props.records.filter(record =>( record.name.toLowerCase().indexOf(search)) !== -1);
        setRecordsFilter(results);
    }*/

    function handleOnSubmit(event) {
        event.preventDefault();
        setSearch(event.target.value);
        const results = props.users.filter(user =>( user.name.toLowerCase().indexOf(search)) !== -1);
        setUserFilter(results);
    }
    return (
        <div className={styles.formContainer2}>
            <div className={styles.header}>
                <AiOutlineSearch/>
                <input
                    type="text"
                    placeholder="Pesquisar paciente..."
                    onChange={handleOnSubmit}
                />
                <Button
                color = '#447461'
                value='Cadastrar'
                click={handleOpenModal}
                />
                
            </div>                                     
                
            <ListItem 
            className={styles.tab}
            users={userFilter}
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