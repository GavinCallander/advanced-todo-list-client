import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { ListItem, ListItemModal, ListSection } from '../../helpers';

export default function ListPage({ match }) {

    const [listId, setListId] = useState(null);
    const [listData, setListData] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const [sectionId, setSectionId] = useState("");


    useEffect(() => {
        setListId(match.params.id);
    }, []);

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
            section.length ? 
                items = sections.listItems.map(listItem => {
                    return <ListItem name={listItem} />
                }):
                items = <ListItem name="Thing" />
                return<ListSection key={section._id} setModalOpen={setModalOpen} sectionId={section._id} setSectionId={setSectionId} name={section.name}></ListSection>
                }):
                null;

    /*
        ToDo: 
            *   List section needs to be able to expand, therefore it must be held inside a container
            *   You should be able to click on each section to expand, which will reveal controls
                *   e.g. edit, delete etc.
            *   Labelling needs to be significantly improved
    */

    return (
        <div className="page">
            <ListItemModal 
                className={className}
                itemFields={listData.itemFields}
                listId={listId}
                sectionId={sectionId}
                setModalOpen={setModalOpen}
            />
            <p className="">{name}</p>
            <div className="list">
                {sectionsDisplay}
            </div>
            <Link to="/dashboard">Dashboard</Link>
        </div>
    )
};