import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { ListDisplay, ListSection } from '../helpers';

import { getRoute } from '../../modules/api';

export default function ListPage( props ) {

    const [listId, setListId] = useState(null);
    const [listData, setListData] = useState({});

    useEffect(() => {
        setListId(props.match.params.id);
    }, [props]);

    useEffect(() => {
        let tempObj = {};
        tempObj.list_id = listData._id;
        tempObj.item_fields = listData.item_fields;
        props.setUserData(tempObj);
    }, [listData]);

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

    let sectionsDisplay = listData && sections ? 
        sections.map(section => {
            let items = [];
            listData.list_items.map(item => {
                if (item.section._id == section._id) {
                    items.push(item);
                }
            })
            // console.log(items);
            return <ListSection
                        items={items}
                        key={section._id}
                        name={section.name}
                        setMethodType={props.setMethodType}
                        setModalActive={props.setModalActive}
                        setModalType={props.setModalType}
                        setRoute={props.setRoute}
                        sectionId={section._id}
                        setUserData={props.setUserData}
                        userData={props.userData}
                    />
        }):
        null;

    /*
        ToDo: Complete Section display
                *   Need to pass down all associated listitems
    */

    return (
        <div className="page">
            <p className="">{name}</p>
            <ListDisplay 
                listData={listData}
            />
            <div className="list">
                {/* {sectionsDisplay} */}
            </div>
            <Link to="/dashboard">Dashboard</Link>
        </div>
    )
};