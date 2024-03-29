import moment from "moment"


export function agendar(cadastro, confirm) {

    //   var value2 = cadastro.confirm == 0 ? 1 : 0
    //let resp = window.confirm(`Deseja ocultar a ${props.atendente} atendente da agenda?`)
    // if (resp) {

    //console.log(`${process.env.REACT_APP_CALENDAR}/agendar/${cadastro.id_venda_sub}/${cadastro.data.substr(0, 10)}/${confirm}/${cadastro.atendente}`)
    fetch(`${process.env.REACT_APP_CALENDAR}/agendar/${cadastro.id_venda_sub}/${cadastro.data.substr(0, 10)}/${confirm}/${cadastro.atendente}`, {
        method: "PUT",
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(cadastro),
    })
        .then((resp) => resp.json()).then((data) => {


        })
        .catch(err => console.log(err))

}




export function insertA(id, old, cadastro, unidade, user, inputClose) {
    cadastro.unidade = unidade
    cadastro.user = user
    if (old.id_venda_sub == 3) {
        deleteB(old)
    }
    let resp
    if (cadastro.nome_cliente && (cadastro.sala || cadastro.sala == 0) && cadastro.procedimento) {
        if(cadastro.data == moment().format('YYY-MM-DD')){
        resp = window.confirm('Enviar lembrete de agendamento?')
}

        if (resp) {
            cadastro.mens_enviada = 1
        } else {
            cadastro.mens_enviada = 2
        }

        fetch(`${process.env.REACT_APP_CALENDAR}/maestrin`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(cadastro),
        })
            .then((resp) => resp.json()).then((data) => {
                //  agendar(cadastro, 1)
                window.alert(`Cadastrado!`)
                inputClose()
                //window.location.replace(`/calendar/${unidade}/${cadastro.data}/${user}`)
            })
            .catch(err => console.log(err))


    } else {
        window.alert(`Erro! Cliente: ${cadastro.nome_cliente || 'vazio'}, procedimento: ${cadastro.procedimento || 'vazio'}`)

    }
}

export function insertB(id, cadastro, unidade, user, inputClose) {
    cadastro.id_venda_sub = 2
    cadastro.atendente = 'Anestesico'
    cadastro.unidade = unidade
    cadastro.user = user
    cadastro.procedimento = 3
    cadastro.nome_procedimento = 'Anestésico'
    console.log(cadastro)

    id > 0 ? window.alert("Horário ocupado! Exclua este agendamento ou acrescente um novo") :
        cadastro.nome_cliente ?

            (fetch(`${process.env.REACT_APP_CALENDAR}/maestrin`, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(cadastro),
            })
                .then((resp) => resp.json()).then((data) => {
                    window.alert(`Cadastrado!`)
                    inputClose()
                })
                .catch(err => console.log(err)))


        : window.alert('erro')
}

export function insertC(cadastro, unidade, user, inputClose) {


    var resp = window.confirm('Deseja abrir este horário?')

    if (resp) {
        cadastro.id_venda_sub = 3;
        cadastro.nome_cliente = 'Aberto';
        cadastro.unidade = unidade;
        cadastro.user = user;
        cadastro.procedimento = 2;
        cadastro.id_cliente = 135;
        (fetch(`${process.env.REACT_APP_CALENDAR}/maestrin`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(cadastro),
        })
            .then((resp) => resp.json()).then((data) => {

                inputClose()
            })
            .catch(err => console.log(err)))
    }

}

export function alterarAgenda(isEdit, cadastro) {
    cadastro.assinado = isEdit.assinado
    cadastro.hora_fim = moment(`2020.05.05 ${cadastro.hora}`).add(isEdit.duracao, 'minutes').format('HH:mm')
    //console.log(cadastro)
    //let resp = window.confirm(`Deseja ocultar a ${props.atendente} atendente da agenda?`)
    // if (resp) {

    //console.log(`${process.env.REACT_APP_CALENDAR}/agendar/${cadastro.id_venda_sub}/${cadastro.data.substr(0, 10)}/${confirm}/${cadastro.atendente}`)
    fetch(`${process.env.REACT_APP_CALENDAR}/alterarAgenda/${isEdit.id}`, {
        method: "PUT",
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(cadastro),
    })
        .then(() => {

            // 
        })
        .catch(err => console.log(err))

}

export function editarA(cadastro, inputClose) {
    console.log(cadastro)
    //let resp = window.confirm(`Deseja ocultar a ${props.atendente} atendente da agenda?`)
    // if (resp) {

    //console.log(`${process.env.REACT_APP_CALENDAR}/agendar/${cadastro.id_venda_sub}/${cadastro.data.substr(0, 10)}/${confirm}/${cadastro.atendente}`)
    fetch(`${process.env.REACT_APP_CALENDAR}/alterar`, {
        method: "PUT",
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(cadastro),
    })
        .then(() => {

            window.alert(`Agenda atualizada!`)
            inputClose()
        })
        .catch(err => console.log(err))

}

