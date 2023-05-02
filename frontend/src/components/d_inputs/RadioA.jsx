import{
    GiCheckMark
}from 'react-icons/gi'


const Radio = ({title, name, data, updateField, values}) => {
return(
        <div class='radios'>
            <label htmlFor={name}>{title}</label>
            {values.map(i => {
                    return (
                <label className="radioContainer">
                    <input
                        type="radio" 
                        value={i}
                        name={name} 
                        required
                        checked={data === i} 
                        onChange={(e) => updateField(name, e.target.value)}
                    />
                    <GiCheckMark />
                    <p>{i}</p>
                </label>
                    )
            })}
        </div>

    )
} 

export default Radio