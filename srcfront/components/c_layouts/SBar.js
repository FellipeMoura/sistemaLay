import React, { useState } from 'react';
import ListItem from './ListItem'
import styles from './SBar.module.css'
import CreateForm from '../b_forms/CreateUser';
import Modal from 'react-modal'
import { AiOutlineSearch, AiOutlineUserAdd } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import EditForm from '../b_forms/EditUser';



function SBar(props) {
  const [search, setSearch] = useState('');
  const [userFilter, setUserFilter] = useState([])
  const [id, setId] = useState('');

  //const [user, setUser] = useState({});

  const [modalIsOpen, setIsOpen] = useState(false)
  const [modalIsOpenE, setIsOpenE] = useState(false)


  function deletePost(id) {


    fetch(`${process.env.REACT_APP_BACKEND}delete/${id}`, {
      method: "DELETE",
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((resp) => resp.json()).then((data) => {
        //console.log(data);
        window.location.replace("/pacientes")

        //redirect
      })
      .catch(err => console.log(err))
  }

  function handleOpenModal() {
    setIsOpen(true)
  }

  function handleCloseModal() {
    setIsOpen(false)
  }
  function handleOpenModalE() {
    setIsOpenE(true)
  }

  function handleCloseModalE() {
    setIsOpenE(false)
  }

  const customStyles = {
    content: {
      left: '50%',
      top: '50%',
      bottom: '-40%',
      right: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',

    }
  }

  function handleOnSubmit(event) {
    event.preventDefault();
    setSearch(event.target.value);
    const results = props.users.filter(user => (user.name.toLowerCase().indexOf(search)) !== -1);
    setUserFilter(results);
  }

  return (
    <div className={styles.formContainer}>
      <div className={styles.header}>
        <AiOutlineSearch />
        <input
          type="text"
          placeholder="Pesquisar paciente..."
          aria-label="Pesquisar cadastro..."
          onChange={handleOnSubmit}
        />

        <Link className={styles.btn} onClick={handleOpenModal}>
          <AiOutlineUserAdd />
          <span>Cadastrar</span>
        </Link>


      </div>

      <ListItem
        handleOpenModalE={handleOpenModalE}
        setId={setId}
        users={userFilter}
      />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        style={customStyles}
      >
        <CreateForm handleCloseModal={handleCloseModal}></CreateForm>
      </Modal>
      <Modal
        isOpen={modalIsOpenE}
        onRequestClose={handleCloseModalE}
        style={customStyles}
      >
        <EditForm deletePost={deletePost} id={id} handleSubmit={editPost}></EditForm>
      </Modal>
    </div>
  );
}

export default SBar;