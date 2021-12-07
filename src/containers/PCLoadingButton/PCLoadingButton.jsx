import { Button } from '@mui/material';
import './PCLoadingButton.scss';
import SyncIcon from '@mui/icons-material/Sync';
import classNames from 'classnames';

const PCLoadingButton = (props) => {

    const {disabled} = props;

    return (
        <Button className={classNames({'loading-button': disabled})} {...props} >{props.children} {disabled && <SyncIcon />}</Button>
    );
};

export default PCLoadingButton;