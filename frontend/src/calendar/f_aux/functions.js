import Anestesic from "../c_layouts/Anestesic"

export function insertA(id, cadastro, unidade, user) {
    cadastro.unidade=unidade
    cadastro.user=user
    id > 0 ? window.alert("Horário ocupado! Exclua este agendamento ou acrescente um novo"): 
    cadastro.nome_cliente && cadastro.sala && cadastro.procedimento ?


        ( 
            fetch(`${process.env.REACT_APP_CALENDAR}/maestrin`, {
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
            .catch(err => console.log(err))
        
        )

        

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

       */ : window.alert(`Erro! Cliente: ${cadastro.nome_cliente|| '?'}, procedimento: ${cadastro.procedimento|| '?'}, aparelho: ${cadastro.sala|| '?'}`)
}

export function insertB(id, cadastro, unidade, user) {
    cadastro.id_venda_sub = 2
    cadastro.atendente = 'Anestesico'
    cadastro.unidade = unidade
    cadastro.user= user
    cadastro.procedimento = 3

    id > 0 ? window.alert("Horário ocupado! Exclua este agendamento ou acrescente um novo"): 
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

export function deleteA(project, unidade, user) {
    var resp
       // console.log(project)
        ( project.nome_cliente === 'bloqueio' ? 
        resp = window.confirm("Deseja Reabrir?")  :
        resp = window.confirm("Confirma a exclusão deste registro?"))
    if (resp) {

        fetch(`${process.env.REACT_APP_CALENDAR}/delete5/${project.id}`, {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json',
            },
        })
            .then((resp) => resp.json()).then((data) => {
                window.location.replace(`/calendar/${unidade}/${project.data.substr(0,10)}/${user}`)
            })
            .catch(err => console.log(err))
    }
}

export function fecharA(cadastro, unidade, user) {
    if(cadastro.id_venda_sub > 0){ window.alert('Exclua este registro primeiro.')}else{
    
    cadastro.nome_cliente = 'bloqueio';
    cadastro.id_cliente= 135;
    cadastro.procedimento=4;
    cadastro.id_venda_sub=1;
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