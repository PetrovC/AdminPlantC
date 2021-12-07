import './AddMissionButton.scss';

const AddMissionButton = (props) => {
    return (
        <div className="add-button">
            <button {...props}>+</button>
        </div>
    );
};

export default AddMissionButton;