import { useState } from 'react'
import { InputText, InputDate, InputMasks, Button, Radio } from '../d_inputs/Input'

import styles from './UserForm.module.css'


function CreateForm({ createPost, createRecord, projectData }) {

    const [project, setProject] = useState(projectData || {})
    const options = ['Feminino', 'Masculino', 'Não Informado']

    function createPost(cadastro) {


        fetch("http://localhost:3333/api/user", {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(cadastro),
        })
            .then((resp) => resp.json()).then((data) => {
                createRecord(data.result.id)
                window.alert(`Usuário Cadastrado!`)
                window.location.replace("/")

            })
            .catch(err => console.log(err))
    }

    function createRecord(id) {
        var data = new Date();
        var dia = String(data.getDate()).padStart(2, '0');
        var mes = String(data.getMonth() + 1).padStart(2, '0');
        var ano = data.getFullYear();
        var dataAtual = ano + '-' + mes + '-' + dia;
        //console.log(dataAtual);

        const formTemplate = {
            iduser: id, inicio: dataAtual, aa: '', ab: '', ac: '',
            ba: 'Normal', bb: 'Normal', bc: "Cooperativo",
            bd1: 1, bd2: 1, bd3: 1, bd4: 1,
            be: 'Normal', bf: 'Normal', bg: 'Coerente', bh: 'Normal', bi: 'Normal', bj: 'Normal',
            bk1: 0, bk2: 0, bk3: 0, bk4: 0, bk5: 0, bk6: 0, bk7: 0, bl: 'Normal', bm: 'sim', ca: "Ainda não há.", obs: ''
        }
        //console.log(formTemplate);


        fetch("http://localhost:3333/api/record", {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(formTemplate),
        })
            .then((resp) => resp.json()).then((data) => {
                console.log(data);
                //window.location.replace("/prontuarios")

                //redirect
            })
            .catch(err => console.log(err))
    }

    function handleChange(e) {
        setProject({ ...project, [e.target.name]: e.target.value })
        console.log(project)

    }

    return (
        <form className={styles.form}>
            <h1>Novo Cadastro</h1>
            <div className={styles.steps}>
                <div className={styles.step}>
                    <InputText
                        flex='column'
                        width='25em'
                        title="Nome"
                        name="name"
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
                        placeholder="Insira o telefone do paciente..."
                        handleOnChange={handleChange}
                    />
                    <InputMasks
                        flex='column'
                        mask='2'
                        title="Nº de Emergencia"
                        name="etel"
                        placeholder="Insira um telefone para emergências..."
                        handleOnChange={handleChange}
                    />
                    <InputText
                        flex='column'
                        width='25em'
                        title="Endereço"
                        name="endereco"
                        placeholder="Insira o endereço do paciente..."
                        handleOnChange={handleChange}
                    />
                    <InputText
                        flex='column'
                        width='20em'
                        title="E-mail"
                        name="email"
                        placeholder="Insira o e-mail do paciente..."
                        handleOnChange={handleChange}
                    />
                </div>
            </div>
            <div className={styles.steps}>

                <Button
                    color="#930000"
                    value='Voltar'
                    click={() => window.location.replace('/')}
                />
                <Button
                    color="#447461"
                    value='Cadastrar'
                    click={(e) => createPost(project)}
                />

            </div>
        </form>
    )
} export default CreateForm