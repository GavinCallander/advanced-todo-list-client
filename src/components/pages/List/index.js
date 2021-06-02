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
            return <Section key={section._id} name={section.name} />
        }):
        null;

    return (
        <div className="page">
            <p className="">{name}</p>
            {sectionsDisplay}
            <button className="">Add a new item</button>
            <Link to="/dashboard">Dashboard</Link>
        </div>
    )
};

function Section(props) {
    return (
        <div className="">
            {props.name}
        </div>
    )
};