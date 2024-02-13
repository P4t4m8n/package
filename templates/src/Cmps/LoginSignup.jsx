
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { login, signup } from '../store/actions/user.actions'
import { useForm } from '../customHooks/useForm'
import { userService } from '../services/user.service'
import { useImageUpload } from '../customHooks/useImageUpload'


export function LoginSignup({ open, setOpen }) {

    const [isSignup, setIsSignUp] = useState(false)
    const [credentials, setCredentials, handleChange] = useForm(userService.getEmptyCredentials())
    const [uploadImg] = useImageUpload()

    useEffect(() => {
        const closeOnOutsideClick = (ev) => {
            if (open && ev.target.id === 'modalBackdrop') {
                setOpen(false)
            }
        }
        window.addEventListener('click', closeOnOutsideClick)

        return () => window.removeEventListener('click', closeOnOutsideClick)
    }, [open, setOpen])

    function isLogin(ev) {
        ev.preventDefault()
        isSignup ? onSignup(credentials) : onLogin(credentials)
        setOpen(false)
    }

    async function onLogin(ev) {
        try {
            login(credentials)
        }
        catch (err) { console.log(err) }
    }

    async function onSignup(credentials) {
        try {
            signup(credentials)
        }
        catch (err) { console.log(err) }
    }

    const onUploadImg = (ev) => {
        const imgUrl = uploadImg(ev)
        setCredentials(prevItem => ({ ...prevItem, imgUrl }))
    }

    const { fullName, email, userName, imgUrl, password } = credentials

    return (
        <div id='modalBackdrop' className="modal-backdrop">
            <div className="modal-content">
                <form onSubmit={isLogin}>
                    <h2>{isSignup ? 'SignUp' : 'Login'}</h2>
                    <input
                        type="text"
                        placeholder="Username"
                        value={userName}
                        name='userName'
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        name='password'
                        value={password}
                        autoComplete='on'
                        onChange={handleChange}
                    />
                    {isSignup &&
                        <>
                            <label htmlFor="file-input">
                                <input type="file" id="file-input" name="image" onChange={onUploadImg} />
                                <img src={imgUrl} alt="user-img"></img>
                            </label>
                            <input
                                type="email"
                                placeholder="Email"
                                name='email'
                                value={email}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                placeholder="Fullname"
                                value={fullName}
                                name='fullName'
                                onChange={handleChange}
                            />

                        </>
                    }
                    <button>{(isSignup) ? ' Signup' : 'Sign in'}</button>
                    <Link href="#" onClick={() => setIsSignUp(!isSignup)} >
                        {isSignup ?
                            'Already a member? Login' :
                            "Don't have an account? Sign Up"
                        }
                    </Link>
                </form>
            </div>
        </div>

    )
}


