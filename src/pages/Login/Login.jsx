import { Button, Card, TextField } from "@mui/material";
import axios from 'axios'
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react'
import { Controller, useForm } from "react-hook-form";
import {LoginRequest, FalseLoginRequest} from '../../authentication/login/actionLogin'
import {checkStore} from '../../store/storeListen'
import { useLogged } from "../../hooks/logged-hook";
import './Login.scss'

const Login = () => {
    useLogged()

    const dispatch = useDispatch();

    const loginState = useSelector(state => state.login);

    useEffect(() => {
        console.log(loginState.token)
    }, [loginState])
    
    const defaultValues = {
        email: '',
        password: ''
    }

    const { control, handleSubmit, reset, formState: { errors } } = useForm({defaultValues})

    const submitRequest = (data) => {
        const dataDetails = {  
            email: data.email,
            password: data.password,
        }
        console.log(dataDetails)

        // //!/ faux login en attendant le déploiement du backend /!//
        // //!/ A remplacer par le loginRequest ci-dessous /!//

        //dispatch(FalseLoginRequest({email: dataDetails.email, password: dataDetails.password}))

        dispatch(LoginRequest({email: dataDetails.email, password: dataDetails.password}))
        checkStore()
        reset()
    }

    return (
        <div>
            <main className="auth">
            <div className="logo_plantC">
                <img src="assets/img/PlantC.png" alt="logo" />
            </div>
            <h1 className="titre_login">Se Connecter</h1>
                <form className="block_form" onSubmit= {handleSubmit(submitRequest)}>
                    <div className="block_email">
                        <Controller
                        control={control}
                        name='email' 
                        render={({field}) =><TextField {...field} type="email" label="Email" variant="outlined" /> }/>
                    </div>
                    <div className="block_mdp">
                        <Controller
                        control={control}
                        name='password' 
                        render={({field}) =><TextField {...field} type="password" label="Password" variant="outlined" /> }/>
                    </div>
                    <div className="block_btn">
                        <Button disabled={loginState.isLogged} type="submit" color="primary">Se connecter</Button>
                    </div>
                </form> 
                <div className="image_login">
                    <img src="assets/img/arbreForm.png" alt="logo arbre" />
                </div>
            </main>
        </div>
    );
};

export default Login;
