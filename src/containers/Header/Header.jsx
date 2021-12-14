import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from "@mui/material";
import {logoutRequest} from '../../authentication/logout/actionLogout';
import './Header.scss';

const Header = () => {

    const dispatch = useDispatch();

    // const isLogged = useSelector((state) => state.login.isLogged);

    return (
        <header>
            <img src="assets/img/PlantC.png" alt="logo" className="logo mobile" />
            <span>
                 {/* { isLogged && <>Amaury Olivier</> } */}
                {   
                <div className="container_header_nom_logo_deco">
                    <span className="nom_user_header">
                        <span>Amaury Olivier</span>
                    </span>
                    <NavLink to='/login' className="logo_deco_header">
                        <LogoutIcon onClick= {() => dispatch(logoutRequest())}/>
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