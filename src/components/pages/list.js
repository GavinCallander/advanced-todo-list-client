import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { ListDisplay } from '../helpers';

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

    /* 
        ToDo: import this method from the api module and ensure all correct data are being passed down
    */
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

    return (
        <div className="page">
            <p className="">{listData.name}</p>
            <ListDisplay 
                listData={listData}
            />
            <Link to="/dashboard">Dashboard</Link>
        </div>
    )
};