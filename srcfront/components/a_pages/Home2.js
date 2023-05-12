import styles from './Home.module.css'
import savings from '../../img/savings.svg'
import {Link} from 'react-router-dom'
import{HiUsers} from 'react-icons/hi'
import {SiFormstack} from 'react-icons/si'
import {RiFileEditFill} from 'react-icons/ri'

import Navbar from '../layout/Navbar'

function Home(){
    //<img src={savings} alt="costs"/>
    return(
        <section className={styles.homeContainer}>
                <Link className={styles.btn} to="/pacientes" >
                < HiUsers/><span>Pacientes</span>
                </Link>           
            <Link className={styles.btn2} to="/prontuarios">
            < SiFormstack/><span>Prontuários</span>
            </Link>
            <Link className={styles.btn3} to="/resumo" >
            < RiFileEditFill/><span>Resumo</span>
            </Link>
            
        </section>
    )
}

export default Home