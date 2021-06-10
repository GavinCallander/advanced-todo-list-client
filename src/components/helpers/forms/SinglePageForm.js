import { useEffect, useState } from 'react';

import * as DATA from '../../../constants/data';

export default function SinglePageForm(props) {

    useEffect(() => {
        console.log("SinglePageForm: componentDidMount");
    }, []);
    useEffect(() => {
        console.log("SinglePageForm: componentDidUpdate: props");
    }, [props]);

    let className;

    return (
        <form className={className}>
            A single page form
        </form>
    )
};