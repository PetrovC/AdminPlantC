import ParticipantForm from "../../../containers/ParticipantForm/ParticipantForm";
import "./ParticipantAdd.scss";

const ParticipantAdd = () => {

    const handleOnSuccess = () => {
    }
    console.log(handleOnSuccess)
    
    return (
        <>
            <h1 className="titre_participant_ajouter">Création Collaborateur</h1>
            <ParticipantForm onSuccess={handleOnSuccess} />
        </>
    );
};

export default ParticipantAdd;