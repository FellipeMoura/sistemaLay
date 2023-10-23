import { useContext } from "react"
import './Input.css'
import {BiLogOut, BiCalendar} from 'react-icons/bi'



export function LogoutButton() {
    const { handleLogout } = ''
    return (
        <div >

            <button
                type='button'
                className='logoutButton'
                onClick={handleLogout}
            ><span><BiLogOut/> Logout</span>
            </button>
        </div>
    )
}

export function ReturnButton({event}) {
    return (
        <div >
            <button
                type='button'
                className='logoutButton'
                onClick={event}
            ><span><BiCalendar/> Retornar</span>
            </button>
        </div>
    )
}