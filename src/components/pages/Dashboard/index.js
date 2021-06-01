import { useState } from 'react';

import { ListDisplay, ListModal } from '../../helpers';

export default function Dashboard(props) {

    const [modalActive, setModalActive] = useState(false);

    let data = [
        {name: 'Something', progress: '70%'},
        {name: 'You', progress: '0%'},
        {name: 'Me', progress: '100%'}  
    ]

    let lists = data.map(datum => {
        return <ListDisplay key={datum.name} name={datum.name} progress={datum.progress} />
    })

    return (
        <div className="page">
            <ListModal 
                modalActive={modalActive} 
                setModalActive={setModalActive}
                user={props.user}
            />
            <h2>My Lists</h2>
            {/* probably need some copy above here as well as some form of toolbar */}
            {lists}
            <button onClick={() => setModalActive(true)}>Create a new list</button>
        </div>
    )
};