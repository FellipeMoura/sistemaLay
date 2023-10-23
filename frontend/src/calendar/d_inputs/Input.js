import './Input.css'
import { GiCheckMark } from 'react-icons/gi'
import InputMask from 'react-input-mask'
import { useState } from 'react'
import { BiEdit } from 'react-icons/bi'

const masks = ["99h99", "999.999.999-99", "99 (99) 99999-9999"]

export function InputText({ width, flex, title, name, placeholder, handleOnChange, value }) {
    return (
        <div className='inputContainer2' style={flex ? { flexDirection: flex } : { alignItems: 'center' }}>
            <label htmlFor={name}>{title}</label>
            <input
                style={{ width: width }}
                type='text'
                name={name}
                id={name}
                placeholder={placeholder}
                onChange={handleOnChange}
                value={value}
            />
        </div>
    )
}

export function InputNumber({ width, flex, title, name, placeholder, handleOnChange, value }) {
    return (
        <div className='inputContainer2' style={flex ? { flexDirection: flex } : { alignItems: 'center' }}>
            <label htmlFor={name}>{title}</label>
            <input
                style={{ width: width }}
                type='number'
                name={name}
                id={name}
                placeholder={placeholder}
                onChange={handleOnChange}
                value={value}
            />
        </div>
    )
}

export function InputTime({ disabled, width, flex, title, name, placeholder, handleOnChange, value }) {
    return (
        <div className='inputContainer2' style={flex ? { flexDirection: flex } : { alignItems: 'center' }}>
            <label htmlFor={name}>{title}</label>
            <input
                style={{ width: width, padding: '.5em' }}
                type='time'
                name={name}
                id={name}
                placeholder={placeholder}
                onChange={handleOnChange}
                value={value}
                disabled={disabled} />
        </div>
    )
}

export function InputPass({ width, flex, title, name, placeholder, handleOnChange, value }) {
    return (
        <div className='inputContainer2' style={flex ? { flexDirection: flex } : { alignItems: 'center' }}>
            <label htmlFor={name}>{title}</label>
            <input
                style={{ width: width }}
                type='password'
                name={name}
                id={name}
                placeholder={placeholder}
                onChange={handleOnChange}
                value={value}
            />
        </div>
    )
}

export function InputDate({ flex, title, name, placeholder, handleOnChange, value }) {
    return (
        <div className='inputContainer2' style={flex ? { flexDirection: flex } : { alignItems: 'center' }}>
            <label htmlFor={name}>{title}</label>
            <input
                style={{ width: '10em' }}
                type='date'
                name={name}
                id={name}
                placeholder={placeholder}
                onChange={handleOnChange}
                value={value} />
        </div>
    )
}


export function InputMasks({ flex, placeholder, title, name, handleOnChange, value, mask }) {
    return (
        <div className='inputContainer2' style={flex ? { flexDirection: flex } : { alignItems: 'center' }}>
            <label htmlFor={name}>{title}</label>
            <InputMask

                style={{ width: mask === '0' ? '6em' : '15em', flexDirection: flex }}
                placeholder={placeholder}
                mask={masks[mask]}
                name={name}
                id={name}
                onChange={handleOnChange}
                value={value}

            />
        </div>
    )
}


export function Checkbox({ text, name, updateField, values, item }) {
    const [dados, setDados] = useState(0)

    const updateField2 = (e, key, value) => {
        (name === 'confirm' ? updateField(e) : updateField(key, value))
        if (value === '0') {
            setDados('1')
        } else {
            setDados('0')
        }
    }
    return (
        <div className='radios'>
            <label className="radioContainer">
                <input
                    text={text}
                    type="checkbox"
                    value={dados}
                    name={name}
                    checked={item === 1}
                    onChange={(e) => updateField2(e, name, e.target.value)}
                />
                <GiCheckMark />
                <p>{values}</p>
            </label>
        </div>
    )
}

export const Radio = ({ handleOnChange, title, name, data, values }) => {
    return (
        <div className='radios'>
            <label htmlFor={name}>{title}</label>
            {values.map(i => {
                return (
                    <label className="radioContainer">
                        <input
                            key={i}
                            type="radio"
                            values={i}
                            value={i}
                            name={name}
                            required
                            checked={data === i}
                            onChange={handleOnChange}
                        />
                        <GiCheckMark />
                        <p>{i}</p>
                    </label>
                )
            })}
        </div>

    )
}


export function Button(props) {
    return (
        <div className='botao2'>

            <button
                style={{ backgroundColor: `${props.color}`, width: props.width ? props.width : '' }}
                type='button'
                className={props.className}
                onClick={props.click}

            >{props.children}{props.value}
            </button>
        </div>
    )
}

export function Select({ padrao, width, flex, text, name, options, handleOnChange, value }) {

    return (
        <div className='inputContainer2' style={flex ? { flexDirection: flex } : { alignItems: 'center' }}>
            <label htmlFor={name}>{text}</label>
            <select
                className='selectInput'
                style={{ width: width }}
                name={name}
                id={name}
                onChange={handleOnChange}
            //value={value || padrao || ''}
            >
                <option> {padrao || 'Selecione uma opção'}</option>
                {options.map((option) => (
                    option.id && <option value={options.indexOf(option)} name={option.nome} key={option.id}>{option.id + (option.nome ? '-' + option.nome : '')}</option>
                ))}
            </select>
        </div>
    )
}

export function TextArea({ width, height, flex, title, name, placeholder, handleOnChange, value }) {
    return (
        <div className='taContainer' style={flex ? { flexDirection: flex } : { flexDirection: 'column' }}>
            <label>{title}</label><br />
            <textarea
                style={{ width: width, minHeight: height }}
                placeholder={placeholder}
                name={name}
                id={name}
                value={value}
                onChange={handleOnChange}
            />
        </div>
    )
}

export function LabelText(props) {
    return (
        <div className='labelContainer' style={props.flex ? { flexDirection: props.flex } : { alignItems: 'end' }}>
            <label >{props.header}</label>

            <span>{props.children}</span>
            {props.onClick &&
                <div onClick={props.onClick} > <BiEdit /> </div>}
        </div>


    )

}

export function LabelText2(props) {
    return (
        <div className='labelContainer' id='labelContainer2' style={props.flex ? { flexDirection: props.flex } : { alignItems: 'end' }}>
            <label >{props.header}</label>

            <span>{props.children}</span>
            {props.onClick &&
                <div onClick={props.onClick} > <BiEdit /> </div>}
        </div>


    )

}

export function ConfirmButton(props) {
    return (

        <button
            style={{ border: `1px solid ${props.color}`, color: props.color }}
            className='confirmButton'
            type='button'
            onClick={props.onClick}
        >
            {props.value}
        </button>

    )

}