import React, { useState, useMemo, useEffect } from 'react';
import styles from './SBar.module.css'
import Modal from 'react-modal'
import { CiSearch } from 'react-icons/ci'
import { Button, InputText } from '../d_inputs/Input';


export default function RBar(props) {
    const [search, setSearch] = useState('');
    const [procs, setProcs] = useState([{ nome: '', id: '' }])

    function editName(item) {
        props.setProject({ ...props.project, ['id_produto']: item.id, ['nome']: item.nome })
        console.log(props.project)
    }
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
    const results = useMemo(() => {
       
        const lowerBusca = search.toLowerCase()
        return procs.filter(user => user.nome? (user.nome.toLowerCase().includes(lowerBusca)) : '')
  
        
    }, [search])
    return (
        <div className='inputClients'>
            <div className={styles.header3}>
            <CiSearch/>
                <input
                type='text'
                placeholder="Pesquisar procedimento..."
                onChange={(e) => setSearch(e.target.value)}
                
            />
           

            </div>

            <ListItem
            editName={editName}
                setCliente={props.setCliente}
                 className={styles.tab}
                users={results}
                search={search}
                   />

        </div>
    );
}

function ListItem({ users, search, setCliente, getProcs, handleChange, editName }) {



    return (


        search.length > 1 ?
            <div className='listClients'>

                <table >


                    {users.map(user => (

                        <tr
                            key={user.id} onClick={() => editName(user)}
                            id="idUser"
                            className={styles.trClient}
                            // type='button'
                           
                        //value={users.indexOf(user)}

                        >
                            <td style={{ marginLeft: '20px', width: `280px` }}>
                                {user.nome || '-'}

                            </td>

                            <td style={{ width: `100px` }}>

                                {user.id || '-'}

                            </td>
                        </tr>



                    ))}

                </table>
            </div>
            : ''


    );
}