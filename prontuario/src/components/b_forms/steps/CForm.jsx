import React from 'react'
import styles from "../EditGeral.module.css"
import { TextArea } from '../../d_inputs/Input'

const CForm = ({data, updateField}) => {
    return(

           <div className={styles.cform}>
           <h1>Hipótese Diagnóstica:</h1>     
           <TextArea
                name='ca'
                value={data.ca || ''}
                handleOnChange={(e) => updateField("ca", e.target.value)}
                
            />
           </div>

    )
}

export default CForm