import { NavLink } from "react-router-dom";
import EventIcon from '@mui/icons-material/Event';
import ListAltIcon from '@mui/icons-material/ListAlt';
import EditIcon from '@mui/icons-material/Edit';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import './Nav.scss';

const Nav = () => {
    return <nav>
        <ul>
            <li>
                <NavLink className="logo" to='/'>
                    <img src="assets/img/logo.png" alt="logo" />
                </NavLink>
            </li>
            <li>
                <NavLink to='/'>
                    <EventIcon />
                    <span className="title">Planification</span>
                </NavLink>
            </li>
            <li>
                <NavLink to='/missions'>
                    <ListAltIcon />
                    <span className="title">Missions</span>
                </NavLink>
            </li>
            <li>
                <NavLink to='/mission-add'>
                    <EditIcon />
                    <span className="title">
                        <span>Ajouter</span>
                        <span>Mission</span>
                    </span>
                </NavLink>
            </li>
            <li>
                <NavLink to='/participant-add'>
                    <PersonAddAltIcon />
                    <span className="title">
                        <span>Ajouter</span>
                        <span>Collaborateur</span>
                    </span>
                </NavLink>
            </li>
        </ul>
    </nav>
};
export default Nav;