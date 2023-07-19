import styles from './Home.module.css'
import { useEffect, useState} from 'react';
import RBar from '../c_layouts/RBar';
import { LogoutButton } from '../d_inputs/LogoutButton';
import {MdOutlineAttachMoney} from 'react-icons/md'


function Home(){
    const [users, setUsers] = useState([]);
    
    useEffect(() => {           
            fetch(`${process.env.REACT_APP_BACKEND}/records`,{
            method: "GET",
            heders:{
                'Content-type': 'application/json',
            },
            })
            .then((resp) => resp.json())
            .then((resp2) => {
                //console.log(resp2)
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
           <button className={styles.hlancamentos} onClick={()=>window.location.replace('/control')}>
            Lançamentos <MdOutlineAttachMoney/>
            
           </button>
        </div>

       

    )
}

export default Home