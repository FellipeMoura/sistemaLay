import './Input.css'
import { GiCheckMark } from 'react-icons/gi'
import InputMask from 'react-input-mask'
import { useState } from 'react'


const masks = ["99h99", "999.999.999-99", "(99)99999-9999"]

export function InputText({ width, flex, title, name, placeholder, handleOnChange, value }) {
    return (
        <div className='inputContainer' style={flex ? { flexDirection: flex } : { alignItems: 'center' }}>
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

export function InputPass({ width, flex, title, name, placeholder, handleOnChange, value }) {
    return (
        <div className='inputContainer' style={flex ? { flexDirection: flex } : { alignItems: 'center' }}>
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
        <div className='inputContainer' style={flex ? { flexDirection: flex } : { alignItems: 'center' }}>
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
        <div className='inputContainer' style={flex ? { flexDirection: flex } : { alignItems: 'center' }}>
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
    const [dados, setDados] = useState(item)

    const updateField2 = (e, key, value) => {
        (name === 'confirm' ? updateField(e) : updateField(key, value == 0? 1:0))
        if (value == 0) {
            setDados(1)
        } else {
            setDados(0)
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
                    checked={dados === 1}
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


export function Button({ className, click, value, color, width }) {
    return (
        <div className='botao'>

            <button
                style={{ backgroundColor: `${color}`, width: width? width : '' }}
                type='button'
                className={className}
                onClick={click}

            >{value}
            </button>
        </div>
    )
}

export function Select({ padrao, width, flex, text, name, options, handleOnChange, value }) {

    return (
        <div className='inputContainer' style={flex ? { flexDirection: flex } : { alignItems: 'center' }}>
            <label htmlFor={name}>{text}</label>
            <select
                className='selectInput'
                style={{ width: width }}
                name={name}
                id={name}
                onChange={handleOnChange}
                value={value || padrao || ''}
            >
                <option value='' > {padrao || 'Selecione uma opção'}</option>
                {options.map((option) => (
                    <option value={option.id} key={option.id}>{option.name}</option>
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