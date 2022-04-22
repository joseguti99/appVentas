import { useAuth } from "../../Context/authContext"
import { Navigate } from "react-router-dom"
import Spinner from "../Spinner"

export const ProtectedRoute = ({children}) => {

    const {user, loading } = useAuth()

    if(loading) return <div className="contanier-spinner"><div className="row-spinner"><Spinner/></div></div>
    if(!user) return <Navigate to="/iniciar-sesion"/>
    return <>{children}</>

}
