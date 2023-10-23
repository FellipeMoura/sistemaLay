import React, { useState, useEffect } from "react";
import { Grid1 } from "../c_layouts/Grid1";
import './Caixa.css'

function CaixaPg({ vendasD }) {
    const [vendas, setVendas] = useState(vendasD)
    // console.log(dataCards)
    const [total, setTotal] = useState(0)
    const [color, setColor] = useState(false)
    useEffect(() => {
        setVendas(vendasD)
        // console.log(vendasD)
        let soma = 0.0
        if (vendasD[1]) {
            for (let pagamento of vendasD[1].pagamentos) {
                soma += parseFloat(pagamento.soma)
            }
            //   console.log('total:'+soma)

            soma.toFixed(2) == vendasD[1].total.toFixed(2) ? setColor('#7dcc84')
                : soma < vendasD[1].total ? setColor('#e6e231')
                    : setColor('#dd884e')
        }

        setTotal(soma)
    }, [vendasD])
    return (
        vendas[1] ?
            <div className="">


                Formas de pagamento:

                <div className="table">
                    <table>
                        {vendasD[1].pagamentos.map(pagamento =>
                            <tr>
                                <td>
                                    {pagamento.nome_forma}
                                </td>
                                <td>
                                    {parseFloat(pagamento.soma).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </td>
                            </tr>

                        )}

                        <tr>
                            <td>
                                Soma
                            </td>
                            <td>
                                {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Valor Vendas
                            </td>
                            <td style={{ backgroundColor: color }}>
                                {vendasD[1].total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </td>
                        </tr>
                    </table>

                </div>
                {vendas[2].length > 0 ?
                    <div>
                        <span>Crediário:</span>
                        <div className="table">
                            <table>
                                {vendas[2].map(cred =>
                                    <tr>
                                        <td>
                                            {cred.qnt + 'x'}
                                        </td>
                                        <td>
                                            {parseFloat(cred.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                        </td>

                                    </tr>

                                )}

                                <tr>
                                    <td>

                                        Total:
                                    </td>
                                    <td>
                                        {vendas[1].totalCred.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                    </td>
                                </tr>

                            </table>

                        </div>
                    </div>
                    : ''}

            </div>
            : ''
    )
} export default CaixaPg