import React, { useState, useMemo, useEffect } from 'react';
import styles from './SBar.module.css'
import Modal from 'react-modal'
import { AiOutlineSearch } from 'react-icons/ai'
import { Button, InputText } from '../d_inputs/Input';


export default function RBar(props) {
    const [search, setSearch] = useState('');
    const [last, setLast] = useState({})


    useEffect(() => {
        fetch(`${process.env.REACT_APP_CALENDAR}/buscarUltimo/${props.unidade}`, {
            method: "GET",
            heders: {
                'Content-type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((resp2) => {

                setLast(resp2)


            })
            .catch((err) => { return err })

    }, []);

    function lastName(e) {
        props.setName2(e)
        //console.log(index)
        getProcs(e.id_cliente)

    }

    function setSearch2(e){
           // console.log(results)
            setSearch(e)
    }

    function getProcs(id) {



        fetch(`${process.env.REACT_APP_CALENDAR}/procs/${id}`, {
            method: "GET",
            heders: {
                'Content-type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((resp2) => {
                props.setOptions(resp2)
                console.log(resp2)

            })
            .catch(err => console.log(err))
    }


    const results = useMemo(() => {
        const lowerBusca = search.toLowerCase()
        return props.clients.filter(user => (user.nome.toLowerCase().includes(lowerBusca)|| user.telefone.includes(lowerBusca)));
    }, [search,props.clients])
    return (
        <div className={styles.formContainer2}>
            <div className={styles.header}>
                <AiOutlineSearch />
                <InputText
                    flex='column'
                    width='28em'
                    placeholder="Pesquisar cliente..."
                    handleOnChange={(e) => setSearch2(e.target.value)}
                />
                <button                
                    onClick={()=>lastName(last)}
                >Último</button>
               
            </div>

            <ListItem
                getProcs={getProcs}
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

function ListItem({ users, search, setOptions, getProcs, handleChange, setName }) {

    //const [id, setId] = useState('');

    

    function clickName(index) {
        setName(users[index])
        //console.log(index)
        getProcs(users[index].id)

    }



   // document.querySelectorAll("#idUser").forEach(function (td) {

  //      td.addEventListener("click", function (e) {
 //           let teste = e.target
 //           getProcs(e.target.className)
  //          setName(e)



  //      });

 //   });


    return (


        search.length > 1 ?
            <div className={styles.ulContainer}>

     <table >
                            
                   
                    {users.map(user => (
                        
                                <tr
                                key={user.id} onClick={() => clickName(users.indexOf(user))}
                                    id="idUser"
                                    className={styles.trClient}
                                   // type='button'
                                    name={user.telefone}
                                    //value={users.indexOf(user)}
                                    
                                >
                                    <td style={{ marginLeft:'20px',width: `300px` }}>
                                        {user.nome || '-'}

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