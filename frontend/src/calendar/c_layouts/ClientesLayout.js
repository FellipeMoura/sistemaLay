import React, { useState } from 'react'
import { Label1 } from './Contents'
import SubBar from '../../caixa/d_inputs/SubBar'
import RBar from './VBar'
import { Button, InputCash, InputNumber } from '../d_inputs/Input'

const unidades = [
  0,
  'Matriz',
  'Bueno',
  'Goiânia Shopping',
  'Orion',
  'Campinas',


]

export function Venda(props) {


  return (

    <div className='vendaForm'>
      <div className='vendaHeader'>
        <div>
          <Label1
            label='Data:'
            span={props.venda.data.substr(0, 10).split('-').reverse().join('/')}
          />

          <div className='label1'>
            <label> {'Status:'} </label>
            <span style={{ backgroundColor: props.status[props.venda.status].cor, color: '#fff', fontWeight: '600', padding: '0 4px', borderRadius: '8px' }}>{props.status[props.venda.status].nome}</span>

          </div>
        </div>
        <div>
          <Label1
            label='Avaliadora:'
            span={props.venda.avaliadora === props.venda.caixa ? '?' : props.venda.avaliadora}
          />
          <Label1
            label='Caixa:'
            span={props.venda.caixa}
          />
        </div>
        <div>
          <Label1
            label=' Unidade:'
            span={unidades[props.venda.unidade]}
          />
          <Label1
            label='id:'
            span={props.venda.id}
          />
        </div>

      </div>

      <div className='table1'>
        <table >
          <thead>
            <tr className='th1'>

              {
                props.titles.map((title) =>
                  <th style={{ width: title.width }}>{title.title}</th>

                )}

            </tr>
          </thead>
          <tbody className=''>
            {props.children}
          </tbody>
        </table>
      </div>


    </div>





  )

}

export function Venda0(props) {


  return (

    <div className='vendaForm'>
      <div className='vendaHeader'>
        Vendas sem registro de orçamento:

      </div>

      <div className='table1'>
        <table >
          <thead>
            <tr className='th1'>

              {
                props.titles.map((title) =>
                  <th style={{ width: title.width }}>{title.title}</th>

                )}

            </tr>
          </thead>
          <tbody className=''>
            {props.children}
          </tbody>
        </table>
      </div>


    </div>





  )

}

export function Assinaturas(props) {
  const titles = [
    { title: '*', width: '' },
    { title: 'Data', width: '' },
    { title: 'Status', width: '' },
    { title: 'Atendente', width: '' },
    { title: 'Unidade', width: '' },
    { title: 'Evolução', width: '230px' },
    { title: 'Data Evo', width: '' },
  ]

  return (

    <div className='assForm'>

      <div className='vendaHeader'>

        <div>
          <Label1
            label='Procedimento:'
            span={props.sub.nome_procedimento}
          />
          <Label1
            label='Sessões:'
            span={props.sub.qnt_sessao}
          />

          <Label1
            label='id:'
            span={props.sub.id}
          />
        </div>

      </div>
      <div className='table1'>
        <table >
          <thead>
            <tr className='th1'>

              {
                titles.map((title) =>
                  <th style={{ width: title.width }}>{title.title}</th>

                )}

            </tr>
          </thead>
          <tbody className=''>
            {props.children}
          </tbody>
        </table>
      </div>


    </div>





  )

}

export function NewSub(props) {

  const [project, setProject] = useState({ id_cliente: props.id_cliente, unidade: props.unidade, user: props.user })
  
  function alterarFechamento() {
    project.id_produto?
    fetch(`${process.env.REACT_APP_CALENDAR}/insertSub`, {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(project),
    })
      .then(() => {
        window.alert('Cadastrado!')
        props.setCurrent(0)

      })
      .catch(err => console.log(err))
   : window.alert('Selecione o procedimento...')
  }
  function handleChange(e) {
    setProject({ ...project, [e.target.name]: e.target.value })
    console.log(project)

}
function valorChange(e) {
  setProject({ ...project, ['total']: e.target.value })
  console.log(project)

}
  return (

    <div className='cliCard'>
      {project.nome?
      
      <Label1
        label='Pacote: '
        span={project.nome}
        limpar={()=>setProject({ ...project, ['nome']: '', ['id_produto']: '' })}
      />:
      <RBar
        project={project}
        setProject={setProject}
      />}
      <InputNumber
        title='Código do AZ: '
        width='140px'
        name='az'
        value={project.az}
        handleOnChange={handleChange}
      />
      <InputNumber
        title='Valor: R$'
        name='total'
        value={project.total}
        handleOnChange={handleChange}
      />
      <Button
        value='Cadastrar'
        color='#111'
        click={()=> alterarFechamento()}
      />
    </div>
  )
}

export function Historico(props) {


  return (

    <div className='vendaForm'>


      <div className='table1'>
        <table >
          <thead>
            <tr className='th1'>

              {
                props.titles.map((title) =>
                  <th style={{ width: title.width }}>{title.title}</th>

                )}

            </tr>
          </thead>
          <tbody className=''>
            {props.children}
          </tbody>
        </table>
      </div>


    </div>





  )

}


