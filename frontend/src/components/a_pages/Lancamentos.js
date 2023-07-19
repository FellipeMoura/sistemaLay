import './Lancamentos.css'
import styles from './Home.module.css'
import { useEffect, useState} from 'react';
import RBar from '../c_layouts/RBar';
import { LogoutButton } from '../d_inputs/LogoutButton';
import Controls from '../b_forms/Controls';



function Home(){
    const [control, setControl] = useState([]);
    
    useEffect(() => {           
            fetch(`${process.env.REACT_APP_BACKEND}/control`,{
            method: "GET",
            heders:{
                'Content-type': 'application/json',
            },
            })
            .then((resp) => resp.json())
            .then((resp2) => {
                //console.log(resp2)
                setControl(resp2)
            })            
            .catch(err => console.log(err))
    }, [])

    return(
    
        <div className={styles.container}>
            
            <div className={styles.logoutDiv}>
            <LogoutButton/>
            </div>
            
           <Controls/>
        </div>

       

    )
}

export default Home