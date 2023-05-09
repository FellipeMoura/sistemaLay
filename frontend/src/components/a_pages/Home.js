import styles from './Pacientes.module.css'
import { useEffect, useState } from 'react';
import RBar from '../c_layouts/RBar';


function Home(login){
    const [users, setUsers] = useState([]);

    
    useEffect(() => {           
            fetch(`${process.env.REACT_APP_BACKEND}records`,{
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
            <RBar setUsers={setUsers} users={users}/>
        </div>

       

    )
}

export default Home