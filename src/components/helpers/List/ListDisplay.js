import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

import { LIST } from '../../../constants/routes';

export default function ListDisplay(props) {

    const { id, name, progress } = props;

    return (
        <Link className="list-display" to={`${LIST}/${id}`}>
            <FontAwesomeIcon icon={faEllipsisV} size="2x" />
            <p className="">{name}</p>
            <p className="">{progress}</p>
        </Link>
    )
};