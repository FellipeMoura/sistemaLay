import {Link}from 'react-router-dom'
import './Navbar.css'
import logo from '../../img/logop.png'
import { useState } from 'react'

function Navbar() {

    const [active, setActive] = useState(['on','off','off','off'])

   function change(button){
    

    if(button === 0){
        setActive(['on','off','off','off'])

    }else if(button === 1){
        setActive(['off','on','off','off'])

    }else if(button === 2){
        setActive(['off','off','on','off'])

    }else if(button === 3){
        setActive(['off','off','off','on'])

    }
}
    
    return(
        <nav className="navbar">
            <Link to="https://www.instagram.com/layaraoliveira.psi/" target="_blank"><img src={logo} className="logo" alt="Logo"/></Link>

            
        <div className="navs">
            <div className={`${active[0]}`} onClick={()=> change(0)}><Link to="/">Página Inicial</Link></div>
            <div className={`${active[1]}`} onClick={()=> change(1)}><Link to="/resumo">Resumo</Link></div>
        </div>
                                                        
     
      </nav>
    )
}

export default Navbar