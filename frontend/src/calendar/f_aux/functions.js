import Anestesic from "../c_layouts/Anestesic"

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




export function insertA(id, old, cadastro, unidade, user) {
    cadastro.unidade = unidade
    cadastro.user = user
    if(old.id_venda_sub == 3){
        deleteB(old)
    }
    id > 0 && old.id_venda_sub != 3 ? window.alert("Horário ocupado! Exclua este agendamento ou acrescente um novo") :
        cadastro.nome_cliente && (cadastro.sala || cadastro.sala == 0) && cadastro.procedimento ?


            (
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
                        window.location.replace(`/calendar/${unidade}/${cadastro.data}/${user}`)
                    })
                    .catch(err => console.log(err))

            )

            : window.alert(`Erro! Cliente: ${cadastro.nome_cliente || '?'}, procedimento: ${cadastro.procedimento || '?'}, aparelho: ${cadastro.sala}`)
}

export function insertB(id, cadastro, unidade, user) {
    cadastro.id_venda_sub = 2
    cadastro.atendente = 'Anestesico'
    cadastro.unidade = unidade
    cadastro.user = user
    cadastro.procedimento = 3

    id > 0 ? window.alert("Horário ocupado! Exclua este agendamento ou acrescente um novo") :
        cadastro.nome_cliente && cadastro.procedimento ?

            (fetch(`${process.env.REACT_APP_CALENDAR}/maestrin`, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(cadastro),
            })
                .then((resp) => resp.json()).then((data) => {
                    window.alert(`Cadastrado!`)
                    window.location.replace(`/calendar/${unidade}/${cadastro.data}/${user}`)
                })
                .catch(err => console.log(err)))



       /* (fetch(`${process.env.REACT_APP_CALENDAR}/agendar/${cadastro.id_venda_sub}/${cadastro.data}`, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(cadastro),
        })
            .then((resp) => resp.json()).then((data) => {

                console.log(data.result)
                

            })
            .catch(err => console.log(err)))

       */ : window.alert('erro')
}

export function insertC(disp, cadastro, unidade, user) {

    if (disp == 0) {
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
                    
                    window.location.replace(`/calendar/${unidade}/${cadastro.data}/${user}`)
                })
                .catch(err => console.log(err)))
        }
    }
}

export function alterarAgenda(id, cadastro) {
    //   var value2 = cadastro.confirm == 0 ? 1 : 0
    //let resp = window.confirm(`Deseja ocultar a ${props.atendente} atendente da agenda?`)
    // if (resp) {

    //console.log(`${process.env.REACT_APP_CALENDAR}/agendar/${cadastro.id_venda_sub}/${cadastro.data.substr(0, 10)}/${confirm}/${cadastro.atendente}`)
    fetch(`${process.env.REACT_APP_CALENDAR}/alterarAgenda/${id}`, {
        method: "PUT",
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(cadastro),
    })
        .then(() => {
           
           // window.location.replace(`/calendar/${cadastro.unidade}/${cadastro.data}/${user}`)
        })
        .catch(err => console.log(err))

}


export function deleteA(project, unidade, user) {
    var resp
    // console.log(project)
    (project.nome_cliente === 'bloqueio' ?
        resp = window.confirm("Deseja Reabrir?") :
        resp = window.confirm("Confirma a exclusão deste registro?"))
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
                window.location.replace(`/calendar/${unidade}/${project.data.substr(0, 10)}/${user}`)
            })
            .catch(err => console.log(err))
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

export function fecharA(cadastro, unidade, user, nota) {
    if (cadastro.id_venda_sub > 0) { window.alert('Exclua este registro primeiro.') } else {
        cadastro.nome_procedimento = nota
        cadastro.nome_cliente = 'bloqueio';
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
                window.location.replace(`/calendar/${unidade}/${cadastro.data}/${user}`)

            })
            .catch(err => console.log(err))
    }


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
        .catch((err) =>{ return err})
        .then(()=>{return result})

        
}

