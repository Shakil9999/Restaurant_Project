import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";

const PrivetRoutes = ({children}) => {
    const {user, loading} = useContext(AuthContext)

    const location = useLocation()

    if(loading){
        return <span className="loading loading-spinner text-primary"></span>
    }
    if(user){
        return children
    }
    return <Navigate to="/login" state={{ from: location }} replace ></Navigate>

};

export default PrivetRoutes;