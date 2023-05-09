import {useState, useEffect} from 'react'
import styles from './UserForm.module.css'
import {InputMasks, Button, Radio, InputText, InputDate} from '../d_inputs/Input'


const options = ['Feminino','Masculino','Não Informado' ]

function EditUser({id, idrecord}){
    

    useEffect(() => {
        
        fetch(`${process.env.REACT_APP_BACKEND}user/${id}`,{
        method: "GET",
        heders:{
            'Content-type': 'application/json',
        },
        })
        .then((resp) => resp.json())
        .then((resp2) => {
        
        setProject(resp2.result)
        })            
        .catch(err => console.log(err))

        
        
    }, [])
    //console.log(user)
    const [project, setProject] = useState({})

    function handleChange(e) {
        setProject({...project, [e.target.name]: e.target.value })
        console.log(project)
    }

    
    function editPost(id, cadastro) {
   
      
        fetch(`${process.env.REACT_APP_BACKEND}update/${id}`,{
            method: "PUT",
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify(cadastro),
        })
          .then((resp) => resp.json()).then((data) => {
            //console.log(data);
              window.alert("Cadastrado alterado!")
              window.location.replace(`/prontuario/${id}/${idrecord}/1`)
            
            //redirect
          })
          .catch(err => console.log(err))
        }

    return(
        <form className={styles.form}>
            <div className={styles.steps}>
                <div className={styles.step}>
                    <InputText
                        flex='column'
                        width='25em'
                        title="Nome"
                        name="name"
                        value={project.name}
                        placeholder="Insira o nome do paciente..."
                        handleOnChange={handleChange}
                    />
                    <InputMasks
                        flex='column'
                        mask='1'
                        title="CPF"
                        name="cpf"
                        value={project.cpf}
                        placeholder="Insira o CPF do paciente..."
                        handleOnChange={handleChange}

                    />

                    <InputDate
                        flex='column'
                        title="Data de nascimento"
                        name="nasc"
                        value={project.nasc ? project.nasc.substr(0,10): ''}
                        handleOnChange={handleChange}
                    />
                    <div className='radiosContainer'>
                        <Radio
                            name="sexo"
                            title="Sexo"
                            data={project.sexo}
                            values={options}
                            handleOnChange={handleChange}
                        />
                    </div>
                </div>
                <div className={styles.step}>
                    <InputMasks
                        flex='column'
                        mask='2'
                        title="Telefone"
                        name="tel"
                        value={project.tel}
                        placeholder="Insira o telefone do paciente..."
                        handleOnChange={handleChange}
                    />
                    <InputMasks
                        flex='column'
                        mask='2'
                        title="Nº de Emergencia"
                        name="etel"
                        value={project.etel}
                        placeholder="Insira um telefone para emergências..."
                        handleOnChange={handleChange}
                    />
                    <InputText
                        flex='column'
                        width='25em'
                        title="Endereço"
                        name="endereco"
                        value={project.endereco}
                        placeholder="Insira o endereço do paciente..."
                        handleOnChange={handleChange}
                    />
                    <InputText
                        flex='column'
                        width='20em'
                        title="E-mail"
                        name="email"
                        value={project.email}
                        placeholder="Insira o e-mail do paciente..."
                        handleOnChange={handleChange}
                    />
                </div>
            </div>
            <div className={styles.steps}>
            
            <Button
            color= '#213e6d'
            value='Alterar'
            click={() => editPost(id, project)}

            />  

            </div>

        </form>
        )
}export default EditUser