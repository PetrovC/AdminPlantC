import Admin from "./pages/Admin/Admin";
import Login from "./pages/Login/Login";
import Agenda from "./pages/Admin/Agenda/Agenda";
import Missions from "./pages/Admin/Missions/Missions";
import MissionAdd from "./pages/Admin/MissionAdd/MissionAdd";
import ParticipantAdd from "./pages/Admin/ParticipantAdd/ParticipantAdd";
import Participants from "./pages/Admin/participant/Participant";

const Routes = [
    { path: '', element: <Admin />, children: [
        { path: '', element: <Agenda /> },
        { path: 'missions', element: <Missions /> },
        { path: 'mission-add', element: <MissionAdd /> },
        { path: 'participant-add', element: <ParticipantAdd /> },
        { path: 'participant-list', element: <Participants/>}
    ] },
    { path: 'login', element: <Login /> }
];

export default Routes;