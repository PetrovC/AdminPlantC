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
                <Card variant="outlined">
                    <form onSubmit= {handleSubmit(submitRequest)}>
                        <div>
                            <Controller
                            control={control}
                            name='email' 
                            render={({field}) =><TextField {...field} type="email" label="Email" variant="outlined" /> }/>
                        </div>
                        <div>
                            <Controller
                            control={control}
                            name='password' 
                            render={({field}) =><TextField {...field} type="password" label="Password" variant="outlined" /> }/>
                        </div>
                        <div>
                            <Button disabled={loginState.isLogged} type="submit" color="primary">Se connecter</Button>
                        </div>
                    </form>            
                </Card>
            </main>
        </div>
    );
};

export default Login;