export function editarSala(cadastro, inputClose) {

    //console.log(`${process.env.REACT_APP_CALENDAR}/agendar/${cadastro.id_venda_sub}/${cadastro.data.substr(0, 10)}/${confirm}/${cadastro.atendente}`)
    fetch(`${process.env.REACT_APP_CALENDAR}/alterarSala`, {
        method: "PUT",
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(cadastro),
    })
        .then(() => {

            window.alert(`Agenda atualizada!`)
            inputClose()
        })
        .catch(err => console.log(err))

}



export function deleteA(project, inputClose, user) {
    var resp
    // console.log(project)
    if (project.nome_cliente === 'Aberto') {
        fetch(`${process.env.REACT_APP_CALENDAR}/delete5/${project.id}`, {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json',
            },
        })
            .then((resp) => resp.json()).then((data) => {
                
                inputClose()
            })
            .catch(err => console.log(err))
    }else if (project.nome_cliente === 'bloqueio') {
        resp = window.confirm("Deseja Reabrir?")
        if (resp) {

            fetch(`${process.env.REACT_APP_CALENDAR}/delete5/${project.id}`, {
                method: "DELETE",
                headers: {
                    'Content-type': 'application/json',
                },
            })
                .then((resp) => resp.json()).then((data) => {
                    if (project.nome_cliente) {
                        desmarcar(project)

                    }
                    inputClose()
                })
                .catch(err => console.log(err))
        }

    } else {
        resp = window.confirm("Deseja desativar este registro?")
        
        if (project.nome_cliente) {
            desmarcar(project)
        }

        if (resp) {    

            project.nota = user       
            project.data_fim = project.data  
                
            fetch(`${process.env.REACT_APP_CALENDAR}/desativarRegistro`, {
                method: "PUT",
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(project),
            })
                .then(() => {          
                    inputClose()
                })
                .catch(err => console.log(err))
        }

    }
}

export function deleteB(project) {

    fetch(`${process.env.REACT_APP_CALENDAR}/delete5/${project.id}`, {
        method: "DELETE",
        headers: {
            'Content-type': 'application/json',
        },
    })
        .then((resp) => resp.json())
        .catch(err => console.log(err))

}

export function deleteSala(id, inputClose) {

    let resp = window.confirm("Confirma a exclusão desta Sala?")
    if (resp) {

        fetch(`${process.env.REACT_APP_CALENDAR}/deleteSala/${id}`, {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json',
            },
        })
            .then((resp) => resp.json()).then((data) => {

                inputClose()
            })
            .catch(err => console.log(err))
    }
}


export function fecharA(cadastro, unidade, user, inputClose) {
    if (cadastro.unidade > 0) { window.alert('Exclua este registro primeiro.') } else {

        cadastro.nome_cliente = 'bloqueio';
        if (!cadastro.nota) { cadastro.nota = 'fechado' }
        cadastro.id_cliente = 135;
        cadastro.procedimento = 4;
        cadastro.id_venda_sub = 1;
        cadastro.unidade = unidade;
        cadastro.user = user

        fetch(`${process.env.REACT_APP_CALENDAR}/maestrin`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(cadastro),
        })
            .then((resp) => resp.json()).then((data) => {
                //  console.log(data.result)
                inputClose()

            })
            .catch(err => console.log(err))
    }


}



export function confirmarAgenda(cadastro, inputClose) {

    var value2 = cadastro.confirm == 0 ? 1 : 0

    fetch(`${process.env.REACT_APP_CALENDAR}/confirmarAgenda/${cadastro.id_cliente}/${cadastro.data.substr(0, 10)}/${value2}/${cadastro.id_venda_sub}`, {
        method: "PUT",
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(),
    })
        .then((resp) => resp.json()).then((data) => {
            // agendar(cadastro, value2)
            // window.alert(cadastro.confirm == 0 ? "Horário confirmado!" : "Confirmação pendente!")

            inputClose()
            // history.push(`/prontuario/${id}/${idrecord}/1`)
            //redirect
        })
        .catch(err => console.log(err))
    //    }
}

function desmarcar(cadastro) {
    //   var value2 = cadastro.confirm == 0 ? 1 : 0
    //let resp = window.confirm(`Deseja ocultar a ${props.atendente} atendente da agenda?`)
    // if (resp) {

    //console.log(`${process.env.REACT_APP_CALENDAR}/agendar/${cadastro.id_venda_sub}/${cadastro.data.substr(0, 10)}/${confirm}/${cadastro.atendente}`)
    fetch(`${process.env.REACT_APP_CALENDAR}/desmarcar/${cadastro.id_venda_sub}/${cadastro.data.substr(0, 10)}`, {
        method: "PUT",
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(cadastro),
    })
        .then((resp) => resp.json()).then((data) => {


        })
        .catch(err => console.log(err))

}

export function buscarUltimo(unidade) {

    let result = {}
    fetch(`${process.env.REACT_APP_CALENDAR}/buscarUltimo/${unidade}`, {
        method: "GET",
        heders: {
            'Content-type': 'application/json',
        },
    })
        .then((resp) => resp.json())
        .then((resp2) => {

            result = resp2
            // console.log(result)
            // return( result)

        })
        .catch((err) => { return err })
        .then(() => { return result })


}

