import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

/*
    ToDo:
        *   Section should be a wrapper that takes any listItem components as children
            *   Section header should also include a newList button; shows on open
            *   This way, new lists can be easily submitted and attached to a given section
        *   ListItem should display an individual item, as well as have an intuitive UI
            *   Allows users to edit, delete, mark as done etc.
*/

export default function ListSection(props) {
    
    const [sectionActive, setSectionActive] = useState(false);

    console.log(props.sectionId);

    const handleModalOpen = () => {
        props.setModalOpen(true);
        props.setSectionId(props.sectionId);
    }

    let className = sectionActive ? "list__section list__section--active" : "list__section"; 
    let header = sectionActive ?
        <div className="list__section__header">
            <p 
                className="content content--one"
                onClick={() => {setSectionActive(!sectionActive)}}
            >
                {props.name}
            </p>
            <FontAwesomeIcon icon={faPlus} onClick={handleModalOpen} size="1x" />
        </div>:
        <div className="list__section__header" onClick={() => {setSectionActive(!sectionActive)}}>
            <p className="content content--one">{props.name}</p>
        </div>

    return (
        <div className={className}>
            {header}
        </div>
    )
};