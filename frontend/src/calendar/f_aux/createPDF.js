import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

export function createPDF(project, one, download) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs

    //console.log(project)

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
            { border: [false],text: `${item.hora.substr(0, 5)} ~ ${item.hora_fim.substr(0, 5)}`, fontSize: 11, margin: [0, 2, 0, 2] },
            {border: [false], text: ( 
                (item.nome_cliente == 'bloqueio'? item.nota:item.nome_cliente.length> 20? 
                item.nome_cliente.substr(0, 18)+'...   '
                : item.nome_cliente+'                     '))
                + (item.nome_procedimento.substr(0, item.nome_procedimento.indexOf('('))), fontSize: 11, margin: [0, 2, 0, 2] },
           // {border: [false], text: item.nome_procedimento.substr(0, 21), fontSize: 11, margin: [0, 2, 0, 2] },
            {border: [false], text: item.confirm == 0 ? 'Não' : 'Sim', fontSize: 11, margin: [0, 2, 0, 2] },

        ]
    })



    const body = [
        {
            table: {
                headerRows: 1,
                widths: ['*', '*', '*', '*'],
                body: [
                    [
                        { border: [false, false, false, true], text: 'Horário', style: 'tableHeader', fontSize: 13, bold: true },
                        { border: [false, false, false, true], text: 'Cliente/Procedimento', style: 'tableHeader', fontSize: 13, bold: true },
                       // { border: [false, false, false, true], text: 'Procedimento', style: 'tableHeader', fontSize: 13, bold: true },
                        { border: [false, false, false, true], text: 'Confirmado', style: 'tableHeader', fontSize: 13, bold: true },

                    ],
                    ...dados
                ]
            },
            layout: {
				fillColor: function (rowIndex, node, columnIndex) {
					return (rowIndex % 2 === 0) ? null: '#bbbbbb';
				}
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
            { border: [false], text: item.data.substr(0, 10).split('-').reverse().join('/') + ' - ' + item.hora.substr(0, 5), fontSize: 11, margin: [0, 2, 0, 2] },
            { border: [false], text: item.atendente, fontSize: 11, margin: [0, 2, 0, 2] },
            { border: [false], text: item.nome_procedimento, fontSize: 11, margin: [0, 2, 0, 2] }
        ]
    })



    const body2 = [
        {
            table: {
                headerRows: 1,
                widths: ['*', '*', '*', '*'],
                body: [
                    [
                        { border: [false, false, false, true], text: 'Data', style: 'tableHeader', fontSize: 13 },
                        { border: [false, false, false, true], text: 'Atendente', style: 'tableHeader', fontSize: 13 },
                        { border: [false, false, false, true], text: 'Procedimento', style: 'tableHeader', fontSize: 13 }
                    ],
                    ...dados2
                ]
            },
            layout: {
				fillColor: function (rowIndex, node, columnIndex) {
					return (rowIndex % 2 === 0) ? null: '#CCCCCC';
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

    download?  pdfMake.createPdf(docDefinitios).download(): pdfMake.createPdf(docDefinitios).print()

}