import { useState } from "react";
import './Agenda.scss';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { selectMission } from '../../../store/missionsSlice';
import Calendar from '../../../containers/Calendar/Calendar';
import { Dialog, Menu, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import MissionForm from "../../../containers/MissionForm/MissionForm";
import AddMissionButton from "../../../containers/AddMissionButton/AddMissionButton";
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import { SignalWifiStatusbarNullOutlined } from "@mui/icons-material";

const Agenda = () => 
{
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [week, setWeek] = useState(0);
    const [currentMission, setCurrentMission] = useState(null);

    const dispatch = useDispatch();

    const datas = useSelector(state => state.missions.list);

    const handleOnClick = (e) => {
        dispatch(selectMission(null));
        setOpen(true);
    };

    const editEvent = () => {
        if(currentMission) {
            axios.get(process.env.REACT_APP_API_URL + '/mission/' + currentMission.id)
                .then(({data}) => {
                    dispatch(selectMission(data));
                    setAnchorEl(null);
                    setOpen(true);
                });
        }
    }

    const handleEventClick = ({event, mission}) => {
        setCurrentMission({...mission});
        setAnchorEl(event.currentTarget);
    }

    const handleSwipedLeft = () => {
        setWeek(w => w + 1);
    }

    const handleSwipedRight= () => {
        setWeek(w => w - 1);
    }

    const handleOnSuccess = () => {
        setOpen(false);
    }

    return (
        <>
            <AddMissionButton onClick={handleOnClick} />
            <h1 className="title">Agenda</h1>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth={true}>
                <MissionForm onSuccess={handleOnSuccess}/>
            </Dialog>
            <div className="calendar">
                <Calendar datas={datas.filter(m => m.participantId)}
                          week={week} 
                          onSwipedLeft={handleSwipedLeft}
                          onSwipedRight={handleSwipedRight}
                          onEventClick={handleEventClick} />
                <Menu open={!!anchorEl}
                    onClose={() => setAnchorEl(null)}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    >
                    <MenuItem >
                        <ListItemIcon>
                            <SearchIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Détails</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={editEvent}>
                        <ListItemIcon>
                            <EditIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Modifier</ListItemText>
                    </MenuItem>
                </Menu>
            </div>
        </>
    );
};

export default Agenda;
