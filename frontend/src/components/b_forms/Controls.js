import React, { useState, useEffect } from 'react';
import "./Control.css"
import { MdOutlineDelete } from 'react-icons/md'
import { BsCheck2Square } from 'react-icons/bs'
import { InputMasks, InputText, Button, InputDate } from '../d_inputs/Input';




function Control({ iduser, idrecord }) {

  var data = new Date();
  var dia = String(data.getDate()).padStart(2, '0');
  var mes = String(data.getMonth() + 1).padStart(2, '0');
  var ano = data.getFullYear();
  var dataAtual = ano + '-' + mes + '-' + dia;

  //const app = express()


  const [project, setProject] = useState({
    data: dataAtual,
    hora: '',
    valor: '',
    confirm: 0,
    iduser: iduser,
    sessao: 0
  })

  const [sessions, setSessions] = useState([])
  useEffect(() => {

    fetch(`${process.env.REACT_APP_BACKEND}/control`, {
      method: "GET",
      heders: {
        'Content-type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((resp2) => {

        setSessions(resp2)
        console.log(resp2)
      }) 
      .catch(err => console.log(err))
  }, [iduser, project])

  //console.log(sessions)

  function createControl(cadastro) {

    fetch(`${process.env.REACT_APP_BACKEND}/control`, {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(cadastro),
    })
      .then((resp) => resp.json()).then((data) => {

        window.location.replace(`/prontuario/${iduser}/${idrecord}/1`)
        //redirect
      })
      .catch(err => console.log(err))
  }

  function deleteSession(id) {

    var resp = window.confirm("Confirma a exclusão deste registro?");
    if (resp) {



      fetch(`${process.env.REACT_APP_BACKEND}/delete3/${id}`, {
        method: "DELETE",
        headers: {
          'Content-type': 'application/json',
        },
      })
        .then((resp) => resp.json()).then((data) => {
          //console.log(data);
          window.location.replace(`/prontuario/${iduser}/${idrecord}/1`)

          //redirect
        })
        .catch(err => console.log(err))
    }
  }

  function editConfirm(id) {

    var resp = window.confirm("Confirma pagamento da sessão?");
    if (resp) {



      fetch(`${process.env.REACT_APP_BACKEND}/confirm/${id}`, {
        method: "PUT",
        headers: {
          'Content-type': 'application/json',
        },
      })
        .then((resp) => resp.json()).then(() => {
          //console.log(data);
          window.location.replace(`/prontuario/${iduser}/${idrecord}/1`)

          //redirect
        })
        .catch(err => console.log(err))
    }
  }



  function handleChange(e) {
    setProject({ ...project, [e.target.name]: e.target.value })
  


  }

  function confirm(id) {
    // setProject({...project, [e.target.name]: e.target.value })
    editConfirm(id)
    // att()
    // console.log(project.confirm)


  }



  //console.log(project.session)


  const titulo = (sessions[0] ? <tr className=''>
  <th className=''>Nome</th>  <th className=''>Sessão</th><th className=''>Data</th><th className=''>Horário</th><th className=''>Valor</th><th className=''>Pagamento</th><th style={{ width: '.1%' }}>Excluir</th>
  </tr> : '')

  return (
    <div className="cPanel">

      <div className="inputPanel">
        <InputText
          width='2.5em'
          title="Sessão"
          value={project.sessao || ''}
          name='sessao'
          handleOnChange={handleChange}
          
        />
        <InputDate
          title="Data"
          name="data"
          value={project.data || dataAtual}
          handleOnChange={handleChange}
        />
        <InputMasks
          mask='0'
          title='Hora'
          name="hora"
          value={project.hora || ''}
          handleOnChange={handleChange}

        />
        <InputText
          width='5em'
          title='R$'
          type='text'
          name="valor"
          value={project.valor || ''}
          handleOnChange={handleChange}
          required
        />

        <Button
          className='btnControl'
          color="#447461"
          value='Registrar'
          click={() => createControl(project)}
        />

      </div>

      <div className='tableContainer2'>
        <table >
          <thead>

            {titulo}
          </thead>
          <tbody className='tbody2'>
            {sessions.map(session => {
              let inicion = session.data.substr(0, 10).split('-').reverse().join('/');
              return (
                <tr id="idsession" key={sessions.indexOf(session)} className=''>
                  <td className=''>{(session.name || '-')}</td>
                  <td id={session.id} className=''>{session.sessao || '-'}</td>
                  <td className=''>{(inicion || '-')}</td>
                  <td className=''>{(session.hora || '-')}</td>
                  <td className=''>{(`R$${session.valor},00` || '-')}</td>
                  <td className='tdConfirm'>{session.confirm === '0' ?
                    <Button
                      color='#213e6d'
                      value='Confirmar'
                      className='btnconfirm'
                      click={() => confirm(session.id)}
                    />

                    : <BsCheck2Square />}</td>
                  <td className='dele'>


                    <Button
                      color='#b4b4b400'
                      id={session.id}
                      click={() => deleteSession(session.id)}
                      value={<MdOutlineDelete />}
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>





    </div>
  );
}

export default Control;

/*<div
                                
id={session.id}
onClick={(e) => deleteSession(session.id)}

>
<MdOutlineDelete/>
</div>*/