import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { forwardRef } from "react";
import { useSelector } from "react-redux";
import './ProjetsSelect.scss'

const ProjetsSelect = forwardRef((props, ref) => {
    const projets = useSelector(state => state.projets.list)

    return (
        <>
        <FormControl fullWidth>

        <InputLabel id="label-projet" > Projets</InputLabel>
        <Select {...props} labelId="label-projet" label="Projets" fullWidth={true} displayEmpty={true}>
            {projets.map(projet => <MenuItem key={projet.id} 
            value={projet.id}>{projet.reference} {projet.titre}</MenuItem>)}
        </Select>
        </FormControl>
        </>
    )
})
export default ProjetsSelect;