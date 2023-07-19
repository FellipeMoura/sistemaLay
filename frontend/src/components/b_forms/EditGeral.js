import AForm from "./steps/AForm"
import BForm from "./steps/BForm"
import CForm from "./steps/CForm"
import { useState } from 'react'
import styles from "./EditGeral.module.css"
import { Button } from '../d_inputs/Input'



function RecordForm(props) {

  const [data, setData] = useState(props.project);


  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value })

  }
  const updateField = (key, value) => {
    setData((prev) => {
      return { ...prev, [key]: value }
    })
  }

  console.log(data)
  function editRecord(id, cadastro) {

    let project = cadastro
    if(cadastro.inicio){ project.inicio =cadastro.inicio.substr(0, 10)}   
    fetch(`${process.env.REACT_APP_BACKEND}/update2/${id}`, {
      method: "PUT",
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(cadastro),
    })
      .then((resp) => resp.json()).then((data) => {
        console.log(data.result);
        window.alert("Cadastrado alterado!");
        window.location.replace(`/prontuario/${props.iduser}/${props.idrecord}/0`)


        //redirect
      })
      .catch(err => console.log(err))
  }
  //< Steps currentStep={currentStep} />

  return (

    <div className={styles.formContainer}>
      <AForm data={data} handleChange={handleChange} updateField={updateField} />

      <BForm data={data} updateField={updateField} />

      <CForm data={data} updateField={updateField} />

      <Button
        color='#213e6d'
        value='Alterar'
        width='80%'
        click={() => editRecord(data.id, data)}
      />
    </div>
  )
}

export default RecordForm