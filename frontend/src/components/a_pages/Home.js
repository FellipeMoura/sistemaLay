import styles from './Pacientes.module.css'
import { useEffect, useState, useContext } from 'react';
import RBar from '../c_layouts/RBar';
import { LogoutButton } from '../d_inputs/LogoutButton';



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
            <div className={styles.logoutDiv}>
            <LogoutButton/>
            </div>
            <RBar setUsers={setUsers} users={users}/>
           
        </div>

       

    )
}

export default Home