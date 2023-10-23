import './Pages.css'
import React, { useEffect, useState } from 'react';


export function TopContainer(props) {

   
    const [active, setActive] = useState(['on','off','off','off','off','off'])

    function thisPage(){
        switch(0){
            case '0': return(['on','off','off','off','off','off'])
            case '1': return(['off','on','off','off','off','off'])
            case '2': return(['off','off','on','off','off','off'])
            case '3': return(['off','off','off','on','off','off'])
            case '5': return(['off','off','off','off','on','off'])
            case '5': return(['off','off','off','off','on','off'])
            case '6': return(['off','off','off','off','off','on'])
            default: return(['off','off','on','off','off'])
        }
       } 

    function change(button) {
        if (button === 0) {
            setActive(['on', 'off', 'off', 'off', 'off', 'off'])
            props.setStep(button)
        } else if (button === 1) {
            setActive(['off', 'on', 'off', 'off', 'off', 'off'])
            props.setStep(button)
        } else if (button === 2) {
            setActive(['off', 'off', 'on', 'off', 'off', 'off'])
            props.setStep(button)
        } else if (button === 4) {
            setActive(['off', 'off', 'off', 'on', 'off', 'off'])
            props.setStep(button)
        } else if (button === 5) {
            setActive(['off', 'off', 'off', 'off', 'on', 'off'])
            props.setStep(button)
        } else if (button === 6) {
            setActive(['off', 'off', 'off', 'off', 'off', 'on'])
            props.setStep(button)
        }
    }

    return (


        <div className="topContainer">

            {props.children}
            <div>
            <div className='logoutDiv'>
                {props.buttons.map(button=>
                    button
                )}
                    </div>
            <div className="nav">
                {props.navList.map((navItem, index) =>
                    <div
                        key={index}
                        className={`${active[props.navList.indexOf(navItem)]}`}
                        onClick={() => change(props.navList.indexOf(navItem))}
                    >
                        {navItem}

                    </div>


                )}
                </div>
            </div>



        </div>


    )


}

export function SessionContainer(props){
    return (
    <div className={`sessionContainer ${props.custom}`} >
        {props.children}
    </div>
    )
}


export function PageClients(props) {
    return (
        <div className={`pageClients ${props.custom}`} >
            {props.children}
        </div>
    )
}
