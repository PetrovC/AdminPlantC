import { Dialog, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddParticipantButton from "../../../containers/AddParticipantButton/AddParticipantButton"
import ParticipantAdd from "../ParticipantAdd/ParticipantAdd";
import {selectParticipant} from '../../../store/participantsSlice'
import ParticipantForm from "../../../containers/ParticipantForm/ParticipantForm";

const Participant = (props) => {

    const{id,nom, prenom, mail, telephone, adressLine1, adressLine2, number, zipCode,city, country,nomEntreprise, BCE, setOpen}= props;

    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);

    const handleOnClick = () => {
        axios.get(process.env.REACT_APP_API_URL + '/api/Participant/byID/' + id).then(({data})=>{dispatch(selectParticipant(data));
        setOpen(true)})
    }

    return <li key={id} style={{marginBottom:10}}>
        <TextField fullWidth={true}
        label={`${nom} ${prenom} ${nomEntreprise?? ''}`}
        disabled
        readOnly={true}
        onClick={handleOnClick}/>
    </li>

}

const Participants = () => {

    const Participants = useSelector(state => state.participants.list);
    const dispatch = useDispatch();
    const [selected, setSelected] = useState('');
    const [open, setOpen] = useState(false);

    const handleOnChange = e => {
        setSelected(e.target.value);
    }
    const handleOnSuccess = () => {
        setOpen(false);
    }
    const handleOnClick = (e) => {
        dispatch(selectParticipant(null));
        
        setOpen(true);
    };
    
    return (
    <>
        <AddParticipantButton onClick={handleOnClick}/>
        <h1 className="title">Participants
        </h1>
        <ul className="participants fadeIn-list">
                {Participants.map((participant, index) => <Participant key={participant.id} {...participant} index={index} setOpen={setOpen} />)}
        </ul>
        <Dialog open={open} onClose={()=>
        setOpen(false)}
        fullWidth={true}>
            <ParticipantForm onSuccess={handleOnSuccess}/>
        </Dialog>

        
        
    </>)
}
export default Participants