import "./BForm.css"
import { Checkbox, InputText } from '../../d_inputs/Input'
import Radio from '../../d_inputs/RadioA'


const BForm = ({ data, updateField }) => {
    const opc = ['Cooperativo', 'Indiferente', 'Resistente']
    const opd = ['Autopsíquica', 'Alopsíquica', 'Temporal', 'Espacial']
    const ope = ['Normal', 'Hipervigilância', 'Hipovigilância']
    const opf = ['Normal', 'Hipertenacidade', 'Hipotenacidade']
    const opg = ['Coerente', 'Incoerente', 'Desconexo', 'Conexo']
    const oph = ['Normal', 'Alucinação']
    const opi = ['Normal', 'Acelerado', 'Retardado', 'Fuga', 'Bloqueio', 'Prolixo', 'Descarrilamento']
    const opj = ['Normal', 'Disartrias', 'Afasias', 'Parafasia', 'Neologismo', 'Mussitação', 'Logorréia', 'Para-respostas']
    const opk = ['Distimia', 'Angústia', 'Ansiedade', 'Irritabilidade', 'Medo', 'Ambivalência afetiva', 'Pânico']
    const opl = ['Normal', 'Exaltado', 'Baixa de humor', 'Quebra súbita...']
    const opm = ['sim', 'parcialmente', 'não']

    /* const opc= [{id:'Cooperativo', name:'Cooperativo'},{id: 'Indiferente', name:'Indiferente'},{id: 'Resistente', name:'Resistente'}]
     const opd = [{id:'Autopsíquica', name:'Autopsíquica'},{id: 'Alopsíquica', name:'Alopsíquica'},{id:'Temporal', name:'Temporal'},{id:'Espacial', name: 'Espacial'}]
     const ope = [{id:'Normal', name:'Normal'},{id:'Hipervigilância', name:'Hipervigilância'},{id:'Hipovigilância', name:'Hipovigilância'}]
     const opf = [{id:'Normal', name:'Normal'},{id:'Hipertenacidade', name:'Hipertenacidade'},{id:'Hipotenacidade',name:'Hipotenacidade'}]
     const opg = [{id:'Coerente', name:'Coerente'},{id:'Incoerente', name:'Incoerente'},{id:'Desconexo', name:'Desconexo'},{id:'Conexo', name: 'Conexo'}]
     const oph = [{id:'Normal', name:'Normal'},{id:'Alucinação',name:'Alucinação'}]
     const opi = [{id:'Normal', name:'Normal'},{id:'Acelerado', name:'Acelerado'},{id:'Retardado', name:'Retardado'},{id:'Fuga', name:'Fuga'},{id:'Bloqueio', name:'Bloqueio'},{id:'Prolixo', name:'Prolixo'},{id:'Descarrilamento', name:'Descarrilamento'}]
     const opj = [{id:'Normal', name:'Normal'},{id:'Disartrias', name:'Disartrias'},{id:'Afasias', name:'Afasias'},{id:'Parafasia', name:'Parafasia'},{id:'Neologismo', name:'Neologismo'},{id:'Mussitação', name:'Mussitação'},{id: 'Logorréia', name:'Logorréia'},{id: 'Para-respostas', name:'Para-respostas'}]
     const opk = [{id:'Distimia', name:'Distimia'},{id:'Angústia', name:'Angústia'},{id:'Ansiedade', name:'Ansiedade'},{id:'Irritabilidade', name:'Irritabilidade'},{id:'Medo', name:'Medo'},{id:'Ambivalência afetiva', name: 'Ambivalência afetiva'},{id:'Pânico', name:'Pânico'}]
     const opl = [{id:'Normal', name:'Normal'},{id:'Exaltado', name:'Exaltado'},{id:'Baixa de humor', name: 'Baixa de humor'},{id:'Quebra súbita...', name:'Quebra súbita...'}]
     const opm = [{id:'sim', name:'sim'},{id:'parcialmente', name:'parcialmente'},{id:'não', name:'não'}]
     */

    return (
        <div className="reviewForm">
            <h1>Exame Psíquico:</h1>




            <div className="form-control score-container2">
                <div className="score1">
                    <InputText
                        placeholder="Normal"
                        title="Aparência:"
                        value={data.ba || ''}
                        name='ba'
                        handleOnChange={(e) => updateField("ba", e.target.value)}
                    />
                    <InputText
                        placeholder="Normal"
                        title="Comportamento:"
                        value={data.bb || ''}
                        name='bb'
                        handleOnChange={(e) => updateField("bb", e.target.value)}
                    />

                    <div className="radios">
                        <label htmlFor='bd'>Orientação: </label>
                        <Checkbox
                            name="bd1"
                            updateField={updateField}
                            item={data.bd1}
                            values={opd[0]}
                        />
                        <Checkbox
                            name="bd2"
                            updateField={updateField}
                            item={data.bd2}
                            values={opd[1]}
                        />
                        <Checkbox
                            name="bd3"
                            updateField={updateField}
                            item={data.bd3}
                            values={opd[2]}
                        />
                        <Checkbox
                            name="bd4"
                            updateField={updateField}
                            item={data.bd4}
                            values={opd[3]}
                        />
                    </div>
                    <Radio
                        name="be"
                        title="Vigilância: "
                        updateField={updateField}
                        data={data.be}
                        values={ope}
                    />
                    <Radio
                        name="bf"
                        title="Tenacidade: "
                        updateField={updateField}
                        data={data.bf}
                        values={opf}
                    />
                    <Radio
                        name="bg"
                        title="Discurso: "
                        updateField={updateField}
                        data={data.bg}
                        values={opg}
                    />
                    <Radio
                        name="bh"
                        title="Sensopercepção: "
                        updateField={updateField}
                        data={data.bh}
                        values={oph}
                    />
                   
                </div>
                <div className="score2">
                    <Radio
                        name="bl"
                        title="Humor: "
                        updateField={updateField}
                        data={data.bl}
                        values={opl}
                    />
                    <Radio
                        name="bc"
                        title="Atitude para com o entrevistador: "
                        updateField={updateField}
                        data={data.bc}
                        values={opc}
                    />
                    <Radio
                        name="bi"
                        title="Pensamento: "
                        updateField={updateField}
                        data={data.bi}
                        values={opi}
                    />
                    <Radio
                        name="bj"
                        title="Linguagem: "
                        updateField={updateField}
                        data={data.bj}
                        values={opj}
                    />
                    <div className="radios">
                        <label htmlFor='bk'>Afetividade: </label>
                        <Checkbox
                            name="bk1"
                            updateField={updateField}
                            item={data.bk1}
                            values={opk[0]}
                        />
                        <Checkbox
                            name="bk2"
                            updateField={updateField}
                            item={data.bk2}
                            values={opk[1]}
                        />
                        <Checkbox
                            name="bk3"
                            updateField={updateField}
                            item={data.bk3}
                            values={opk[2]}
                        />
                        <Checkbox
                            name="bk4"
                            updateField={updateField}
                            item={data.bk4}
                            values={opk[3]}
                        />
                        <Checkbox
                            name="bk5"
                            updateField={updateField}
                            item={data.bk5}
                            values={opk[4]}
                        />
                        <Checkbox
                            name="bk6"
                            updateField={updateField}
                            item={data.bk6}
                            values={opk[5]}
                        />
                        <Checkbox
                            name="bk7"
                            updateField={updateField}
                            item={data.bk7}
                            values={opk[6]}
                        />
                    </div>


                    <Radio
                        name="bm"
                        title="Consiência da doença atual: "
                        updateField={updateField}
                        data={data.bm}
                        values={opm}
                    />
                    <div>
                        <label htmlFor="obs">Observação</label>
                        <textarea
                            className="obsB"
                            name="obs"
                            id="obs"
                            value={data.obs || ''}
                            onChange={(e) => updateField("obs", e.target.value)}
                        ></textarea>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default BForm