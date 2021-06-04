import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Modal(props) {

    const [data, setData] = useState({});

    let modalClassName = props.modalActive ?
        "modal modal--active" : "modal"

    return (
        <div className={modalClassName}>
            <h1>A modal</h1>
            <p>for {props.modalType}</p>
        </div>
    )
};