import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import {logoutRequest} from '../../authentication/logout/actionLogout';
import './Header.scss';

const Header = () => {

    const dispatch = useDispatch();

    const isLogged = useSelector((state) => state.login.isLogged);

    return (
        <header>
            <img src="assets/img/logo.png" alt="logo" className="logo mobile" />
            <span>
                 {/* { isLogged && <>Agri Team</> } */}
                { <>Agri Team</> }
            </span>
            <div>
                <Button disabled={!isLogged} type="button" color="primary" onClick= {() => dispatch(logoutRequest())}>Se déconnecter</Button>
            </div>
        </header>
    );
};
export default Header;