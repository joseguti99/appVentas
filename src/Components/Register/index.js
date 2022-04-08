import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../Context/authContext"


export const Register = () => {
    const [error, setError] = useState("")

    const [user, setUser] = useState({ email: "", password: "", })

    const navigate = useNavigate()

    const { signup } = useAuth()

    const handleChange = ({ target }) => {
        const { name, value } = target
        setUser({ ...user, [name]: value })
    }

    const returnLogin = () => {
        navigate("/iniciar-sesion")
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        try {
            await signup(user.email, user.password)
            navigate("/sales")

        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                setError("Este correo ya existe")
            }
            if (error.code === "auth/weak-password") {
                setError("Minimo 6 caracteres para la contraseña")
            }
        }
    }

    console.log(error)
    return (
        <div className="container bg-white">
            <form className="row justify-content-center my-5 py-3 rounded shadow border" onSubmit={handleSubmit}>
                <div className='col-12 text-end'>
                    <button className='btn btn-danger' onClick={returnLogin}>X</button>
                </div>
                <h1>REGISTRO</h1>
                <div className="col-5 mx-5">
                    <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        placeholder="Email"
                        className="form-control my-3 py-3"
                        required />
                </div>
                <div className="col-12"></div>
                <div className="col-5 mx-5">
                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        onChange={handleChange}
                        id="password"
                        className="form-control my-3 py-3"
                        required />
                    <p className="text-danger">{error}</p>
                    <button className="btn btn-primary rounded-pill col-10 shadow-lg my-3 py-3">Registrarse</button>
                </div>
            </form>
        </div>
    )
}
