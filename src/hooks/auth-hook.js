import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";


export const useAuth = () => {
    const isLogged = useSelector(state => state.session.isLogged);
    const navigate = useNavigate();

    useEffect(() => {
        if(!isLogged) {
            navigate('/login');
        }
    }, [isLogged]);
}