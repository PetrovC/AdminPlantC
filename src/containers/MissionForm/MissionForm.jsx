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
            .max(255)
    });

    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);

    const mission = useSelector(state => state.missions.selectedMission);
    const participants = useSelector(state => state.participants.list);

    const types = ['Tondre', 'Arroser', 'Planter', 'Elaguer'];

    const defaultValues = {
        type: '',
        description: '',
        participantId: '',
        dates: [moment().startOf('day'), moment().startOf('day')]
    };

    const { control, handleSubmit, reset, formState: { errors } } = useForm({defaultValues, resolver : yupResolver(validationSchema)});

    useEffect(() => {
        reset({ ...defaultValues, ...mission, dates: [mission?.startDate, mission?.endDate] });
    }, [mission]);

    const onDelete = () => {
        if(mission?.id) {
            setIsLoading(true);
            axios.delete(process.env.REACT_APP_API_URL + '/mission/' + mission.id)
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
            participant: participants.find(p => p.id === data.participantId),
            startDate: formatDate(data.dates[0]), 
            endDate: formatDate(data.dates[1] ?? data.dates[0]),
            dates: null
        };

        if(mission?.id) {
            const updatedMission = {
                ...cleanData,
                id: mission.id
            };
            setIsLoading(true);
            axios.put(process.env.REACT_APP_API_URL + '/mission/' + updatedMission.id, updatedMission)
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
            axios.post(process.env.REACT_APP_API_URL + '/mission', cleanData)
                .then(({data}) => {
                    dispatch(addMission({...cleanData, id: data.id}));
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
                                                multiline={true}
                                                fullWidth={true}
                                                rows={3}
                                                error={!!errors.description}
                                                helperText={!!errors.description && errors.description.message} />

                        } />
                    </div>
                    <div className="form-group">
                        <Controller name="participantId"
                                    control={control}
                                    render={({field}) => <ParticipantsSelect {...field} />}
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