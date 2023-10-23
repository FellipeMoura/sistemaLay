import React, { useState, useEffect } from "react";
import { useParams } from 'react-router';
import './Pages.css'
import moment from "moment";
import CaixaVenda from "../b_grids/CaixaVenda";
import CaixaSub from "../b_grids/CaixaSub";
import { Button, InputDate, Select } from "../d_inputs/Input";
import CaixaPg from "../b_grids/CaixaPg";
import CrediarioGrid from "../b_grids/CrediarioGrid";
import { NavBar } from "../c_layouts/NavBar";


function CaixaPage({admin}) {
    const { unidade } = useParams()
    const { user } = useParams()
    const [vendasSub, setVendasSub] = useState([])
    const [pg, setPg] = useState([])
    const [vendas, setVendas] = useState([])
    const [isSub, setIsSub] = useState(2)
    const [data, setData] = useState({ data: moment().format('YYYY-MM-DD'), fim: moment().format('YYYY-MM-DD'), unidade: unidade })
    const [refresh, setRefresh] = useState({})
    useEffect(() => {

        fetch(`${process.env.REACT_APP_CALENDAR}/buscarVenda/${data.data}/${data.fim}/${data.unidade}`, {
            method: "GET",
            heders: {
                'Content-type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((resp2) => {
                //     console.log(resp2[0][0])
                setVendas(resp2)
            })
            .catch(err => console.log(err))

    }, [data, refresh])

    function handleChange(e) {

        if (e.target.name === 'data' && data.fim < e.target.value) {

            setData({ ...data, ['data']: e.target.value, ['fim']: e.target.value })

        } else if (e.target.name === 'fim' && e.target.value < data.data) {

            setData({ ...data, ['data']: e.target.value, ['fim']: e.target.value })


        } else {
            setData({ ...data, [e.target.name]: e.target.value })
        }



    }

    const unidades = [

        { id: 1, nome: 'Matriz' },
        { id: 3, nome: 'Goiânia Shopping' },
        { id: 4, nome: 'Orion' },
        { id: 5, nome: 'Campinas' },
        { id: 100, nome: 'Tudo' }

    ]

    function displaySub(item, sub) {
        if (sub) {

            setVendasSub(item)
            setIsSub(1)
        } else {
            setPg(item)
            setIsSub(2)

        }



    }

    const forms = [
        <CaixaVenda
            vendas={vendas}
            displaySub={displaySub}
        />,
        <CaixaSub
            setIsSub={setIsSub}
            refresh={refresh}
            displaySub={displaySub}
            setRefresh={setRefresh}
            dataCards={vendasSub}
            admin={admin}

        />,
        <CaixaPg
            vendasD={vendas}

        />,
        <CrediarioGrid />
    ]

    const caixa = (
        <div className="caixaPage">
            {Array.isArray(vendas[0]) ?
                forms[0]
                : ''}
            {forms[isSub]}
        </div>
    )

    const crediario = (
        <CrediarioGrid />
    )

    const steps = [caixa, crediario]


    const [step, setStep] = useState(0)

    return (
        <div>
            <div className="caixaHeader">
                <div className="inline1">
                    <Select
                        options={unidades}
                        name='unidade'
                        value={data.unidade}
                        handleOnChange={handleChange}
                    />


                    <InputDate

                        name='data'
                        value={data.data}
                        handleOnChange={handleChange}
                    />
                    <InputDate

                        name='fim'
                        value={data.fim}
                        handleOnChange={handleChange}
                    />
                </div>


            </div>
            {steps[step]}
        </div>
    )
}

export default CaixaPage