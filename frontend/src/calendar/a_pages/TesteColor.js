import React from "react";

export function TesteColor() {
    const colors = [
    
        '#ce6060',
        '#ce7a60',
        '#ce9560',
        '#cea860',
        '#cecc60',
        '#b1ce60',
        '#72ce60',
        '#60ce81',
        '#60cea9',
        '#60bece',
        '#6093ce',
        '#6074ce',
        '#6760ce',
        '#9060ce',
        '#b460ce',
        '#ce60c5',
        '#ce609d',
        '#ce606f',
        '#af3334',
        '#af6033',
        '#af9233',
        '#9caf33',
        '#33afa5',
        '#af33a9',
        '#cc90d1'
      
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