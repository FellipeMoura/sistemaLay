import {useState, useEffect} from 'react'
import styles from './UserForm.module.css'
import {Select, InputMasks, Button, Radio, InputText, InputDate} from '../d_inputs/Input'


const options = [
    {id:'Masculino', name: 'Masculino'},
    {id:'Nao informado', name: 'Não informado'}    
]
const options2 = [
    {id:'solteiro',name:'Solteira(o)'},
    {id:'casado', name: 'Casada(o)'},
    {id: 'divorciado', name:'Divorciada(o)'},
    {id:'viuvo', name:'Viúva(o)'}
]

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

        if(cadastro.nasc){ cadastro.nasc =cadastro.nasc.substr(0, 10)}   
      
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
    
    function editPost(id, cadastro) {

        cadastro.nasc =cadastro.nasc.substr(0, 10)
        console.log(cadastro.nasc)
   
      
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
    
        function deleteUser(id) {

            var resp= window.confirm("Confirma a exclusão deste registro?");
            if(resp){
            
       
          
            fetch(`${process.env.REACT_APP_BACKEND}delete/${id}`,{method: "DELETE", headers: {'Content-type': 'application/json',},})
              .then(() => {
                //console.log(data);
                window.location.replace(`/`) 
                
                //redirect
              })
              .catch(err => console.log(err))
            }
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
                     <div className={styles.inline2}>
                    <Select
                        flex='column'
                        width='15em'
                        options={options2}
                        name='civil'
                        value={project.civil}
                        text= 'Estado Civil'
                        handleOnChange={handleChange}
                    />

                    <InputText
                        flex='column'
                        width='4em'
                        title="Filhos"
                        name="filhos"
                        value={project.filhos}
                        placeholder="Não"
                        handleOnChange={handleChange}
                    />
                   
                    </div>

                    <Select
                        padrao='Feminino'
                        flex='column'
                        width='10em'
                        options={options}
                        name='sexo'
                        value={project.sexo}
                        text= 'Sexo'
                        handleOnChange={handleChange}
                    />
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
                    <InputText
                        flex='column'
                        width='15em'
                        title="Profissão"
                        name="profissao"
                        value={project.profissao}
                        placeholder="Insira a profissão do paciente..."
                        handleOnChange={handleChange}
                    />
                </div>
            </div>
            <div className={styles.steps}>
            
            <Button
            color= '#be0909be'
            value='Excluir'
            click={() => deleteUser(id)}

            />
            <Button
            color= '#213e6d'
            value='Alterar'
            click={() => editPost(id, project)}

            />

            </div>

        </form>
        )
}export default EditUser