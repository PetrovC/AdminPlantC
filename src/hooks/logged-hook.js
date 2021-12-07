import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";


export const useLogged = () => {

    const isLogged = useSelector(state => state.login.isLogged);
    const navigate = useNavigate();

    useEffect(() => {

        if(isLogged) {
            navigate('/');
        }
    }, [isLogged]);
}