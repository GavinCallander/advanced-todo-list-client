import { useEffect, useState } from 'react';

import * as DATA from '../../../constants/data';

export default function Form(props) {

    let method;
    let modal;

    useEffect(() => {
        method = props.methodType;
        modal = props.modalType;
    }, [props]);

    let className;



    return (
        <form className={className}>
            <h2>A Form</h2>
            <button onClick={() => console.log(method)} type="button">Method</button>
            <button onClick={() => console.log(modal)} type="button">Modal</button>
        </form>
    )
};