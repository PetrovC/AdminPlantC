import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
// import {logoutRequest} from '../../authentication/logout/actionLogout';
import './Header.scss';

const Header = () => {

    // const dispatch = useDispatch();

    // const isLogged = useSelector((state) => state.login.isLogged);

    return (
        <header>
            <img src="assets/img/PlantC.png" alt="logo" className="logo mobile" />
            <span>
                 {/* { isLogged && <>Amaury Olivier</> } */}
                { <>Amaury Olivier</> }
            </span>
            {/* <div>
                <Button disabled={!isLogged} type="button" color="primary" onClick= {() => dispatch(logoutRequest())}>Se déconnecter</Button>
            </div> */}
        </header>
    );
};
export default Header;