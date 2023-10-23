import React, { useState, useEffect } from "react";
import { Grid1 } from "../c_layouts/Grid1";
import { AiOutlineEdit } from 'react-icons/ai'

function CaixaVenda({ refresh, displaySub, vendas }) {

    const [dataCards, setDataCards] = useState(vendas)
    const titles = [
        'Data',
        'Hora',
        'Nome',
        'Valor',
        'Unidade'

    ]
    // const [colorV, setColorV] = useState('')


    const unidades = [
        '0',
        'Matriz' ,
        'Bueno',
        'Goiânia',
        'Orion' ,    
        'Campinas'
        
    ]
    useEffect(() => {
     
        setDataCards(vendas)
   

    }, [vendas, refresh])




    return (
        <div className="bodyVenda">

            <div className="table">
                <table>
                    <thead>
                        <tr>
                            {titles.map((title) =>
                                <th key={title}>{title}</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {dataCards[0].map((dataCard) =>

                            <tr key={dataCard.nome+dataCard.hora} className='hover' onClick={() => displaySub(dataCard, true)}>
                                <td className="">{dataCard.data.toString()}</td>
                                
                                <td className="center" >{dataCard.hora}</td>
                                <td >{dataCard.nome}</td>

                                <td>{dataCard.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                <td >{unidades[dataCard.unidade]}</td>
                            </tr>
                        )}
                        <tr className='hover1' style={{position: 'sticky', bottom: '1px', backgroundColor: '#bfd7eb'}} onClick={() => displaySub(vendas, false)}>


                            <td ></td>
                            <td ></td>
                            <td >Valor Total</td>
                            <td> {vendas[1].total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                            <td ></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
} export default CaixaVenda