import AuthContext from "./AuthContext";
import { useContext, useState } from "react";

export const useAuth = (props) => {
    return useContext(AuthContext);
}

export const AuthState = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
            {props.children}
        </AuthContext.Provider>
    )
} 
