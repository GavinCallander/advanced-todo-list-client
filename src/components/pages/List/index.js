import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { ListItem, ListItemModal, ListSection } from '../../helpers';

export default function ListPage( props ) {

    const [listId, setListId] = useState(null);
    const [listData, setListData] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const [sectionId, setSectionId] = useState("");



    useEffect(() => {
        setListId(props.match.params.id);
    }, [props]);

    const fetchListData = () => {
        if (!listId) return;
        axios.get(`${process.env.REACT_APP_SERVER_URL}/lists/${listId}`)
        .then(response => {
            setListData(response.data.list);
        })
        .catch(err => {
            console.log(err);
        });
    };

    useEffect(() => {
        fetchListData();
    }, [listId]);

    let { collaborators, name, owner, sections } = listData;
    
    let className = modalOpen ? "list__item__modal list__item__modal--active" : "list__item__modal";
    let items;

    let sectionsDisplay = listData && sections ? 
        sections.map(section => {
            let items = [];
            listData.listItems.map(item => {
                if (item.section._id == section._id) {
                    items.push(item);
                }
            })
            // console.log(items);
            return <ListSection
                        items={items}
                        key={section._id}
                        // setModalOpen={setModalOpen}
                        setModalActive={props.setModalActive}
                        setModalType={props.setModalType}
                        sectionId={section._id}
                        setSectionId={setSectionId}
                        name={section.name}
                    />
        }):
        null


    // let sectionsDisplay = listData && sections ?
    //     sections.map(section => {
    //         section.length ? 
    //             items = sections.listItems.map(listItem => {
    //                 return <ListItem name={listItem} />
    //             }):
    //             items = <ListItem name="Thing" />
    //             return<ListSection key={section._id} setModalOpen={setModalOpen} sectionId={section._id} setSectionId={setSectionId} name={section.name}></ListSection>
    //             }):
    //             null;

    /*
        ToDo: Complete Section display
                *   Need to pass down all associated listitems
    */

    return (
        <div className="page">
            {/* <ListItemModal 
                className={className}
                itemFields={listData.itemFields}
                listId={listId}
                sectionId={sectionId}
                setModalOpen={setModalOpen}
            /> */}
            <p className="">{name}</p>
            <div className="list">
                {sectionsDisplay}
            </div>
            <Link to="/dashboard">Dashboard</Link>
        </div>
    )
};