import { useAuth } from "../../Context/authContext"
import { Navigate } from "react-router-dom"
import Spinner from "../Spinner"

export const ProtectedRoute = ({children}) => {

    const {user, loading } = useAuth()

    if(loading) return <Spinner/>
    if(!user) return <Navigate to="/iniciar-sesion"/>
    return <>{children}</>

}
