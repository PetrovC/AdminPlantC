import ParticipantForm from "../../../containers/ParticipantForm/ParticipantForm";
import "./ParticipantAdd.scss";

const ParticipantAdd = () => {


  
    
    return (
        <>
            <h1 className="titre_participant_ajouter">Création Collaborateur</h1>
            <ParticipantForm  />
        </>
    );
};

// const ParticipantAdd = () => {

//     useEffect(() => {
//         dispatch(selectParticipant(null));
//     }, []);

//     const dispatch = useDispatch();

//     const navigate = useNavigate();

//     const handleOnSuccess = () => {
//         navigate('/');
//     }

//     return (
//         <>
//             <h1 className="title">Ajouter un participant</h1>
//             <ParticipantForm onSuccess={handleOnSuccess} />
//         </>
//     );
// };

// export default ParticipantAdd;