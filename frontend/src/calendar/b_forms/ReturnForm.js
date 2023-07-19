import { useEffect, useState } from "react";
import { useParams } from 'react-router';
import 'moment/locale/pt-br'
import "./AtendForm.scss";
import Open from "../c_layouts/Open";
import {VscSave} from 'react-icons/vsc'
import {ImCancelCircle} from 'react-icons/im'
import {FiEye} from 'react-icons/fi'


export function ReturnForm(props) {

  const [ocultas, setOcultas] = useState(props.atendentes)

 
  function alterarA(atendente) {
    fetch(`${process.env.REACT_APP_CALENDAR}/alterarA/${atendente}/${props.unidade}`, {
      method: "PUT",
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(),
    })
      .then((resp) => resp.json()).then((data) => {
       // console.log(data);
        window.alert("Status alterado!")

        window.location.replace(`/calendar/${props.unidade}/${props.user}`)
        // history.push(`/prontuario/${id}/${idrecord}/1`)
        //redirect
      })
      .catch(err => console.log(err))
  }


  useEffect(() => {


 


  }, []);

  const [visible, setVisible] = useState(false)

  return (
    <div className="inativas" onClick={()=> visible? setVisible(false): setVisible(true)}>
     <div> <span>Atendentes inativas<label>{visible? "Ocultar":'Mostrar'}</label></span>
     </div>
      {
       visible && props.atendentes.map((atendente) => (

          <span 
            key={props.atendentes.indexOf(atendente)}
         
          >

            {atendente.nome}
        <button
          onClick={()=>alterarA(atendente.nome)}
        >
          Ativar <FiEye/>
        </button>
          </span>




        ))
      }
    </div>
  );
}

/* 
          */