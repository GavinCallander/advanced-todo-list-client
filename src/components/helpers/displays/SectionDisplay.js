import { useEffect, useState } from 'react';

import ItemDisplay from './ItemDisplay';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default function SectionDisplay(props) {
    
    const [sectionActive, setSectionActive] = useState(false);

    let tempObj;

    useEffect(() => {
        tempObj = props.userData;
    }, [props]);

    const handleModalOpen = () => {
        // tempObj.section_id = props.sectionId;
        props.setMethod("PUT");
        props.setModalActive(true);
        props.setModalType("ITEM");
        props.setRoute("lists/item");
        props.setUserData(tempObj);
    };

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

    let items;
    let content = sectionActive ?
        items = props.items.map(item => {
            return <p className="" key={item._id}>{item.name}</p>
        }):
        <div className=""></div>

    return (
        <div className={className}>
            {header}
            {content}
        </div>
    )
};

/* 
    ToDo:   What is needed from this component?
            *   Smooth transition from inactive to active
                *   optimize transition
                *   display content smoothly, as opposed to immediately upon open
*/