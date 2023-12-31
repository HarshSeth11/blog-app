import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthState';


export default function Logout() {

    const navigate = useNavigate();
    const logout = async () => {
        const response = await fetch("http://localhost:5000/users/logout", {
            method : "GET",
            credentials: "include",
        });

        const results = await response.json();
        console.log(results);
        if(results.ok) {
            useAuth.setIsLoggedIn(false);
            navigate("/login") 
        }
        else{
            navigate("/")
        }
    }

    useEffect(() => {
        logout()
    })
}
