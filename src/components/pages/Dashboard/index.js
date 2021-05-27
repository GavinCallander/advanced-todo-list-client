import { useEffect, useState } from 'react';

import { ListDisplay, ListModal } from '../../helpers';

export default function Dashboard() {

    const [modalActive, setModalActive] = useState(false);

    useEffect(() => {

    }, []);

    let data = [
        {name: 'Something', progress: '70%'},
        {name: 'You', progress: '0%'},
        {name: 'Me', progress: '100%'}
    ]

    let content = data.map(datum => {
        return <ListDisplay key={datum.name} name={datum.name} progress={datum.progress} />
    })

    return (
        <div className="page">
            <ListModal 
                modalActive={modalActive} 
                setModalActive={setModalActive}
            />
            <h2>My Lists</h2>
            {/* probably need some copy above here as well as some form of toolbar */}
            {content}
            <button onClick={() => setModalActive(true)}>Create a new list</button>
        </div>
    )
};