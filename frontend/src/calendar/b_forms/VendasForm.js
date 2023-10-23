import React, { useState, useEffect } from "react";
import { Button } from "../d_inputs/Input";
import './Clientes.css'
import { Venda, Venda0, NewSub } from "../c_layouts/ClientesLayout";


export default function VendasForm({ cliente, old, vendas, user, unidade, agrupar }) {


    const [assinaturas, setAssinaturas] = useState([])
    const [sub, setSub] = useState({})
    const [current, setCurrent] = useState(0)
    const titles = [

        { width: '250px', title: 'Procedimento' },
        { width: '40px', title: 'disp' },
        { width: '40px', title: 'total' },

        { width: '', title: 'id' },
    ]
    const titles2 = [

        { width: '250px', title: 'Procedimento' },
        { width: '40px', title: 'disp' },
        { width: '40px', title: 'total' },
        { width: '', title: 'Data' },
        { width: '', title: 'id' },
    ]
    const status = [
        { nome: 'Pendente', cor: '#696969' },
        { nome: 'Ativo', cor: '#0f8f2f' },
        { nome: 'Encerrado', cor: '#b60000' }
    ]
    const [modalIsOpen, setIsOpen] = useState(false)
    const customStyles = {
        content: {
            left: '50%',
            top: '50%',
            bottom: '-40%',
            right: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            overflowY: 'hidden'

            //height: '400px'

        }
    }
    function handleCloseModal() {
        setIsOpen(false)

    }

    function handleOpenModal() {

        setIsOpen(true)
    }
    function getAss(vendaSub) {
        fetch(`${process.env.REACT_APP_CALENDAR}/getAss/${vendaSub.id}`, {
            method: "GET",
            heders: {
                'Content-type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((resp2) => {
                setAssinaturas(resp2)
                setSub(vendaSub)
                handleOpenModal()

            })
            .catch(err => console.log(err))

    }
    return (
        current === 0 ?
            <div className="cliCard">
                <span style={{color:'#b83737', fontWeight:'bold'}}>Número já cadastrado e com vendas registradas!</span>

                <p>Nome: {cliente.nome} </p>
                <p> Telefone: {cliente.telefone} </p>
                <p>  id:{cliente.id}</p>
                <div style={{marginBottom: '5px'}}>
                    <Button
                        color='#777'
                        value='Agrupar'
                        click={() => agrupar()}
                    />
                </div>
                {
                    !Array.isArray(vendas) ?
                        vendas.vendas0.length > 0 ?
                            <Venda0
                                titles={titles2}
                            >
                                {vendas.vendas0.map((vendaSub, index) =>
                                    <tr
                                        key={index}>

                                        <td>
                                            {vendaSub.nome_procedimento}
                                        </td>

                                        <td
                                            className='assButton'
                                            style={{ backgroundColor: status[vendaSub.status].cor }}
                                            onClick={() => getAss(vendaSub)}
                                        >
                                            {vendaSub.status == 0 ? '-' :
                                                vendaSub.qnt_sessao - vendaSub.realizadas}
                                        </td>
                                        <td>
                                            {vendaSub.qnt_sessao}

                                        </td>
                                        <td>
                                            {vendaSub.data.substr(0, 10).split('-').reverse().join('/')}
                                        </td>
                                        <td>
                                            {vendaSub.id}
                                        </td>
                                    </tr>
                                )}

                            </Venda0>

                            : '' : ''}

                {!Array.isArray(vendas) ?
                    vendas.vendas1.map((venda, index) =>
                        <Venda
                            status={status}
                            titles={titles}
                            venda={venda}
                            index={index}
                        >
                            {venda.vendas_sub.map((vendaSub, index) =>
                                <tr
                                    key={index}>

                                    <td>
                                        {vendaSub.nome_procedimento}
                                    </td>

                                    <td
                                        className='assButton'
                                        style={{ backgroundColor: status[vendaSub.status].cor }}
                                        onClick={() => getAss(vendaSub)}
                                    >
                                        {vendaSub.status == 0 ? '-' :
                                            vendaSub.qnt_sessao - vendaSub.realizadas}
                                    </td>
                                    <td>
                                        {vendaSub.qnt_sessao}

                                    </td>
                                    <td>
                                        {vendaSub.id}
                                    </td>
                                </tr>
                            )}

                        </Venda>
                    )
                    : ''

                }

            </div>
            : <NewSub
                id_cliente={cliente.id}
                user={user}
                unidade={unidade}
            />

    )
}