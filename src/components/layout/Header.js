import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export default function Header(props) {

    let menu = props.user ?
        <span className="header__section">
            <FontAwesomeIcon icon={faBars} size="1x" />
        </span>:
        null

    return (
        <div className="header">
            <span className="header__section">
                <p className="heading heading--lg">Listed</p>
            </span>
            {menu}
        </div>
    )
};

/* 
    ToDo:   What is needed from this component?
            *   Hamburger needs to work
                *   does this mean another menu component?
*/