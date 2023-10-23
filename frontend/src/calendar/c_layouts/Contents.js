import './Contents.css'

export function Label1({label, span, limpar}){

    return(
<div className='label1'>
<label> {label} </label>
<span>{span}</span>
{limpar?
    <button
        className=''
        type='button'
        onClick={() => limpar()}
    >
        Limpar
    </button>
    :''
}
</div>
)}