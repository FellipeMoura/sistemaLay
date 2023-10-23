import React from 'react'
import { getColor } from './salaColor'

export function ProcList({ procs, setProc }) {
  const titulo = (procs[0] ?
    <tr className='thproc'>
      <th className=''>Procedimento</th>
      <th className=''>Restante</th>
      <th className=''>Valor</th>
      <th className=''>Pacote</th>
      <th className=''>id</th>
    </tr> : '')


  return (

    <div className='tableproc'>
      <table >
        <thead>
          {titulo}
        </thead>
        <tbody className=''>
          {procs.map((proc) => (

            <tr id="idproc" key={proc.id_vendas_sub} className='tdproc'>
              <td className='nomeproc' value={procs[procs.indexOf(proc)]} onClick={() => setProc(procs.indexOf(proc))}>{proc.nome || '-'}</td>
              <td className=''>{(proc.restante || '-')}</td>
              <td className=''>{(proc.valor || '-')} $</td>
              <td className=''>{(proc.id_pacote || '-')}</td>
              <td className=''>{(proc.id_vendas_sub || '-')}</td>
            </tr>
          )
          )}
        </tbody>
      </table>
    </div>





  )

}

export function SalaList({ salas, editarSala }) {
  const titulo = (salas[0] ?
    <tr className='thproc'>
      <th className=''>Índice</th>
      <th className=''>Nome</th>
      <th className=''>Quantidade</th>

    </tr> : '')


  return (

    <div className='tableproc'>
      <table >
        <thead>
          {titulo}
        </thead>
        <tbody className=''>
          {salas.map((sala) => (

            <tr 
              id="idproc"
              value={salas[salas.indexOf(sala)]}
              onClick={() => editarSala(sala.id)}
              key={sala.id_vendas_sub}
              className='tdproc'
            >
              <td className='' style={{backgroundColor: getColor(sala.id)}}>{sala.id}</td>
              <td className='nomeproc'>{(sala.nome || '-')}</td>
              <td className=''>{(sala.qnt || '-')}</td>

            </tr>
          )
          )}
        </tbody>
      </table>
    </div>





  )

}