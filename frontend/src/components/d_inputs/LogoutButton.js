import { useContext } from "react"
import { Context } from "../e_contexts/AuthContext"
import './Input.css'
import {BiLogOut, BiHomeHeart} from 'react-icons/bi'
import {GrCompliance} from 'react-icons/gr'



export function LogoutButton() {
    const { handleLogout } = useContext(Context)
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

export function HomeButton() {

    return (
        <div >

            <button
                type='button'
                className='logoutButton'
                onClick={()=>window.location.replace('/home')}
            ><span><BiHomeHeart/> Início</span>
            </button>
        </div>
    )
}

export function LanButton() {

    return (
 
        <div>
            <button
                type='button'
                className='logoutButton'
                onClick={()=>window.location.replace('/control/0')}
            ><span ><GrCompliance  /> Lançamentos</span>
            </button>
            </div>
    )
}