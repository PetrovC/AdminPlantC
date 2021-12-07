import moment from 'moment';
import classNames from 'classnames';
import { useSwipeable } from 'react-swipeable';
import '@fortawesome/fontawesome-free/css/all.css';
import { useEffect, useState } from 'react';
import './Calendar.scss';
import 'moment/locale/fr';
import ParkIcon from '@mui/icons-material/Park';
import { Checkbox, Tooltip } from '@mui/material';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';


const CalendarEvent = (props) => {

    const {id, type, description, startDate, endDate, interval, onEventClick} = props;

    const [startDiff, setStartDiff] = useState(0);
    const [endDiff, setEndDiff] = useState(0);

    useEffect(() => {
        setStartDiff(moment(startDate).diff(interval[0], 'days'));
        setEndDiff(interval[6].diff(moment(endDate), 'days'));
    }, [interval, endDate, startDate]);

    const style = {
        marginLeft: (100 / 7 * startDiff) + 1 + '%',
        marginRight: (100 / 7 * endDiff) + 1 + '%',
        width: ((100 / 7) * (moment(endDate).diff(moment(startDate), 'days') + 1)) - 2 + '%'
    };

    const handleOnClick = e => {
        onEventClick({ event: e, mission: { id, type, startDate, endDate } })
    }

    const getToolTip = () => {
        let tooltip = type;
        if(description) {
            tooltip = `${tooltip} : ${description}`;
        }
        return tooltip
    }

    return <>
        <Tooltip placement="top" title={getToolTip()} arrow={true}>
            <span onClick={handleOnClick} className={classNames('mission')} 
                        style={style}>
                <span className="text">{type}</span>
                <ParkIcon className="icon" />
            </span>
        </Tooltip>
    </> 
}

const  CalendarGroup = (props) => {

    const {missions, interval, onEventClick} = props;

    const [overlap, setOverlap] = useState(true);

    const getLabel = (missions) => {
        if(missions.length)
            return missions[0].participant.prenom.slice(0,1) + missions[0].participant.nom.slice(0,1);
    }

    return (
        <div className={classNames('row')}>
            <span className="name">
                <span>{getLabel(missions)}</span>
            </span>
            <div className="missions">
                <div className={classNames('mission-container', {overlap})}>
                    {missions.map(mission => 
                        <CalendarEvent key={mission.id} {...mission} interval={interval} onEventClick={onEventClick}/>
                    )}
                </div>
            </div>
            <Checkbox value={overlap}
                      onChange={e => setOverlap(overlap => !overlap)}
                      icon={<UnfoldMoreIcon sx={{ fontSize: '20px' }} />}
                      checkedIcon={<UnfoldLessIcon sx={{ fontSize: '20px' }} />} />
        </div>
    );
};

const Calendar = ({ datas, week, onSwipedLeft, onSwipedRight, onEventClick }) => {

    const handlers = useSwipeable ({
        onSwipedLeft,
        onSwipedRight,
        trackMouse: true, 
    });

    const [group, setGroup] = useState({});
    const [interval, setInterval] = useState([]);

    const groupByParticipant = (tab) => {
        return tab.reduce((result, mission) => {
            if(moment(mission.startDate).isBetween(interval[0], interval[6],'days', '[]') || moment(mission.endDate).isBetween(interval[0], interval[6], 'days', '[]')){
                if(!result[mission.participantId]) {
                    result[mission.participantId] = []
                }
                result[mission.participantId].push(mission);
            }
            return result;
        }, {});
    } 

    useEffect(() => {
        let interval = [];
        for(let i = week * 7; i < (week + 1) * 7; i++) {
            interval.push(moment(new Date()).startOf('day').add({ days: i }))
        }
        setInterval([...interval]);
    }, [week]);

    useEffect(() => {
        setGroup(groupByParticipant(datas));
    }, [datas, interval]);

    return (<div { ...handlers }>
        <div className="dates">
            { interval.map((date, i) => 
                <span key={i} className={classNames('date', { 'left-button': i === 0 }, { 'right-button' : i === 6 })} 
                      onClick={ i === 0 ? onSwipedRight : i === 6 ? onSwipedLeft : () => {}}>
                    <span>{ date.locale('fr').format('ddd') }</span>
                    <span>{ date.format('DD/MM') }</span>
                </span>
            )}
        </div>
        <div className={classNames('rows')}>
            { Object.keys(group).map(k => <CalendarGroup key={k} missions={group[k]} interval={interval} onEventClick={onEventClick}/>) }
        </div>
    </div>)
}

export default Calendar;