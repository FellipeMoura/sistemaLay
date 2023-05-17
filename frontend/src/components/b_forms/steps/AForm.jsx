import React from 'react'
import styles from "../EditGeral.module.css"
import { InputDate } from '../../d_inputs/Input'

var i = true

const AForm = ({ data, updateField }) => {
    


  console.log(data.inicio)
    return (
        <div>
            <InputDate
                title="Início"
                name="inicio"
                id='inicio'
                value={data.inicio || ''}
                handleOnChange={(e) => updateField("inicio", e.target.value)}
            />
            <div className={styles.formControl}>
                <label htmlFor="aa">Queixa Principal:</label>
                <textarea
                    name="text"
                    id="aa"
                    value={data.aa || ''}
                    onChange={(e) => updateField("aa", e.target.value)}
                />
            </div>
            <div className={styles.formControl}>
                <label htmlFor="ab">Medicamentos Utilizados:</label>
                <textarea
                    name="text"
                    id="ab"
                    value={data.ab || ''}
                    onChange={(e) => updateField("ab", e.target.value)}
                />
            </div>
            <div className={styles.formControl}>
                <label htmlFor="ac">Outro Tratamentos:</label>
                <textarea
                    name="text"
                    id="ac"
                    value={data.ac || ''}
                    onChange={(e) => updateField("ac", e.target.value)}
                />
            </div>
        </div>
    )
}

export default AForm