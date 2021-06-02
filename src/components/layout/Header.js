import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export default function Header(props) {

    let menu = props.user ?
        <span className="header__section">
            <FontAwesomeIcon icon={faBars} size="2x" />
        </span>:
        null

    return (
        <div className="header">
            <span className="header__section">
                <h1>ToDo</h1>
            </span>
            {menu}
        </div>
    )
};