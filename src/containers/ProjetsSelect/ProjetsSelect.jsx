import { MenuItem, Select } from "@mui/material";
import { forwardRef } from "react";
import { useSelector } from "react-redux";

const ProjetsSelect = forwardRef((props, ref) => {
    const projets = useSelector(state => state.projets.list)

    return (
        <Select {...props} fullWidth={true} displayEmpty={true}>
            {projets.map(projet => <MenuItem key={projet.id} 
            value={projet.id}>{projet.reference} {projet.titre}</MenuItem>)}
        </Select>
    )
})
export default ProjetsSelect;