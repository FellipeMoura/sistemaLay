//components
import {GrFormNext, GrFormPrevious, GrSend} from 'react-icons/gr'
import {BiSave} from 'react-icons/bi'

import AForm from "./steps/AForm"
import BForm from "./steps/BForm"
import CForm from "./steps/CForm"
import Steps from './steps/Steps'
import {useState} from 'react'

//Hooks
import {useForm} from "../hooks/useForm"
import styles from "./EditGeral.module.css"


const formTemplate = {
  aa: '', ab: '', ac: '',
  ba:'Normal', bb:'Normal', bc:"Cooperativo", 
  bd1:1, bd2:1, bd3:1, bd4:1, 
  be:'Normal',bf:'Normal', bg:'Coerente',bh:'Normal',bi:'Normal',bj:'Normal',
  bk1:0,bk2:0,bk3:0,bk4:0,bk5:0,bk6:0,bk7:0, bl:'Normal', bm:'sim', ca:"Ainda não há",obs:''
}

function RecordForm(props) {
  
  const [data, setData] = useState(props.project);
  console.log(props.project)

  const updateField = (key, value) => {
    console.log(props.idUser)
    setData((prev) => {
      return{...prev, [key]: value }
    })
  }

  const formComponents =[
    <AForm data={data} updateField={updateField}/>,
    <BForm data={data} updateField={updateField}/>,
    <CForm data={data} updateField={updateField}/>
  ]
  const stepsTitle =['Atendimento/Histórico', 'Exame Psíquico', 'Hipótese Diagnóstica']

  function editRecord(id, cadastro) {
   
      
    fetch(`http://localhost:3333/api/update2/${id}`,{
        method: "PUT",
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(cadastro),
    })
      .then((resp) => resp.json()).then((data) => {
          console.log(data);
          window.alert("Cadastrado alterado!");
         window.location.replace(`/prontuario/${props.iduser}/${props.idrecord}/0`)
         console.log(data.id);
        
        //redirect
      })
      .catch(err => console.log(err))
    }
  //< Steps currentStep={currentStep} />
  const {currentStep, currentComponent, changeStep, isLastStep, isFirstStep } = useForm(formComponents)
  return (
    
      <div className={styles.formContainer}>
      
      
        <form onSubmit={(e) => changeStep(currentStep+1,e)}>
          
          <div className={styles.actions}>
            
              <button type="button" onClick={() => changeStep(currentStep-1)}>
                <GrFormPrevious /> 
              </button>
              <h1>{stepsTitle[currentStep]}</h1>
              <div className={styles.actions}>
              {!isLastStep ? (
                <button type="submit">
                <GrFormNext />
              </button>) : (
                <button type="button" onClick={() => editRecord(data.id, data)}>
                <BiSave />
              </button>

              )}
            </div>
          
          </div>
            
            <div className={styles.inputsContainer}>
              {currentComponent}
            </div>
            
            
        </form>
        
      </div>
  )
}

export default RecordForm