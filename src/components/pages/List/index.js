import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function List({ match }) {

    const [listId, setListId] = useState(null);
    const [listData, setListData] = useState({});

    useEffect(() => {
        setListId(match.params.id);
    }, []);

    const fetchListData = () => {
        if (!listId) return;
        axios.get(`${process.env.REACT_APP_SERVER_URL}/lists/${listId}`)
        .then(response => {
            console.log(response);
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

    return (
        <div className="page">
            <p className="">{name}</p>
            <Link to="/dashboard">Dashboard</Link>
        </div>
    )
};