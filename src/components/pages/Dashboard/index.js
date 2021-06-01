import { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { ListDisplay, ListModal } from '../../helpers';

import { LIST } from '../../../constants/routes';

export default function Dashboard(props) {

    const [modalActive, setModalActive] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [route, setRoute] = useState("");

    let data = [
        {name: 'Something', progress: '70%'},
        {name: 'You', progress: '0%'},
        {name: 'Me', progress: '100%'}  
    ]

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