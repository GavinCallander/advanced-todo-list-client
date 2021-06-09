import { Link } from 'react-router-dom';

import { DashListMenu } from '../menus';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

import { LIST } from '../../../constants/routes';

export default function DashListDisplay(props) {

    const { id, name, progress } = props;

    return (
        <Link className="list-display" to={`${LIST}/${id}`}>
            <FontAwesomeIcon icon={faEllipsisV} size="2x" />
            <p className="">{name}</p>
            <p className="">{progress}</p>
        </Link>
    )
};

/*
    ToDo: What is needed from this component?
            *   Trigger for quickmenu on Ellipsis icon
            *   Link attached to list name and not the entire component
            *   Completion bar along the bottom for easy visualization
*/