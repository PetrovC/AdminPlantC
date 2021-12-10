import { MenuItem, Select } from "@mui/material";
import { forwardRef } from "react";
import { useSelector } from "react-redux";

const ProjetsSelect = forwardRef((props, ref) => {

    const projets = useSelector(state => {
        // fonctionne
      console.log("projetSelect state =>",state.projets.list);
        return state.projets.list;
    });

    return (
        <Select {...props} fullWidth={true} displayEmpty={true}>
            <MenuItem value={undefined}>Non assignée</MenuItem>
            {projets.map(projet => <MenuItem key={projet.id} value={projet.id}>{projet.titre}</MenuItem>)}
        </Select>
    );
});

export default ProjetsSelect;