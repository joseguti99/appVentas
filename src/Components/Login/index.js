import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../Context/authContext"
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

export const Login = () => {
    const [user, setUser] = useState({ email: "", password: "", })
    const navigate = useNavigate()

    const { login, loginWithGoogle } = useAuth()

    const handleChange = ({ target }) => {
        const { name, value } = target
        setUser({ ...user, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        await login(user.email, user.password)
        .then((res) => {
            navigate("/sales")
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const returnHome = () => {
        navigate("/")
    }

    const handleGoogleSignIn = async () => {
        await loginWithGoogle()
        .then((res) => {
            navigate("/sales");
        })
        .catch((error) => {
            console.log(error.message)
        })
    }

    return (
        <div className="container bg-white">
            <form className="row justify-content-center my-5 py-3" onSubmit={handleSubmit}>
            <div className='col-12 text-end'>
                        <button className='btn btn-danger' onClick={returnHome}>X</button>
                    </div>
                <h1>INICIAR SESION</h1>
                <div className="col-12 col-lg-5 mx-5">
                    <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        placeholder="Email"
                        className="form-control my-3 py-3"
                        required />
                </div>
                <div className="col-12"></div>
                <div className="col-12 col-lg-5 mx-5">
                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        onChange={handleChange}
                        id="password"
                        className="form-control my-3 py-3"
                        required />
                    <button className="btn btn-primary rounded-pill col-10 shadow my-3 py-3">Iniciar Sesion</button>
                    <button className="btn rounded-pill col-10 shadow my-3 py-1 border" 
                            onClick={handleGoogleSignIn}><FcGoogle className="h1" />
                    </button>
                    <div className="col-12 text-center">
                        <Link  to="/registro">Registrarse</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}