import { Link } from 'react-router-dom';

import { LIST } from '../../../constants/routes';

export default function ListDisplay(props) {

    const { id, name, progress } = props;

    return (
        <Link className="list-display" to={`${LIST}/${id}`}>
            <p className="">{name}</p>
            <p className="">{progress}</p>
        </Link>
    )
};