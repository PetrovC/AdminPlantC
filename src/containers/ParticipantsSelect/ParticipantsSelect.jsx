import { MenuItem, Select } from "@mui/material";
import { forwardRef } from "react";
import { useSelector } from "react-redux";

const ParticipantsSelect = forwardRef((props, ref) => {

    const participants = useSelector(state => {
        return state.participants.list;
    });

    return (
        <Select {...props} fullWidth={true} displayEmpty={true}>
            <MenuItem value="">Non assignée</MenuItem>
            {participants.map(participant => <MenuItem key={participant.id} value={participant.id}>{participant.nom} {participant.prenom}</MenuItem>)}
        </Select>
    );
});

export default ParticipantsSelect;