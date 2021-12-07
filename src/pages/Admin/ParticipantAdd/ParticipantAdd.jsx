// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router";
// import ParticipantForm from "../../../containers/ParticipantForm/ParticipantForm";
// import { selectParticipant } from "../../../store/participantsSlice";

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