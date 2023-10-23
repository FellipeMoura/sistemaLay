import React, { useState, useEffect } from "react";
import { Button } from "../d_inputs/Input";
import '../c_layouts/Pdf.css'


export function DisabledForm({ unidade, handleCloseModal }) {
    const [list, setList] = useState([])
    const [project, setProject] = useState({ unidade: unidade })

    useEffect(() => {

        fetch(`${process.env.REACT_APP_CALENDAR}/buscarDesativados/${unidade}`, {
            method: "GET",
            heders: {
                'Content-type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((resp2) => {
                setList(resp2)

            })
            .catch(err => console.log(err))

    }, [])

    const titles = [
        { width: '90px', title: 'Data' },
        { width: '', title: 'Nome' },
        { width: '', title: 'Procedimento' },
        { width: '50px', title: 'Hora' },
        { width: '100px', title: 'Usuário' },
        { width: '100px', title: 'Atendente' },
    ]

    return (
       
            list.length > 0 ?      
                        <div className='table1 scrolltab'>
                        <div >
                        <h2>Histórico de agendamentos desativados</h2>
                    </div>
                            <table >
                                <thead>
                                    <tr className='th1'>

                                        {

                                            titles.map((title, index) =>
                                                <th key={index} style={{ width: title.width }}>{title.title}</th>

                                            )}

                                    </tr>
                                </thead>
                                <tbody className=''>

                                    {list.map((agendamento, index) =>
                                        <tr
                                            key={index}>

                                            <td>
                                                {agendamento.data_fim ? agendamento.data_fim.substr(0, 10).split('-').reverse().join('/') : ''}
                                            </td>
                                            <td>
                                                {agendamento.nome_cliente}

                                            </td>
                                            <td>
                                                {agendamento.nome_procedimento}

                                            </td>
                                            <td>
                                                {agendamento.hora}
                                            </td>
                                            <td >
                                                {agendamento.nota}
                                            </td>
                                            <td >
                                                {agendamento.atendente}
                                            </td>

                                        </tr>
                                    )}

                                </tbody>
                            </table>
                         
                        </div>
                        

                 


             
                : <div>Nenhum agendamento encontrado..</div>
            
            
       
    )

}