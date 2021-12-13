import Admin from "./pages/Admin/Admin";
import Login from "./pages/Auth/Login/Login";
import Agenda from "./pages/Admin/Agenda/Agenda";
import Missions from "./pages/Admin/Missions/Missions";
import MissionAdd from "./pages/Admin/MissionAdd/MissionAdd";
import ParticipantAdd from "./pages/Admin/ParticipantAdd/ParticipantAdd";

const Routes = [
    { path: '', element: <Admin />, children: [
        { path: '', element: <Agenda /> },
        { path: 'missions', element: <Missions /> },
        { path: 'mission-add', element: <MissionAdd /> },
        { path: 'participant-add', element: <ParticipantAdd /> },
    ] },
    { path: 'login', element: <Login /> }
];

export default Routes;