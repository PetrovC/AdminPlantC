import { useState } from "react";
import './Agenda.scss';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { selectMission } from '../../../store/missionsSlice';
import Calendar from '../../../containers/Calendar/Calendar';
import { Dialog, Menu, ListItemIcon, ListItemText, MenuItem, Select, OutlinedInput, Checkbox } from "@mui/material";
import MissionForm from "../../../containers/MissionForm/MissionForm";
import AddMissionButton from "../../../containers/AddMissionButton/AddMissionButton";
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';

const Agenda = () => 
{
    const fctEnum = ["Planteur","Agriculteur"];
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [week, setWeek] = useState(0);
    const [currentMission, setCurrentMission] = useState(null);

    const dispatch = useDispatch();

    const datas = useSelector(state => state.missions.list);

    const [fonctions, setFonctions] = useState([0, 1]);

    const handleChange = (event) => {
        const {
            target: { value }
        } = event;
        if (value.length) {
            setFonctions(typeof value === "string" ? value.split(",") : value);
        }
        else {
            setFonctions(fonctions => [fonctions.includes(1) ?  0: 1]);
        }
      };

    const handleOnClick = (e) => {
        dispatch(selectMission(null));
        setOpen(true);
    };

    const editEvent = ({mission}) => {
        setCurrentMission({...mission});
        if(currentMission) {
            axios.get(process.env.REACT_APP_API_URL + '/api/tache/ById/' + currentMission.id)
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
                <div className="container_btn_agri_plant">
                    <Select
                    
                        fullWidth={true}
                        multiple
                        value={fonctions}
                        onChange={handleChange}
                        renderValue={(selected) => selected.map(v => fctEnum[v]).join(', ')}
                    >
                        <MenuItem value={0}>
                            <Checkbox checked={fonctions.indexOf(0) > -1} />
                            <ListItemText primary="planteur" />
                        </MenuItem>
                        <MenuItem value={1}>
                            <Checkbox checked={fonctions.indexOf(1) > -1} />
                            <ListItemText primary="agriculteur" />
                        </MenuItem>
                    </Select>
                </div>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth={true}>
                <MissionForm onSuccess={handleOnSuccess}/>
            </Dialog>

            <div className="calendar">
            <Calendar datas={datas.filter(m => m.id_Participant && fonctions.includes(m.participant.fonction))}
                          week={week} 
                          onSwipedLeft={handleSwipedLeft}
                          onSwipedRight={handleSwipedRight}
                          onEventClick={editEvent} />
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
