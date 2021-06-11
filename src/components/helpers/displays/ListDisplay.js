import { useEffect } from "react";

import SectionDisplay from './SectionDisplay';

export default function ListDisplay(props) {

    useEffect(() => {
        console.log("componentDidMount");
    }, []);

    let sections = props.listData && props.listData.sections ?
        props.listData.sections.map(section => {
            let items = [];
            props.listData.list_items.map(item => {
                if (item.section._id == section._id) {
                    items.push(item);
                }
                else {
                    console.log(item._id, section._id, "fail");
                }
            });
            return <SectionDisplay 
                        items={items}
                        key={section}
                        listData={props.listData}
                        name={section.name}
                        setMethod={props.setMethod}
                        setModalActive={props.setModalActive}
                        setModalType={props.setModalType}
                        setRoute={props.setRoute}
                        sectionId={section._id}
                        setUserData={props.setUserData}
                        userData={props.userData}
                    />
            }): 
            null;

    return (
        <div className="list">
            {sections}
        </div>
    )
};

/*
    ToDo:   What is needed from this component?
            *   Structure for child components
                *   specifically sections; what happens to other sections if one expands?

    ToDo:   Secondary Tasks
            *   Tidy up SectionDisplay imports
                *   ensure changes are done simultaneously to avoid bugs
*/