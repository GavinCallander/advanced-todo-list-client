import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import { ListDisplay, ListModal } from '../../helpers';

import { LIST } from '../../../constants/routes';

export default function Dashboard(props) {

    const [lists, setLists] = useState([]);
    const [modalActive, setModalActive] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [route, setRoute] = useState("");

    console.log("Outside the effect hook (dashboard)");

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
        console.log("Inside the effect hook (dashboard)")
        fetchLists();
    }, []);

    let listsDisplay = lists.map(list => {
        return <ListDisplay key={list._id} name={list.name} progress="100%" />
    });

    if (redirect) {
        return <Redirect to={`${LIST}/${route}`} />
    }

    return (
        <div className="page">
            <ListModal 
                modalActive={modalActive}
                setModalActive={setModalActive}
                setRedirect={setRedirect}
                setRoute={setRoute}
                user={props.user}
            />
            <h2>My Lists</h2>
            {listsDisplay}
            {/* probably need some copy above here as well as some form of toolbar */}
            <button onClick={() => setModalActive(true)}>Create a new list</button>
        </div>
    )
};