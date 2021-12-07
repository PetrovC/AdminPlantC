import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import MissionForm from "../../../containers/MissionForm/MissionForm";
import { selectMission } from "../../../store/missionsSlice";

const MissionAdd = () => {

    useEffect(() => {
        dispatch(selectMission(null));
    }, []);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleOnSuccess = () => {
        navigate('/');
    }

    return (
        <>
            <h1 className="title">Ajouter une mission</h1>
            <MissionForm onSuccess={handleOnSuccess} />
        </>
    );
};

export default MissionAdd;