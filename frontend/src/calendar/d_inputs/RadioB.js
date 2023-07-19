import{
    AiOutlineWoman,
    AiOutlineMan
}from 'react-icons/ai'

import './Radio.css'

function Radio({handleOnChange}) {
   return (<div className="form-control score-container" >
        <label htmlFor="sexo">Sexo:</label>

        <label className="radio-container">
            <input
                id="logo-woman"
                type="radio"
                value="w"
                name='sexo'
                onChange={handleOnChange}
            />
            <AiOutlineWoman />
        </label>
        <label className="radio-container">
            <input
                id="logo-man"
                type="radio"
                value="m"
                name='sexo'
                onChange={handleOnChange}
            />
            <AiOutlineMan />
        </label>
    </div>)
} export default Radio