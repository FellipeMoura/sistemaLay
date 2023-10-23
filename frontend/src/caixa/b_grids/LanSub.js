import React, { useState, useEffect } from "react";
import { Grid1 } from "../c_layouts/Grid1";
import './Caixa.css'
import SubBar from "../d_inputs/SubBar";
import { InputText, Button, Select } from "../d_inputs/Input";
import {VscSave} from 'react-icons/vsc'
function CaixaSub({ setIsSub, dataCards, setRefresh, refresh }) {

    const [total, setTotal] = useState(0)
    const [color, setColor] = useState(false)
    const [iformas, setIformas] = useState([])
    const [iparcelas, setIparcelas] = useState([{ id: '', nome: '' }])
    const[display, setDisplay] = useState('none')
    const[iproject, setIproject] =useState({
        id_os: dataCards.vendas_sub[0].venda,
        empresa: dataCards.unidade,
        valor: 0.00
    })
    const titles = [
        'Procedimento',
        'Qnt',
        'subTotal',
        'Desconto',
        'Total',
        'id'
    ]


    useEffect(() => {
        let value = 0.0
        
        if (dataCards.pagamento) {

            for (let pagamento of dataCards.pagamento) {
                value = value + parseFloat(pagamento.valor)
            }

            setTotal(value)
        }
        value == dataCards.valor.toFixed(2) ? setColor('#7dcc84')
            : value < dataCards.valor ? setColor('#e6e231')
                : setColor('#d8ba57')
        
                fetch(`${process.env.REACT_APP_CALENDAR}/buscarFormas/1`, {
                    method: "GET",
                    headers: {
                        'Content-type': 'application/json',
                    },
                })
                    .then((resp) => resp.json())
                    .then((resp2) => {
                      //  console.log(resp2[1])
                        setIformas(resp2[0])
                       
                    })
                    .catch(err => console.log(err))
                    setDisplay('none')
        // console.log(value+'-'+dataCards.valor)

        //console.log(color)
    }, [dataCards, refresh])

    function alterarFechamento(project) {
        fetch(`${process.env.REACT_APP_CALENDAR}/alterarFechamento`, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(project),
        })
            .then(() => {
                setIsSub(2)
                setRefresh(project)

            })
            .catch(err => console.log(err))
        console.log(project)
    }

    function RowSub({ dataCard }) {

        const [state, setState] = useState(true)
        const [project, setProject] = useState(dataCard)
        function handleChange(e) {
            setProject({ ...project, [e.target.name]: e.target.value })
            // console.log(project)
            // setProject({ ...project, ['total']:   })
        }


        return (
            state ? (
                <tr className='' key={dataCard.venda_sub} /*onClick={() => setState(false)}*/>
                    <td>{dataCard.procedimento}</td>
                    <td>{dataCard.sessoes}</td>
                    <td>{dataCard.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>

                    <td>{dataCard.desconto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>{dataCard.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>{dataCard.venda_sub}</td>

                </tr>
            ) : (
                <tr key={dataCard.venda_sub} style={{ backgroundColor: '#bfd7eb' }}>
                    <td><SubBar setProject={setProject} project={project} /> </td>
                    <td></td>
                    <td><InputText
                        width='90px'
                        name='valor'

                        value={project.valor}
                        handleOnChange={handleChange}

                    />
                    </td>

                    <td><InputText
                        width='90px'
                        name='desconto'
                        value={project.desconto}
                        handleOnChange={handleChange}

                    />
                    </td>
                    <td>{(parseFloat(project.valor) - parseFloat(project.desconto)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>
                        <Button
                            color='#306dc7'
                            value='Salvar'
                            click={() => alterarFechamento(project)}
                        /></td>
                </tr>
            )

        )

    }

    function RowPg({ dataCard }) {



        const [state, setState] = useState(true)
        const [project, setProject] = useState(dataCard)
       // const [formas, setFormas] = useState([])
        const [parcelas, setParcelas] = useState([{ id: '', nome: '' }])

        useEffect(() => {

            console.log(dataCard)
            fetch(`${process.env.REACT_APP_CALENDAR}/buscarFormas/${dataCard.id_forma_pagamento}`, {
                method: "GET",
                headers: {
                    'Content-type': 'application/json',
                },
            })
                .then((resp) => resp.json())
                .then((resp2) => {
                  //  console.log(resp2[1])
                    setIformas(resp2[0])
                    setParcelas(resp2[1])
                })
                .catch(err => console.log(err))
        }, [])

        function handleChange(e) {
            setProject({ ...project, [e.target.name]: e.target.value })

        }
       
        function pChange(e) {
            handleChange(e)
            console.log(e.target.value)

            fetch(`${process.env.REACT_APP_CALENDAR}/buscarParcelas/${e.target.value}`, {
                method: "GET",
                heders: {
                    'Content-type': 'application/json',
                },
            })
                .then((resp) => resp.json())
                .then((resp2) => {

                    setParcelas(resp2)
                })
                .catch(err => console.log(err))
        }

        function alterarPg(project) {
            fetch(`${process.env.REACT_APP_CALENDAR}/alterarPg`, {
                method: "PUT",
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(project),
            })
                .then(() => {
                    setIsSub(2)
                    setRefresh(project)
    
                })
                .catch(err => console.log(err))
            console.log(project)
        }
        
        function deletePg(id) {

            let resp =  window.confirm(`Confirma a exclusão do método: ${dataCard.nome_forma}?`)
            if(resp){
            fetch(`${process.env.REACT_APP_CALENDAR}/deletePg/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-type': 'application/json',
                },
               
            })
                .then(() => {
                    setIsSub(2)
                    setRefresh(id)
    
                })
                .catch(err => console.log(err))
            console.log(project)
        }else{
           
            setState(true)
        }
    
    }


        return (
            dataCard.valor ?
                state ? (
                    // <p onClick={() => setState(false)} className="hover"><label>{parseFloat(dataCard.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </label>- {dataCard.nome_forma}</p>
                    <tr className='hover' key={dataCard.id} onClick={() => setState(false)}>
                        

                        <td>{dataCard.nome_forma}</td>
                        <td>{parseFloat(dataCard.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                        <td>{dataCard.nome_itens}</td>
                    </tr>
                ) : (
                    <tr style={{ backgroundColor: '#acaaaa' }}>
                        
                        <td>
                            <Select
                                name='id_forma_pagamento'
                                value={project.id_forma_pagamento}
                                options={iformas}
                                handleOnChange={pChange}

                            />
                        </td>
                        <td>
                            <InputText
                                name='valor'
                                value={project.valor}
                                handleOnChange={handleChange}
                            />
                        </td>
                        <td>
                            <Select
                                name='itens_qnt'
                                value={project.itens_qnt}
                                options={parcelas}
                                handleOnChange={handleChange}

                            />
                        </td>
                        <td>
                        <Button
                            color='#306dc7'
                            value= 'Salvar'
                            click={() => alterarPg(project)}
                        />
                        <Button
                            color='#a11a1a'
                            value= 'Excluir'
                            click={() => deletePg(dataCard.id)}
                        /></td>

                    </tr>
                )
                : ''
        )

    }

    useEffect(() => {



    }, [])

    function handleChange(e) {
        setIproject({ ...iproject, [e.target.name]: e.target.value })

    }
   
    function pChange(e) {
        handleChange(e)
        console.log(e.target.value)

        fetch(`${process.env.REACT_APP_CALENDAR}/buscarParcelas/${e.target.value}`, {
            method: "GET",
            heders: {
                'Content-type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((resp2) => {

                setIparcelas(resp2)
            })
            .catch(err => console.log(err))
    }

    function insertPg(project) {
        fetch(`${process.env.REACT_APP_CALENDAR}/insertPg`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(project),
        })
            .then(() => {
                setIsSub(2)
                setRefresh(project)

            })
            .catch(err => console.log(err))
        console.log(project)
    }


    return (
        color ?
            <div className="subGrid">
                <div className="headerSub">
                    <div className="inline2">
                        <p>Cliente:<label>{dataCards.vendas_sub[0].nome}</label></p>

                        <p>Caixa:<label>{dataCards.vendas_sub[0].caixa}</label></p>
                    </div>
                    <div className="inline2">
                        <p>Venda:<label>{dataCards.vendas_sub[0].venda}</label></p>
                        <p>Avaliadora:<label>{dataCards.vendas_sub[0].avaliadora}</label></p>
                    </div>

                </div>

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
                            {dataCards.vendas_sub[1].map((dataCard) =>

                                <RowSub dataCard={dataCard} />
                            )}
                            <tr className='hover' style={{ backgroundColor: color }}>


                                <td ></td>
                                <td ></td>
                                <td ></td>

                                <td ><label>Total</label></td>
                                <td><label> {dataCards.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </label></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="pgGrid">
                <div className="inline1 ">
                <h2>Forma de Pagamento </h2>
                
                    <button
                    onClick={()=>setDisplay('table-row')}
                    >
                        Adicionar
                        </button>

                
                </div>
                <div className="table">
                    <table>
                        <thead>
                            <tr>
                            <th> Tipo</th>
                                <th> Valor</th>
                           

                                <th> Parcelas</th>


                            </tr>
                        </thead>
                        <tbody>
                        <tr  style={{ backgroundColor: '#acaaaa', display:display }}>
                        
                        <td>
                            <Select
                                name='id_pagamento'
                                value={iproject.id_pagamento}
                                options={iformas}
                                handleOnChange={pChange}

                            />
                        </td>
                        <td>
                            <InputText
                                name='valor'
                                value={iproject.valor}
                                handleOnChange={handleChange}
                            />
                        </td>
                        <td>
                            <Select
                                name='qnt'
                                value={iproject.qnt}
                                options={iparcelas}
                                handleOnChange={handleChange}

                            />
                        </td>
                        <td>
                        <Button
                            color='#158154'
                            value='Incluir'
                            click={() => insertPg(iproject)}
                        />
                        <Button
                            color='#555151'
                            value='Voltar'
                            click={() => setDisplay('none')}
                        />
                        </td>

                    </tr>
                            {dataCards.pagamento.map(pagamento =>

                                <RowPg dataCard={pagamento} />
                            )}
                            
                            <tr style={{ backgroundColor: color }}>
                            <td>Total </td>
                                <td> {parseFloat(total).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                           

                                <td> </td>


                            </tr>
                        </tbody>
                    </table>
                </div >
                </div>
            </div>
            : ''
    )
} export default CaixaSub