import './MissionForm.scss';
import { DateRangePicker } from "@mui/lab";
import { Autocomplete, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import moment from "moment";
import { useSelector } from 'react-redux';
import { addMission, updateMission, removeMission } from '../../store/missionsSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import ParticipantsSelect from '../ParticipantsSelect/ParticipantsSelect';
import ProjetsSelect from '../ProjetSelect/ProjetSelect';
import { Box } from '@mui/system';
import { showToast, askConfirmation } from '../../store/interactionsSlice';
import PCLoadingButton from '../PCLoadingButton/PCLoadingButton';

const MissionForm = ({ onSuccess = () => {}, onError = () => {} }) => {

    const validationSchema = yup.object({
        type: yup
            .string()
            .max(50, 'max 50')
            .required('Le champ est requis'),
        dates: yup
            .array()
            .of(yup.date().required('Veuillez entrer 2 dates')),
        description: yup
            .string()
            .required("Le champs est requis")
            .max(255)
    });

    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    // added
    const id = useSelector(state => state.login.id);

    const mission = useSelector(state => state.missions.selectedMission);

    const types = ['préparation du sol','semis préalable à la plantation','paillage','plantation','arrosage','désherbage','taille-entretien'];

    const defaultValues = {
        type: '',
        description: '',
        id_Projet: '',
        id_Participant: '',
        dates:[]
        
    };

    const { control, handleSubmit, reset, formState: { errors } } = useForm({defaultValues, resolver : yupResolver(validationSchema)});

    //add id
    useEffect(() => {
        reset({ ...defaultValues, ...mission, id_Participant: id, dates: [mission?.date_Debut??moment().format('YYYY-MM-DD'), mission?.date_Fin??moment().format('YYYY-MM-DD')] });
    }, [mission]);

    const onDelete = () => {
        if(mission?.id) {
            setIsLoading(true);
            axios.delete(process.env.REACT_APP_API_URL + '/api/tache/' + mission.id)
                .then(() => {
                    dispatch(removeMission(mission.id));
                    dispatch(showToast({ severity: 'success', message: 'La sauvegarde a réussi' }));
                    onSuccess();
                })
                .catch(e => {
                    dispatch(showToast({ severity: 'error', message: 'La sauvegarde a échoué' }));
                    onError(e);
                })
                .finally(() => setIsLoading(false));
        }
    }
    
    const formatDate = (date) => moment(date).format('YYYY-MM-DD');

    const onSubmit = data => {
        const cleanData= {
            ...data,
            date_Debut: formatDate(data.dates[0]), 
            date_Fin: formatDate(data.dates[1] ?? data.dates[0]),
            id_Projet: data.id_Projet, //rajouter dans le formulaire ultérieurement
            dates: null
        };

        if(mission?.id) {
            const updatedMission = {
                ...cleanData,
                id: mission.id
            };
            setIsLoading(true);
            axios.put(process.env.REACT_APP_API_URL + '/api/tache/' , updatedMission)
                .then(() => {
                    dispatch(updateMission(updatedMission));
                    dispatch(showToast({ severity: 'success', message: 'La sauvegarde a réussi' }));
                    onSuccess();
                })
                .catch(e => {
                    dispatch(showToast({ severity: 'error', message: 'La sauvegarde a échoué' }));
                    onError(e);
                })
                .finally(() => setIsLoading(false));
        }
        else {
            setIsLoading(true);
            axios.post(process.env.REACT_APP_API_URL + '/api/tache', cleanData)
                .then(({data}) => {
                    dispatch(addMission({...cleanData, id: data}));
                    dispatch(showToast({ severity: 'success', message: 'La sauvegarde a réussi' }));
                    onSuccess();
                })
                .catch(e => {
                    dispatch(showToast({ severity: 'error', message: 'La sauvegarde a échoué' }));
                    onError(e);
                })
                .finally(() => setIsLoading(false));
        }
    }
    return (
        <>
            <div className="card">
                { mission?.id && <>
                    <div className="deleteButton">
                        <Button color="error" onClick={() => dispatch(askConfirmation({
                            title: 'Confirmation',
                            content: 'Êtes-vous sûr de vouloir supprimer cette mission ?',
                            handler: onDelete
                        }))}>Supprimer</Button>
                    </div>
                </>}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <Controller name="type"
                                    control={control} 
                                    render={({ field }) => <Autocomplete {...field} 
                                        options={types}
                                        freeSolo={true}
                                        onChange={(e, data) => field.onChange(data)}
                                        renderInput={(params) =>
                                            <TextField {...field} {...params}
                                                required={true}
                                                label="Type d'Activité"
                                                fullWidth={true}
                                                error={!!errors.type}
                                                helperText={!!errors.type && errors.type.message} />

                                    } />
                        } />
                    </div>
                    <div className="form-group">
                        <Controller name="description"
                                    control={control} 
                                    render={({ field }) => 
                                            <TextField {...field}
                                                label="Description"
                                                required={true}
                                                multiline={true}
                                                fullWidth={true}
                                                rows={3}
                                                error={!!errors.description}
                                                helperText={!!errors.description && errors.description.message} />

                        } />
                    </div>
                    <div className="form-group">
                        <Controller name="id_Participant"
                                    control={control}
                                    render={({field}) => <ParticipantsSelect {...field} />}
                                    />
                    </div>
                    <div className="form-group">
                        <Controller name="id_Projet"
                                    control={control}
                                    render={({field}) => <ProjetsSelect {...field} />}
                                    />
                    </div>
                    <div className="form-group">
                        <Controller name="dates"
                                    control={control} 
                                    render={({ field }) => <DateRangePicker {...field}
                                        startText="Date de Début" 
                                        endText="Date de Fin" 
                                        onChange={date => field.onChange(date)}
                                        inputFormat="DD/MM/YYYY"
                                        renderInput={(startParams, endParams) => <>
                                            <TextField {...startParams}
                                                required={true}
                                                fullWidth={true}
                                                error={!!errors.dates}
                                                helperText={!!errors.dates && errors.dates.message} />
                                            <Box sx={{ mx: 2 }}> au </Box>
                                            <TextField {...endParams}
                                                required={true}
                                                fullWidth={true}
                                                error={!!errors.dates} />
                                        </>}
                                    />
                        }/>
                    </div>
                    <div className="form-group">
                        <PCLoadingButton disabled={isLoading} type="submit" variant="contained">Sauver</PCLoadingButton>
                    </div>
                </form>
            </div>
        </>
    );
};

export default MissionForm;