import { Button, Card, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { sessionService } from "../../../services/sessionService";
import { start } from "../../../store/sessionSlice";
import './Login.scss';

const Login = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const login = () => {
        sessionService.login({ email: 'admin@be', password: 'admin' })
            .then(token => {
                dispatch(start(token));
                navigate('/');
            })
            .catch(error => {

            });
    }

    return (
        <main className="auth">
            <div className="logo_plantC">
                <img src="assets/img/PlantC.png" alt="logo" />
            </div>
            <h1 className="titre_login">Se Connecter</h1>
            <form className="block_form" onSubmit={ login }>  
                <div className="block_email">
                    <TextField fullWidth={true} type="email" label="Email" variant="outlined" />
                </div>
                <div className="block_mdp">
                    <TextField fullWidth={true} type="password" label="Mot de passe" variant="outlined" />
                </div>
                <div className="block_btn">
                    <Button type="submit" color="primary">Se connecter</Button>
                </div>
            </form>   
            <div className="image_login">
                <img src="assets/img/arbreForm.png" alt="logo arbre" />
            </div>
        </main>
    );
};

export default Login;