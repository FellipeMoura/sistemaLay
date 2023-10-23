import React from "react"
import { useState } from "react"

export function NavBar({setStep, page}) {
  //  console.log(page)
    function thisPage() {
        switch (page) {
            case '0': return (['on', 'off', 'off', 'off', 'off', 'off'])
            case '1': return (['off', 'on', 'off', 'off', 'off', 'off'])
            case '2': return (['off', 'off', 'on', 'off', 'off', 'off'])
            case '3': return (['off', 'off', 'off', 'on', 'off', 'off'])
            case '5': return (['off', 'off', 'off', 'off', 'on', 'off'])
            case '5': return (['off', 'off', 'off', 'off', 'on', 'off'])
            case '6': return (['off', 'off', 'off', 'off', 'off', 'on'])
            default: return (['on', 'off', 'off', 'off', 'off'])
        }
    }

    const [active, setActive] = useState(thisPage)
    function change(button) {
        if (button === 0) {
            setActive(['on', 'off', 'off', 'off', 'off', 'off'])
            setStep(button)
        } else if (button === 1) {
            setActive(['off', 'on', 'off', 'off', 'off', 'off'])
            setStep(button)
        } else if (button === 2) {
            setActive(['off', 'off', 'on', 'off', 'off', 'off'])
            setStep(button)
        } else if (button === 4) {
            setActive(['off', 'off', 'off', 'on', 'off', 'off'])
            setStep(button)
        } else if (button === 5) {
            setActive(['off', 'off', 'off', 'off', 'on', 'off'])
            setStep(button)
        } else if (button === 6) {
            setActive(['off', 'off', 'off', 'off', 'off', 'on'])
            setStep(button)
        }
    }


    return (

        <div className="nav">
            <div className={`${active[0]}`} onClick={() => change(0)}>Caixa</div>
            <div className={`${active[1]}`} onClick={() => change(1)}>Crediário</div>
            <div className={`${active[2]}`} onClick={() => change(2)}>Geral</div>
              </div>


    )




}