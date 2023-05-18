import React from 'react'
import './FormSessions.css'

function FormSessions({header,body}){

    return(
           <div className="fsContainer">

                <div className= 'fsHeader'>
                
                    {header}

                </div>        

                <div className= "fsBody">                 

                    {body}
                   
                </div>

            </div>
    )
} export default FormSessions