import { useSelector } from "react-redux";
import './Header.scss';

const Header = () => {

    const isLogged = useSelector((state) => state.session.isLogged);

    return (
        <header>
            <img src="assets/img/logo.png" alt="logo" className="logo mobile" />
            <span>
                 {/* { isLogged && <>Amaury Olivier</> } */}
                { <>Amaury Olivier</> }
            </span>
        </header>
    );
};
export default Header;