import React from 'react';
import './Info.css'
import { FiEdit } from 'react-icons/fi'

function Info({ right, left, click}) {

    return (
        <div className='geralContainer'>

            <div className="gPanel">

                <div className="lPanel">
                    {left}
                </div>

                <div className="rPanel">
                    {right}
                </div>

            </div>

            <button
                type='button'
                className='editInfo'
                onClick={click}
            >
            <span><FiEdit/>Editar</span>
            </button>
        </div>
    );
}

export default Info