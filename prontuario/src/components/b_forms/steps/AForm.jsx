import React from 'react'
import styles from "../EditGeral.module.css"
import { InputDate, TextArea, InputText } from '../../d_inputs/Input'

const AForm = ({ data, handleChange }) => {


    return (

        <div className={styles.aform}>
            <h1>Atendimento/Histórico:</h1>
            <div>
            <InputText
            width='50px'
                title="Prontuário nº"
                name="num"
                id='num'
                value={data.num || ''}
                handleOnChange={handleChange}
            />
            <InputDate
                title="Início"
                name="inicio"
                id='inicio'
                value={data.inicio || ''}
                handleOnChange={handleChange}
            />
            </div>
            <TextArea
                name='aa'
                value={data.aa || ''}
                handleOnChange={handleChange}
                title="Queixa Principal"
            />
            <TextArea
                name='ab'
                placeholder='Não utiliza'
                value={data.ab || ''}
                handleOnChange={handleChange}
                title="Medicamentos Utilizados"
            />
            <TextArea
                placeholder='Não realiza'
                name='ac'
                value={data.ac || ''}
                handleOnChange={handleChange}
                title="Outros Tratamentos"
            />

        </div>
    )
}

export default AForm