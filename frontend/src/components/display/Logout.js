import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../app/Slices/authSlice';
import { useDispatch } from 'react-redux';


export default function Logout() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const helper = async () => {
        const response = await fetch("http://localhost:5000/users/logout", {
            method : "GET",
            credentials: "include",
        });

        const results = await response.json();
        console.log(results);
        if(results.ok) {
            dispatch(logout());
            navigate("/login") 
        }
        else{
            navigate("/")
        }
    }

    useEffect(() => {
        helper()
    })
}
