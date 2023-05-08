import React from 'react'
import styles from "../EditGeral.module.css"

const CForm = ({data, updateField}) => {
    return(
        <div>
           <div className={styles.formControl}>
        
            <textarea             
            name="text" 
            id="ca" 
            value={data.ca || ''}
            onChange={(e) => updateField("ca", e.target.value)}
           />
           </div>
        </div>
    )
}

export default CForm