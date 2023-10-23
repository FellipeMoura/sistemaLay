import React, { useState, useMemo, useEffect } from 'react';
import styles from './SBar.module.css'
import Modal from 'react-modal'
import { CiSearch } from 'react-icons/ci'
import { Button, InputText } from '../d_inputs/Input';


export default function RBar(props) {
    const [search, setSearch] = useState('');
   
    const results = useMemo(() => {
       
        const lowerBusca = search.toLowerCase()
        return props.clients.filter(user => user.nome? (user.nome.toLowerCase().includes(lowerBusca) || user.telefone.includes(lowerBusca)) : '');
  
        
    }, [search])
    return (
        <div className='inputClients'>
            <div className={styles.header3}>
            <CiSearch/>
                <input
                type='text'
                placeholder="Pesquisar cliente..."
                onChange={(e) => setSearch(e.target.value)}
                
            />
           

            </div>

            <ListItem
                setCliente={props.setCliente}
                 className={styles.tab}
                users={results}
                search={search}
                   />

        </div>
    );
}

function ListItem({ users, search, setCliente, getProcs, handleChange, setName }) {



    return (


        search.length > 1 ?
            <div className='listClients'>

                <table >


                    {users.map(user => (

                        <tr
                            key={user.id} onClick={() => setCliente(user)}
                            id="idUser"
                            className={styles.trClient}
                            // type='button'
                            name={user.telefone}
                        //value={users.indexOf(user)}

                        >
                            <td style={{ marginLeft: '20px', width: `280px` }}>
                                {user.nome || '-'}

                            </td>

                            <td style={{ width: `100px` }}>

                                {user.telefone || '-'}

                            </td>
                        </tr>



                    ))}

                </table>
            </div>
            : ''


    );
}