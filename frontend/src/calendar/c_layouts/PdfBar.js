import React, { useState, useMemo } from 'react';
import styles from './SBar.module.css'
import Modal from 'react-modal'
import { AiOutlineSearch } from 'react-icons/ai'
import { Button, InputText } from '../d_inputs/Input';


export default function PdfBar(props) {
    const [search, setSearch] = useState('');

    function setSearch2(e) {
       // console.log(results)
        setSearch(e)
    }


    const results = useMemo(() => {
        const lowerBusca = search.toLowerCase()
        return props.clients.filter(user => (user.nome_cliente.toLowerCase().includes(lowerBusca) || user.telefone.includes(lowerBusca)));
    }, [search, props.clients])
    return (
        <div className={styles.formContainer22}>
            <div className={styles.header2}>
                <AiOutlineSearch />
                <InputText

                    width='400px'
                    placeholder="Pesquisar cliente..."
                    handleOnChange={(e) => setSearch2(e.target.value)}
                />
            </div>

            <ListItem
                
                setName={props.setName}
                setCurrentName={props.setCurrentName}
                handleChange={props.handleChange}
                className={styles.tab}
                users={results}
                search={search}
                setOptions={props.setOptions}
            />

        </div>
    );
}

function ListItem({ users, search, setOptions, setCurrentName, handleChange, setName }) {

    function clickName(index) {
        setName(users[index])
       

    }
    return (


        search.length > 1 ?
            <div className={styles.ulContainer}>

                <table >


                    {users.map(user => (

                        <tr
                            key={user.id_cliente} onClick={() => clickName(users.indexOf(user))}
                            id="idUser"
                            className={styles.trClient}
                            // type='button'
                            name={user.telefone}
                        //value={users.indexOf(user)}

                        >
                            <td style={{ marginLeft: '20px', width: `300px` }}>
                                {user.nome_cliente || '-'}

                            </td>

                            <td style={{ width: `200px` }}>

                                {user.telefone || '-'}

                            </td>
                        </tr>



                    ))}

                </table>
            </div>
            : ''


    );
}