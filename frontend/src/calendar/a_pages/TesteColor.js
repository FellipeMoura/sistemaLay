import React from "react";

export function TesteColor() {
  const colors = [
    
    '#f1f1f1',
    '#ce7a60',
    '#ce9560',
    '#0074f8',
    '#FF00FF',
    '#DC143C',
    '#ce6060',
    '#60cea9',
    '#33afa5',
    '#60bece',
    '#6093ce',
    '#6074ce',
    '#6760ce',
    '#9060ce',
    '#abffd1',
    '#ce60c5',
    '#ebf3a5',
    '#ce606f',
    '#cea860',
    '#af6033',
    '#af9233',
    '#9caf33',
    '#DAA520',
    '#af33a9',
    '#f9b1ff',
    '#ffbebf',
    '#fffb00',
    '#aef800',
    '#a886d3',
    '#ffdc9a',
    '#806d6d',
    '#A52A2A',
    '#A020F0',
    '#ADFF2F',
    '#FF4500',
    '#FF7F50',
    '#228B22',
    '#3CB371',
    '#FFD700',
    '#B22222'
    ]

    return (
        <div>
                  {
        colors.map((color) => (

          //console.log(hora.hora+props.day.format('L')+props.atendente.nome),
          <div
            style={{ backgroundColor: color, padding: '20px'}}

            key={colors.indexOf(color)}

          >
            index: {colors.indexOf(color)}
            código: {color}



          </div>
        ))
      }
        </div>
    )

}