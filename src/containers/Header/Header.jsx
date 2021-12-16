import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { NavLink } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from "@mui/material";
import {logoutRequest} from '../../authentication/logout/actionLogout';
import './Header.scss';

const Header = () => {

    const dispatch = useDispatch();

    // const isLogged = useSelector((state) => state.login.isLogged);
    const loginState = useSelector(state => state.login);

    useEffect(() => {
        console.log('test')
        console.log(loginState.name)
    }, [loginState])

    return (
        <header>
            <img src="assets/img/PlantC.png" alt="logo" className="logo mobile" />
            <span className="block_user_deco">
                 {/* { isLogged && <>Amaury Olivier</> } */}
                {   
                <div className="container_header_nom_logo_deco">
                    <span className="nom_user_header">
                        <span>{loginState.nom} {loginState.prenom}</span>
                    </span>
                    <NavLink to='/login' className="logo_deco_header">
                        <LogoutIcon style={{fontSize: 1.2+"em"}} onClick= {() => dispatch(logoutRequest())}/>
                    </NavLink>
                </div>
                }
            </span>
            {/* <div>
                <Button disabled={!isLogged} type="button" color="primary" onClick= {() => dispatch(logoutRequest())}>Se déconnecter</Button>
            </div> */}
        </header>
    );
};
export default Header;