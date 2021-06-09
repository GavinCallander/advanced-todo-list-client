import { Link } from 'react-router-dom';

import { DashListMenu } from '../menus';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

import { LIST } from '../../../constants/routes';

export default function DashListDisplay(props) {

    const { id, name, progress } = props;

    return (
        <div className="list-display">
            <FontAwesomeIcon icon={faEllipsisV} size="1x" />
            <Link className="" to={`${LIST}/${id}`}>
                <p className="">{name}</p>
            </Link>
            <p className="">{progress}</p>
        </div>

    )
};

/*
    ToDo:   What is needed from this component?
            *   Trigger for quickmenu on Ellipsis icon
            *   Link attached to list name and not the entire component
            *   Completion bar along the bottom for easy visualization
*/