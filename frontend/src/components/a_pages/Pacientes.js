import styles from './Pacientes.module.css'
import { useEffect, useState } from 'react';
import SBar from '../c_layouts/SBar';

function Pacientes(){
    const [users, setUsers] = useState([]);

  

    
    useEffect(() => {           
            fetch("http://localhost:3333/api/users",{
            method: "GET",
            heders:{
                'Content-type': 'application/json',
            },
            })
            .then((resp) => resp.json())
            .then((resp2) => {
                console.log(resp2)
                setUsers(resp2)
            })            
            .catch(err => console.log(err))
    }, [])

    return(
    
        <div className={styles.container}>
            <SBar setUsers={setUsers} users={users}/>
        </div>

       

    )
}

export default Pacientes