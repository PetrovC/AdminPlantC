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
            <Card variant="outlined">
                <form onSubmit={ login }>  
                    <div>
                        <TextField type="email" label="Email" variant="outlined" />
                    </div>
                    <div>
                        <TextField type="password" label="Mot de passe" variant="outlined" />
                    </div>
                    <div className="f-end">
                        <Button type="submit" color="primary">Se connecter</Button>
                    </div>
                </form>            
            </Card>
        </main>
    );
};

export default Login;