import React, { useState, useEffect } from 'react';
import "./Control.css"
import { MdOutlineDelete } from 'react-icons/md'
import { BiEdit } from 'react-icons/bi'
import { InputMasks, InputText, Button, InputDate, Select } from '../d_inputs/Input';
import moment from 'moment'



export default function Clients({ iduser, idrecord }) {

  var data = new Date();
  var dia = String(data.getDate()).padStart(2, '0');
  var mes = String(data.getMonth() + 1).padStart(2, '0');
  var ano = data.getFullYear();
  var dataAtual = ano + '-' + mes + '-' + dia;

  const [project, setProject] = useState({
    data: dataAtual,
    hora: '',
    valor: '',
    confirm: 0,
    iduser: iduser,
    sessao: 0
  })

  const [records, setRecords] = useState([])
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

    fetch(`${process.env.REACT_APP_BACKEND}/recordsList`, {
      method: "GET",
      heders: {
        'Content-type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((resp2) => {

        setRecords(resp2)
       
      })
      .catch(err => console.log(err))
  }, [iduser, project])

  
  const titulo = (records[0] ? <tr className=''>
    <th className=''>nº</th>
    <th style={{ width: '300px' }} className=''>Nome</th>
    <th className=''>Ultimo</th>
     <th className=''>Início</th>
     <th className=''>Total</th>
     <th style={{ width: '.1%' }}>Editar</th>
  </tr> : '')

  

function Td({index, record}){
  //  console.log(record)
    const colorStatus = ['#881212','#128822']
    const nameStatus = ['Inativo', 'Ativo']
    const [project, setProject] = useState(record)
    const [current, setCurrent] = useState(0)
    
    function salvar() {
        fetch(`${process.env.REACT_APP_BACKEND}/attRecord`, {
        method: "PUT",
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(project),
      })
        .then((resp) => resp.json())
        .then((resp2) => {
          setCurrent(0)
  
        })
        .catch(err => console.log(err))
  
    }

    function handleChange(e) {
      
      setProject({ ...project, [e.target.name]: e.target.value })
  
    }
    
    function voltar(){

      setProject(record)
      setCurrent(0)
    }

    const label = (
      <tr id="idrecord" key={index} className='' >
      <td className=''>{project.num}</td>
     <td className='clickControl' style={{fontWeight: 'bold', color:colorStatus[project.status]}} onClick={() => window.location.replace(`/prontuario/${record.iduser}/${record.id}/2`)}>{record.name || '-'}</td>

    

     <td className=''>{project.ultimo.substr(0, 10).split('-').reverse().join('/')}</td>
     
     <td className=''>{project.inicio.substr(0, 10).split('-').reverse().join('/')}</td>
     <td className=''>{project.count}</td>
    
    
     <td className='dele' >

     <button
        onClick={()=> setCurrent(1)}
      ><BiEdit/></button>
     </td>
   </tr>
    )

    const input = (
      <tr id="idrecord" key={index} className='' >
      <td className=''>
        <InputText
        width='40px'
        name='num'
        value={project.num}
        handleOnChange={handleChange}
        />
        </td>
     <td  onClick={() => window.location.replace(`/prontuario/${record.iduser}/${record.idrecord}/2`)}>{record.name || '-'}</td>

     <td className=''>
      <Button
        value={nameStatus[project.status]}
        color={colorStatus[project.status]}
        click={()=> setProject({ ...project, ['status']: project.status == 0?1:0 })}
      />
      </td>
     
     <td className=''>
     <InputDate
        width='20px'
        name='inicio'
        value={project.inicio.substr(0, 10)}
        handleOnChange={handleChange}
        />
     </td>
     <td className=''>{record.count}</td>
    
    
     <td className='dele' >

     <Button
        value='Salvar'
        color='#067be7'
        click={()=> salvar()}
      />
      <Button
        value='Voltar'
        color='#7c7c7c'
        click={()=> voltar(0)}
      />
     </td>
   </tr>
    )
      const tds = [label, input]
    return(
     tds[current]
    )
  }

  const [filter, setFilter] = useState(false)
  const [sfilter, setSfilter] = useState(0)
  function filtrar(value){
    if(value > 1){
      setFilter(false)
    }else{
      setFilter(true)
      setSfilter(value)
    }    
      
  }
  return (
    <div className="cPanel">

          <div>
           


        
            <div className='tableContainer2'>
              <table >
                <thead>

                  {titulo}
                </thead>
                <tbody className='tbody2'>
                  {records.map((record, index) => {
                   // let inicion = record.data.substr(0, 10).split('-').reverse().join('/');
                    return (
                    !filter || sfilter==record.status?
                     <Td
                     index={index}
                     record={record}
                     />
                     :''
                    )
                  })}
                </tbody>
              </table>
            </div>
         
        </div>
      




    </div>
  );
}

