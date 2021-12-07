import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { hideConfirmation } from "../../store/interactionsSlice";

const ConfirmDialog = () => {

    const state = useSelector(state => state.interactions.confirmation);

    const dispatch = useDispatch();

    const handleOnClick = () => {
        if(state.handler) {
            state.handler();
        }
        dispatch(hideConfirmation());
    }

    return (
        <Dialog open={state.open} onClose={() => dispatch(hideConfirmation())}>
            <DialogTitle>{state.title}</DialogTitle>
            <DialogContent>{state.content}</DialogContent>
            <DialogActions>
                <Button autoFocus onClick={() => dispatch(hideConfirmation())}>Non</Button>
                <Button onClick={handleOnClick}>Oui</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;