import { NavLink } from "react-router-dom";
import EventIcon from '@mui/icons-material/Event';
import ListAltIcon from '@mui/icons-material/ListAlt';
import EditIcon from '@mui/icons-material/Edit';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import {logoutRequest} from '../../authentication/logout/actionLogout';
import {useDispatch } from "react-redux";
import './Nav.scss';

const Nav = () => {
    const dispatch = useDispatch()
    return <nav>
        <div className="logo_plantC">
            <img src="assets/img/PlantC.png" alt="logo" />
        </div>
        <ul>
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
            <li>
                <NavLink to='/login'>
                    <LogoutIcon onClick= {() => dispatch(logoutRequest())}/>
                    <span className="title">
                        <span>Logout</span>
                    </span>
                </NavLink>
            </li>
        </ul>
    </nav>
};
export default Nav;