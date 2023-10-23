import{FaHistory} from 'react-icons/fa'
import {FiSend} from 'react-icons/fi'
import {BiBrain} from 'react-icons/bi'

import "./Steps.css"

const Steps = ({currentStep}) => {
    return(
        <div className="steps">
            <div className="step active">
                <FaHistory/>
                <p>Atendimento/</p>
                <p>Histórico</p>
            </div>
            <div id="step2" className={`step ${currentStep >= 1 ? "active" :''}`}>
                <BiBrain />
                <p>Exame Psíquico</p>
            </div>  
            <div className={`step ${currentStep >= 2 ? "active" :''}`}>
                <FiSend/>
                <p>Hipótese Diagnóstica</p>
            </div>        
        </div>
    )
}

export default Steps