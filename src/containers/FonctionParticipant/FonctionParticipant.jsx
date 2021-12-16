import { FormControl, Checkbox, InputLabel, ListItemText, MenuItem, Select } from '@mui/material'
import React, { forwardRef, useState } from 'react'

const FonctionParticipant = forwardRef((props, ref) => {

    const [participants, setParticipants] = useState([
        "Citoyen",
        "Entreprise",
        "Beneficiaire",
        "Agriculteur",
        "Planteur"
    ]);


    return (
        <>
            <FormControl fullWidth>
                <InputLabel id="label-fonction">Fonction</InputLabel>
                <Select
                    {...props}
                    required={true}
                    fullWidth={true}
                    displayEmpty={true}
                    labelId="label-fonction"
                    label="Fonction"
                >
                    {/* <MenuItem value="rien"> Pas De Fonction </MenuItem> */}
                    {participants.map((participant, index) => <MenuItem key={index + "_" + participant} value={index}>
                        {participant}
                    </MenuItem>)
                    }
                </Select>
            </FormControl>
        </>



    )
})

export default FonctionParticipant
