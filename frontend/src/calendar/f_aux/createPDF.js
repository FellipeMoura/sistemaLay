import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

export function createPDF(project, one, download) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs

    if(project.length > 0){

    console.log(project)

    const title = [
        {
            text: `Atendente: ${project[0].atendente} - Data: ${project[0].data.substr(0, 10).split('-').reverse().join('/')}`,
            fontSize: 15,
            bold: true,
            margin: [15, 20, 0, 45]

        }
    ]

    const dados = project.map((item) => {
        return [
            // {border: [true], text: item.nome_procedimento.substr(0, 21), fontSize: 11, margin: [0, 2, 0, 2] },
            { text: item.confirm == 0 ? 'Não' : 'Sim', fontSize: 11, margin: [0, 2, 0, 2] },
            { text: parseFloat(item.rp).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), fontSize: 11, margin: [0, 2, 0, 2] },
            { text: `${item.sessoes}`, fontSize: 11, margin: [0, 10, 0, 0] },
            { text: `${item.sala}`, fontSize: 11, margin: [0, 2, 0, 2] },
            {
                text: [
                    { text: `${item.hora.substr(0, 5)} - ${item.hora_fim.substr(0, 5)}\n`, },
                    { text: `${item.duracao} min`, italics: true },
                ], fontSize: 11, margin: [0, 2, 0, 2]
            },
            {
                text: [
                    { text: item.nome_cliente == 'bloqueio' ? item.nota : item.nome_cliente + '\n', bold: true },
                    { text: item.nome_procedimento, italics: true },
                ], fontSize: 11, margin: [0, 2, 0, 2]
            }
        ]
    })



    const body = [
        {
            table: {
                headerRows: 1,
                widths: [50, 90, 50, 50, 70, '*'],
                body: [
                    [
                        // { border: [true], text: 'Procedimento', style: 'tableHeader', fontSize: 13, bold: true },
                        { border: [true, true, true], text: 'Conf', style: 'tableHeader', fontSize: 13, bold: true },
                        { border: [true, true, true, true], text: 'RP', style: 'tableHeader', fontSize: 13, bold: true },
                        { border: [true, true, true, true], text: 'Sessão', style: 'tableHeader', fontSize: 13, bold: true },
                        { border: [true, true, true, true], text: 'Sala', style: 'tableHeader', fontSize: 13, bold: true },
                        { border: [true, true, true, true], text: 'Horário', style: 'tableHeader', fontSize: 13, bold: true },
                        { border: [true, true, true, true], text: 'Cliente/Procedimento', style: 'tableHeader', fontSize: 13, bold: true },
                    ],
                    ...dados
                ]
            },
            layout: {
                //fillColor: function (rowIndex, node, columnIndex) {
                //	return (rowIndex % 2 === 0) ? null: '#bbbbbb';
            }
        }

    ]

    const title2 = [
        {

            text: `Cliente: ${project[0].nome_cliente}`,
            fontSize: 15,
            bold: true,
            margin: [15, 20, 0, 45]

        }
    ]

    const dados2 = project.map((item) => {
        return [
            { border: [true,true,true,true], text: item.data.substr(0, 10).split('-').reverse().join('/') },
            { border: [true,true,true,true], text: item.hora.substr(0, 5), fontSize: 11, margin: [0, 2, 0, 2] },

            { border: [true,true,true,true], text: item.nome_procedimento, fontSize: 11, margin: [0, 2, 0, 2] },
            { border: [true,true,true,true], text: item.atendente, fontSize: 11, margin: [0, 2, 0, 2] }
        ]
    })



    const body2 = [
        {
            table: {
                headerRows: 1,
                widths: [90, 80, 170, 90],
                body: [
                    [
                        { border: [true, true, true, true], text: 'Data', style: 'tableHeader', fontSize: 13 },
                        { border: [true, true, true, true], text: 'Hora', style: 'tableHeader', fontSize: 13 },
                       
                        { border: [true, true, true, true], text: 'Procedimento', style: 'tableHeader', fontSize: 13 },
                        { border: [true, true, true, true], text: 'Atendente', style: 'tableHeader', fontSize: 13 },
                       
                    ],
                    ...dados2
                ]
            },
            layout: {
                fillColor: function (rowIndex, node, columnIndex) {
                    return (rowIndex % 2 === 0) ? null : '#CCCCCC';
                }
            }
        }
    ]


    const docDefinitios = {
        pageSize: 'A4',
        pageMargins: [15, 50, 15, 40],
        header: [one ? title : title2],
        content: [one ? body : body2],
        layout: 'lightHorizontalLines',
        pageBreakBefore: function (currentNode, followingNodesOnPage, nodesOnNextPage, previousNodesOnPage) {
            return currentNode.headlineLevel === 1 && followingNodesOnPage.length === 0;
        }
    }

    download ? pdfMake.createPdf(docDefinitios).download() : pdfMake.createPdf(docDefinitios).print()
}else{
    window.alert("Nenhum registro encontrado...")
}
}