import ParticipantForm from "../../../containers/ParticipantForm/ParticipantForm";

const ParticipantAdd = () => {

    const handleOnSuccess = () => {
    }
    console.log(handleOnSuccess)
    
    return (
        <>
            <h1 className="title">Ajouter un participant</h1>
            <ParticipantForm onSuccess={handleOnSuccess} />
        </>
    );
};

export default ParticipantAdd;