import React, { useState, useEffect } from "react";
import { useParams } from 'react-router';
import moment from "moment";
import {AtendForm} from '../b_forms/AtendForm'
import {ReturnForm} from '../b_forms/ReturnForm'
import { ClientesForm } from "../b_forms/ClientesForm";
import { PageClients } from "../c_layouts/Pages";

function Clientes(props) {
    
    const {unidade} = useParams()
     const {user} = useParams()

     const [clientes, setClientes] = useState([])
     useEffect(() => {
 
 
         fetch(`${process.env.REACT_APP_CALENDAR}/clients`, {
             method: "GET",
             heders: {
                 'Content-type': 'application/json',
             },
         })
             .then((resp) => resp.json())
             .then((resp2) => {
 
                 setClientes(resp2)
 
             })
             .catch(err => console.log(err))
 
 
     }, [])  

    return (
        <PageClients>
       <ClientesForm
            unidade={unidade}
            user={user}
            clientes={clientes}
       />

       </PageClients>
    )
}

export default Clientes