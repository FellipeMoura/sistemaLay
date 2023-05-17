import { useContext } from "react"
import { Context } from "../e_contexts/AuthContext"
import './Input.css'
import {BiLogOut} from 'react-icons/bi'



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