import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import { ListDisplay, ListModal } from '../../helpers';

import { LIST } from '../../../constants/routes';

export default function Dashboard(props) {

    // const [lists, setLists] = useState([]);
    const [modalActive, setModalActive] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [route, setRoute] = useState("");

    let data = [
        {name: 'Something', progress: '70%'},
        {name: 'You', progress: '0%'},
        {name: 'Me', progress: '100%'}  
    ]

    const fetchLists = () => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/lists`)
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.log(err);
        });
    };

    useEffect(() => {
        // fetchLists();
    }, []);

    let lists = data.map(datum => {
        return <ListDisplay key={datum.name} name={datum.name} progress={datum.progress} />
    })

    if (redirect) return <Redirect to={`${LIST}/${route}`} />

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
            {/* probably need some copy above here as well as some form of toolbar */}
            {lists}
            <button onClick={() => setModalActive(true)}>Create a new list</button>
        </div>
    )
};