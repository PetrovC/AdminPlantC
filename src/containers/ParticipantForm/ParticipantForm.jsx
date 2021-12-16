import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { Autocomplete, Button, TextField } from "@mui/material";
import { Email } from "@mui/icons-material";
import './ParticipantForm.scss';
import PCLoadingButton from '../PCLoadingButton/PCLoadingButton';
import FonctionParticipant from "../FonctionParticipant/FonctionParticipant";
import { addParticipant, removeParticipant, updateParticipant } from '../../store/participantsSlice';
import { showToast, askConfirmation } from "../../store/interactionsSlice";
import { useNavigate } from 'react-router-dom';

const ParticipantForm = ({onSuccess = () => {}, onError = () => {}}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate()


    const validationSchema = yup.object({
        fonction: yup
            .string()
            .max(100, 'maximum 100 caractère')
            .required('le champ est requis'),
        nomEntreprise: yup
            .string()
            .max(255, 'Maximum 255 ')
            .required('le champ est requis'),
        siegeSocial: yup
            .string()
            .max(50, 'max 50')
            .required('Le champ est requis'),
        nom: yup
            .string()
            .max(50, 'max 50')
            .required('le champs est requis'),
        prenom: yup
            .string()
            .max(50, 'max 50')
            .required('le champs est requis'),
        numTel: yup
            .string()
            .max(50, 'max 50')
            .required('le champs est requis'),
        email: yup
            .string()
            .max(255, 'max 255')
            .required('le champs est requis'),
        bce: yup
            .string()
            .required('le champs est requis'),

    })
    
    const defaultValues = {
        fonction: '',
        nomEntreprise: '',
        siegeSocial: '',
        nom: '',
        prenom: '',
        numTel: '',
        email: '',
        bce: ''
    };

    const { control, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues, resolver: yupResolver(validationSchema) });


    const [isLoading, setIsLoading] = useState(false);
    const participant = useSelector(state => state.participants.selectParticipant)

    useEffect(() => {
        reset({...defaultValues, ...participant})  
    }, [participant])

    const onDelete =() => {
        if(participant?.id){
            setIsLoading(true);
            axios.delete(process.env.REACT_APP_API_URL+ '/api/Participant/' + participant.id)
            .then(()=> {
                dispatch(removeParticipant(participant.id));
                dispatch(showToast({severity: 'success', message: 'La sauvegarde a réussi' }));
                onSuccess();
            }).catch(e => {
                dispatch(showToast({severity: 'error', message :'La sauvegarde a échoué'}));
                onError(e);
            }).finally(() => setIsLoading(false));
        }
    }

    const dataSend = data => {
        const cleanData = {
            ...data,
            fonction: parseInt(data.fonction),
            nomEntreprise: data.nomEntreprise,
            siegeSocial: data.siegeSocial,
            nom: data.nom,
            prenom: data.prenom,
            numTel: data.numTel,
            email: data.email,
            bce: data.bce
        }
        if(participant?.id){
            const updatedParticipant ={
                ...cleanData,
                id : participant.id
            };
            setIsLoading(true);
            axios.put(process.env.REACT_APP_API_URL + '/api/Participant/' + updatedParticipant.id, updatedParticipant).then(() => {
                dispatch(updateParticipant(updatedParticipant));
                dispatch(showToast({severity: 'success', message: 'La sauvegarde a réussi'}));
                onSuccess();
            }).catch(e => {
                dispatch(showToast({ severity: 'error', message: 'La sauvegarde a échoué' }));
                    onError(e);
            }).finally(() => setIsLoading(false));
        }
        else{

            setIsLoading(true);
            // api envoie post
            axios.post(process.env.REACT_APP_API_URL + '/RegisterByPlantC', cleanData)
            .then(({data}) => {
                dispatch(addParticipant({ ...cleanData, id: data.id }));
                dispatch(showToast({ severity: 'success', message: 'La sauvegarde a réussi' }));
                setIsLoading(false);
                onSuccess();
            })
            .catch(() => {
                dispatch(showToast({ severity: 'error', message: 'La sauvegarde a échoué' }));
                setIsLoading(false);
            }).finally(() => setIsLoading(false));
        }
    }

    return (
        <>
        <div className="card">
            {participant?.id && <>
            <div className="deleteButton">
            <Button color="error" onClick={() => dispatch(askConfirmation({
                            title: 'Confirmation',
                            content: 'Êtes-vous sûr de vouloir supprimer cette mission ?',
                            handler: onDelete
                        }))}>Supprimer</Button>
            </div>
            </>
            }
        <form onSubmit={handleSubmit(dataSend)}>
            <div className="container_form_image">
                <div className="container_form">
                    <div className="form-group" >
                        <Controller
                            name="fonction"
                            control={control}
                            render={({ field }) => <FonctionParticipant  {...field} />}
                            />
                    </div>
                    <div className="form-group" >
                        <Controller name="nomEntreprise"
                            control={control}
                            render={({ field }) =>
                            <TextField {...field}
                            tabIndex="1"
                            label="Nom Entreprise"
                            required={true}
                            fullWidth={true}
                            error={!!errors.nomEntreprise}
                            helperText={!!errors.nomEntreprise && errors.nomEntreprise.message} />
                            
                        } /></div>

                    <div className="form-group">
                        <Controller name="bce"
                            control={control}
                            render={({ field }) =>
                            <TextField {...field}
                            label="BCE"
                            tabIndex="2"
                            required={true}
                            fullWidth={true}
                            error={!!errors.bce}
                            helperText={!!errors.bce && errors.bce.message} />
                            
                        } />
                    </div>

                    <div className="form-group">
                        <Controller name="siegeSocial"
                            control={control}
                            render={({ field }) =>
                            <TextField {...field}
                            label="Siège Social"
                                    multiline={true}
                                    required={true}
                                    tabIndex="3"
                                    rows={2}
                                    fullWidth={true}
                                    error={!!errors.siegeSocial}
                                    helperText={!!errors.siegeSocial && errors.siegeSocial.message} />
                                    
                                } />
                    </div>
                </div>
                <div className="image">
                    <img src="assets/img/arbreForm.png" alt="logo arbre" />
                </div>
            </div>
            <div className="container_form_email_nom">
                <div className="nom_email_block">
                    <div className="form-group">
                        <Controller name="nom"
                            control={control}
                            render={({ field }) =>
                            <TextField {...field}
                            label="Nom"
                            tabIndex="4"
                            required={true}
                            fullWidth={true}
                            error={!!errors.nom}
                            helperText={!!errors.nom && errors.nom.message} />
                            
                            } />
                    </div>
                </div>
                <div className="form-group">
                    <Controller name="email"
                        control={control}
                        render={({ field }) =>
                        <TextField {...field}
                        label="Email"
                        tabIndex="6"
                        fullWidth={true}
                        required={true}
                        error={!!errors.email}
                        helperText={!!errors.email && errors.email.message}
                        />
                    } />
                </div>

            </div>
            <div className="num_prenom_block">
                <div className="form-group">
                    <Controller name="prenom"
                        control={control}
                        render={({ field }) =>
                        <TextField {...field}
                        label="Prénom"
                        tabIndex="5"
                        required={true}
                        fullWidth={true}
                        error={!!errors.prenom}
                                helperText={!!errors.prenom && errors.prenom.message} />
                                
                            } />
                </div>

                <div className="form-group">
                    <Controller name="numTel"
                        control={control}
                        render={({ field }) =>
                        <TextField {...field}
                        label="Numéro Tel"
                        tabIndex="7"
                        fullWidth={true}
                        required={true}
                        error={!!errors.numTel}
                        helperText={!!errors.numTel && errors.numTel.message} />
                        
                    } />
                </div>
            </div>
            <div className="form-group btn_valider_participant">
                <PCLoadingButton disabled={isLoading} type="submit" variant="contained">Valider</PCLoadingButton>
            </div>
        </form>
    </div>

</>
    )
}

export default ParticipantForm
