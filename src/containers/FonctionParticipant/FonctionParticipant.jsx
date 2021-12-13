import { Checkbox, ListItemText, MenuItem, Select } from '@mui/material'
import React,{forwardRef, useState} from 'react'

const FonctionParticipant = forwardRef((props, ref) =>{

    const [participants,setParticipants] = useState(["Citoyen", "Agriculteur", "Planteur"]);
    

    return (
        <>
        <Select 
            {...props}
            required={true}
            fullWidth={true}
            displayEmpty={true} 
        >
            {/* <MenuItem value="rien"> Pas De Fonction </MenuItem> */}
            {participants.map((participant,index)=><MenuItem key={index+"_"+participant} value={participant}>
                {participant}
            </MenuItem>)
            }
        </Select>
        </>
        

        
    )
})

export default FonctionParticipant
