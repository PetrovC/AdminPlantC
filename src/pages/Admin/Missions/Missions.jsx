import { useSelector } from 'react-redux';
import './Missions.scss';
import { Checkbox, Dialog, TextField,  } from '@mui/material';
import moment from 'moment';
import ParticipantsSelect from '../../../containers/ParticipantsSelect/ParticipantsSelect';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { selectMission, updateMission } from '../../../store/missionsSlice';
import { useDispatch } from 'react-redux';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import MissionForm from '../../../containers/MissionForm/MissionForm';
import AddMissionButton from '../../../containers/AddMissionButton/AddMissionButton';
import { showToast } from '../../../store/interactionsSlice';
import SyncIcon from '@mui/icons-material/Sync';

const Mission = (props) => {

    const {index, id, participant, participantId, type, description, startDate, endDate, setOpen, closed } = props;

    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);

    const handleOnClick = () => {
        axios.get(process.env.REACT_APP_API_URL + '/mission/' + id)
            .then(({data}) => {
                dispatch(selectMission(data));
                setOpen(true);
            });
    }

    const handleOnChange = (e) => {
        const isChecked = e.target.checked;
        const toUpdate = {
            id,
            type,
            description,
            startDate,
            endDate,
            participantId,
            participant,
            closed: isChecked
        };
        setIsLoading(true);
        axios.put(process.env.REACT_APP_API_URL + '/mission/' + id, toUpdate)
            .then(({data}) => {
                dispatch(updateMission(toUpdate));
                dispatch(showToast({ severity: 'success', message: 'La sauvegarde a réussi' }));
            }).catch(error => {
                dispatch(showToast({ severity: 'error', message: 'La sauvegarde a échoué' }));
            }).finally(() => {
                setIsLoading(false)
            });
    }

    return <li key={id}>
        <TextField fullWidth={true} 
                   label={`Mission ${index + 1} : (${moment(startDate).format('DD/MM/YY')} - ${moment(endDate).format('DD/MM/YY')})`} 
                   value={type} 
                   disabled={true} 
                   onClick={handleOnClick}/>
        {!isLoading && <Checkbox onChange={handleOnChange}
                                 checked={closed??false}
                                 sx={{ 
                                     border: '1px solid rgba(0, 0, 0, 0.38)', 
                                     borderRadius : '3px' , 
                                     padding: 0,
                                     marginLeft : '10px' 
                                 }}
                                 icon={<ClearOutlinedIcon />}
                                 checkedIcon={<CheckCircleOutlineOutlinedIcon sx={{ color: 'rgb(11,82,79)' }}/>}
                  />}
        {isLoading && <Checkbox disabled={true}
                                sx={{ 
                                    border: '1px solid rgba(0, 0, 0, 0.38)', 
                                    borderRadius : '3px' , 
                                    padding: 0,
                                    marginLeft : '10px' 
                                }}
                                icon={<SyncIcon className="spin" />}
                  />}

    </li>
}

const Missions = () => {

    const missions = useSelector(state => state.missions.list);

    const dispatch = useDispatch();

    const [selected, setSelected] = useState('');
    const [open, setOpen] = useState(false);
    
    const [participantMissions, setParticipantMissions ] = useState([]);

    useEffect(() => {
        setParticipantMissions(missions.filter(m => (!selected && !m.participantId) || m.participantId === selected));
    }, [selected, missions]);


    const handleOnChange = e => {
        setSelected(e.target.value);
    }

    const handleOnSuccess = () => {
        setOpen(false);
    }

    const handleOnClick = (e) => {
        dispatch(selectMission(null));
        setOpen(true);
    };

    return (
        <>
            <AddMissionButton onClick={handleOnClick}/>
            <h1 className="title" ><span>Missions :</span><span><ParticipantsSelect value={selected} onChange={handleOnChange}/></span></h1>
            <ul className="missions fadeIn-list">
                { participantMissions.map((mission, index) => <Mission key={mission.id} {...mission} index={index}  setOpen={setOpen} />) }
            </ul>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth={true}>
                <MissionForm onSuccess={handleOnSuccess}/>
            </Dialog>
        </>
    );
};

export default Missions;