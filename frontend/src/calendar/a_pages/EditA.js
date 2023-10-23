import React, { useState, useEffect } from "react";
import { useParams } from 'react-router';
import moment from "moment";
import {AtendForm} from '../b_forms/AtendForm'
import {ReturnForm} from '../b_forms/ReturnForm'
import { NewAten } from "../c_layouts/NewAten";
import { ReturnButton } from "../d_inputs/LogoutButton";

function EditA() {
    const {atendente} = useParams()
    const {unidade} = useParams()
    const [atendentes, setAtendentes ] = useState([])
    const {user} = useParams()

    useEffect(() => {
        //console.log(unidade)
        
        fetch(`${process.env.REACT_APP_CALENDAR}/atendentes/${unidade+90}`,{
        method: "GET",
        heders:{
            'Content-type': 'application/json',
        },
        })
        .then((resp) => resp.json())
        .then((resp2) => {
            
            setAtendentes(resp2)
        })             
        .catch(err => console.log(err))

        
        
    }, [])   

    return (
        <div className="editA">
            
        <AtendForm
            unidade = {unidade}
            atendente={atendente}
            user={user}

        />

        <NewAten
        unidade = {unidade}
        
        user={user}
        />

        <ReturnForm 
            unidade = {unidade}
            atendentes = {atendentes}
            user={user}
        />
        <ReturnButton
            event={()=>window.location.replace(`/calendar/${unidade}/${user}`)}
        />
        </div>
    )
}

export default EditA