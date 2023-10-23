import React, { useState, useEffect } from 'react';
import "./Control.css"
import { MdOutlineDelete } from 'react-icons/md'
import { BsCheck2Square } from 'react-icons/bs'
import { InputMasks, InputText, Button, InputDate, Select } from '../d_inputs/Input';
import moment from 'moment'



function Controls({ iduser, idrecord }) {

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
  const [count, setCount] = useState([])
  const [where, setWhere] = useState({ confirm: undefined, data: 0, data_fim: 0 })
  const [confirma, setConfirma] = useState(0)
  const confirmFilter = [

    { id: 0, name: 'Pendentes' },
    { id: 1, name: 'Confirmados' },

  ]
  function handleChange(e) {
    setProject({ ...where, [e.target.name]: e.target.value })
    console.log(project)
  }
  useEffect(() => {

    fetch(`${process.env.REACT_APP_BACKEND}/control/undefined/0/0`, {
      method: "GET",
      heders: {
        'Content-type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((resp2) => {

        setSessions(resp2[0])
        setCount(resp2[1])
        console.log(resp2)
      })
      .catch(err => console.log(err))
  }, [iduser, project])

  function filtrar() {
    let url = `${where.confirm}/${where.data}/${where.data_fim}`
    fetch(`${process.env.REACT_APP_BACKEND}/control/${url}`, {
      method: "GET",
      heders: {
        'Content-type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((resp2) => {
        setSessions(resp2[0])
        console.log(resp2)

      })
      .catch(err => console.log(err))

  }

  function limpar() {
    setWhere({ confirm: undefined, data: 0, data_fim: 0 })
     fetch(`${process.env.REACT_APP_BACKEND}/control`, {
      method: "GET",
      heders: {
        'Content-type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((resp2) => {
        setSessions(resp2[0])

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
          console.log(data);
          window.location.replace(`/prontuario/${iduser}/${idrecord}/1`)

          //redirect
        })
        .catch(err => console.log(err))
    }
  }



  function handleChange(e) {
    setConfirma(e.target.value)
    setWhere({ ...where, [e.target.name]: e.target.value })
    console.log(where)


  }

  function confirm(id) {
    // setProject({...project, [e.target.name]: e.target.value })
    editConfirm(id)
    // att()
    // console.log(project.confirm)


  }

  //<p>Média: {(parseInt(count.valor_total) /  parseInt(count.total)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} /sessão</p>


  //console.log(project.session)


  const titulo = (sessions[0] ? <tr className=''>
    <th style={{ width: '50%' }} className=''>Nome</th> <th className=''>Data</th><th className=''>Valor</th><th className=''>Pagamento</th><th style={{ width: '.1%' }}>Excluir</th>
  </tr> : '')

  return (
    <div className="cPanel">




      <div>
        
        <div className='inline'>
          <div className='dashControls'>

            <div className='dashControl'>
              <label>Atendimentos</label>
              <p>Pagos: {count.pago}</p>
              <p>Pendentes: {parseInt(count.total) - parseInt(count.pago)}</p>
              <p>Total: {count.total}</p>
              <p>Média: {(count.total / (parseInt(moment().format('M')) - 5)).toFixed(2)} /mês</p>




            </div>
            {count.total ?
              <div className='dashControl'>

                <label>Caixa</label>
                <p>Confirmado: {parseInt(count.valor_pago).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                <p>Pendente: {(parseInt(count.valor_total) - parseInt(count.valor_pago)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                <p>Valor Total: {count.valor_total && parseInt(count.valor_total).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                <p>Média Mensal: {(count.valor_total / (parseInt(moment().format('M')) - 5)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>



              </div>
              : ''}
          </div>
      
              <div>
          <div className='inline filterLan'>
          <InputDate
  
            title='de'
            name='data'
            value={where.data}
            handleOnChange={handleChange}
          />
          <InputDate
            title='até'
            name='data_fim'
            value={where.data_fim}
            handleOnChange={handleChange}
    
          />
          <Select
            padrao='Todos'
            options={confirmFilter}
            width='120px'
            name='confirm'
            value={where.confirm}
            handleOnChange={handleChange}
          />
          <Button
            value='Filtrar'
            color='#067be7'
            click={()=> filtrar()}
          />
          <Button
            value='Limpar'
            color='#616161'
            click={()=> limpar()}
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
                    <tr id="idsession" key={sessions.indexOf(session)} className='' >
                      <td className='clickControl' onClick={()=> window.location.replace(`/prontuario/${session.iduser}/${session.idrecord}/2`)}>{(session.name || '-')}</td>
                     
                      <td className=''>{(inicion || '-')}</td>

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
        </div>
      </div>




    </div>
  );
}

export default Controls;

/*<div
                                
id={session.id}
onClick={(e) => deleteSession(session.id)}

>
<MdOutlineDelete/>
</div>*/