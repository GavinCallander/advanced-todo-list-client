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
                    console.log(item._id, section._id, "good")
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
                    />
            }): 
            null;

    return (
        <div className="list">
            {sections}
        </div>
    )
};