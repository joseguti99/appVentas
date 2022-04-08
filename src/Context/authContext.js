import { createContext, useContext, useEffect, useState } from "react";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged, 
    signOut,
    GoogleAuthProvider,
    signInWithPopup} from "firebase/auth";
import { auth } from "../Firebase/FirebaseConfig";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
export const authContext = createContext();

export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) throw new Error("There is no Auth provider");
    return context;
}

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setloading] = useState(true)

    const navigate = useNavigate()

    const signup = (email, password) => 
        createUserWithEmailAndPassword(auth, email, password)
    
    const login = async (email, password) =>{
        signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
            navigate("/sales")
        })
        .catch((error) => {
            console.log(error)
            if(error.code){
                Swal.fire({
                    icon: 'error',
                    position: "top",
                    title: 'Error al autenticar usuario...',
                    text: 'Revisa bien tus datos!'
                })
            }
        })
    }

    const logout = (email, password) =>{
        signOut(auth)
    }

    const loginWithGoogle = () => {
        const googleProvider = new GoogleAuthProvider()
        return signInWithPopup(auth, googleProvider)
    }

    useEffect(()=>{
        const unsub = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser)
            setloading(false)
        })
        return () => unsub();
    },[])

    return (
        <authContext.Provider value={{ signup, login, user, logout, loading, loginWithGoogle }}>
            {children}
        </authContext.Provider>
    )

}