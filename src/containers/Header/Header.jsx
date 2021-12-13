import { useSelector, useDispatch } from "react-redux";
import './Header.scss';

const Header = () => {

    const dispatch = useDispatch();

    const isLogged = useSelector((state) => state.login.isLogged);

    return (
        <header>
            <img src="assets/img/logo.png" alt="logo" className="logo mobile" />
        </header>
    );
};
export default Header;