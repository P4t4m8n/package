import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { LoginSignup } from './LoginSignup.jsx'
import { logout } from '../store/actions/user.actions.js'
import { useState } from 'react'

export function AppHeader() {
    const user = useSelector(storeState => storeState.userModule.user)
    const [open, setOpen] = useState(false)

    async function onLogout() {
        try {
            await logout()
            showSuccessMsg(`Bye now`)
        } catch (err) {
            showErrorMsg('Cannot logout')
        }
    }

    return (
        <header className="app-header grid">
            <img src='src\img\logo.png'></img>
            <nav>
                <NavLink to={"/"}>Home</NavLink>
                <NavLink to={"/items"}>Items</NavLink>
                <NavLink to={"/about"}>About</NavLink>

            </nav>
            {user &&
                <section className="user-nav">
                    <NavLink to={`user/${user._id}`}>
                        {user.imgUrl && <img src={user.imgUrl} />}
                        {user.fullname}
                    </NavLink>
                    <button onClick={onLogout}>Logout</button>
                </section>
            }
            {!user &&
                <section className="user-nav">
                    <button onClick={(() => setOpen(true))}>Login</button>
                    {open && <LoginSignup open={open} setOpen={setOpen} />}
                </section>
            }

        </header>
    )
}