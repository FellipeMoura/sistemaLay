import './Lancamentos.css'
import styles from './Home.module.css'
import { useEffect, useState} from 'react';
import RBar from '../c_layouts/RBar';
import { LogoutButton, HomeButton } from '../d_inputs/LogoutButton';
styles
import logo from '../../img/logop.png'
import { Link } from 'react-router-dom';



function Lancamentos(){
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
    
        <div className='painel'>
            
           
           
                
                <div className="headerLan">
                    <Link to="https://www.instagram.com/layaraoliveira.psi/" target="_blank"><img src={logo} className="logo" alt="Logo"/></Link>
                   
                     
                
                
                <div className='logoutDiv'>
                <HomeButton/>
                    <LogoutButton/>
                
                </div>
            </div>
        
            
          
        </div>



    )
}

export default Lancamentos