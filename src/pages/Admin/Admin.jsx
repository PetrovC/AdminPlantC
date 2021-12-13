import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router";
import Header from "../../containers/Header/Header";
import Nav from "../../containers/Nav/Nav";
import { useAuth } from "../../hooks/auth-hook";
import { loadMissions } from "../../store/missionsSlice";
import { loadParticipants } from "../../store/participantsSlice";
import './Admin.scss';

const Admin = () => {
    //useAuth();

    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + '/mission')
            .then(({data}) => dispatch(loadMissions(data)))
            .catch();
        axios.get(process.env.REACT_APP_API_URL + '/participant')
            .then(({data}) => dispatch(loadParticipants(data)))
            .catch();
    }, []);

    return (
        <div id="admin">
            <Nav />
            <div id="content">
                <Header />
                <main>
                    <Outlet></Outlet>
                </main> 
            </div>
        </div>
    );
};

export default Admin;