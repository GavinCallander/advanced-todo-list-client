import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import { DashListDisplay } from '../helpers';

import { LIST } from '../../constants/routes';

export default function DashboardPage(props) {

    const [lists, setLists] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const [route, setRoute] = useState("");

    const fetchLists = () => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/lists`)
        .then(response => {
            setLists(response.data.user.lists);
        })
        .catch(err => {
            console.log(err);
        });
    };

    useEffect(() => {
        fetchLists();
    }, [props.user]);

    let listsDisplay = lists.map(list => {
        return <DashListDisplay 
                    key={list._id}
                    id={list._id}
                    name={list.name} 
                    progress="100%" 
                />
    });

    if (redirect) {
        return <Redirect to={`${LIST}/${route}`} />
    }

    const handleClick = () => {
        props.setMethodType("POST");
        props.setModalActive(true);
        props.setModalType("LIST");
        props.setRoute("lists")
    };

    return (
        <div className="page">
            {/* <ListModal 
                modalActive={modalActive}
                setModalActive={setModalActive}
                setRedirect={setRedirect}
                setRoute={setRoute}
                user={props.user}
            /> */}
            <h2>My Lists</h2>
            {listsDisplay}
            {/* probably need some copy above here as well as some form of toolbar */}
            {/* <button onClick={() => setModalActive(true)}>Create a new list</button> */}
            <button onClick={handleClick}>Click</button>
        </div>
    )
};