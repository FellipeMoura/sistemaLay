import React from "react";

export function TesteColor() {
  const colors = [
    '#8d8d8d',
    '#c90c0c',
    '#cf5915',
    '#cf7e15',
    '#c5b204',
    '#8db400',
    '#48b400',
    '#00b47e',
    '#00b4b4',
    '#00afdb',
    '#008bdb',
    '#0071db',
    '#304fff',
    '#662eff',
    '#8f2eff',
    '#c42eff',
    '#ff2eee',
    '#ff2eaf',
    '#7c4c39',
    '#286299',
    '#5b9236',
    '#a14a44',
    '#4682B4',
    '#604da3',  
    '#20B2AA',
    '#66CDAA',
    '#5F9EA0',
    '#3CB371',
    '#32CD32',
    '#DAA520',
    '#B8860B',
    '#FF6347',
    '#FFA500', 
    '#CD853F',
    '#8371a3',
    '#F4A460',
    '#7B68EE',
    '#9370DB',
    '#BA55D3',
    '#ac6f53',
    '#e95a5a',
    '#ff7e27',
    '#FFD700',
    '#6A67D5',
    '#288b41',
    '#8b2b28',
    '#e23a34',
    '#e61cdb',
    '#641c61'
  
    ]

    return (
        <div>
                  {
        colors.map((color) => (

          //console.log(hora.hora+props.day.format('L')+props.atendente.nome),
          <div
            style={{ backgroundColor: color, padding: '20px', color: '#fff'}}

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