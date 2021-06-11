import { useEffect, useState } from 'react';

import { SinglePageForm, MultiPageForm } from '../helpers';

import * as DATA from '../../constants/data';

export default function Modal(props) {

/*
    ToDo:   How should Modal handle fields like owner on the list model?
        *   if (owner) for fields seems a bit hard-code(ish)? temporary solution, though
        *   
*/


//  COMPONENT STATE
    const [data, setData] = useState({});
    const [totalFormPages, setTotalFormPages] = useState(0);

//  LIFECYCLE EFFECTS
    useEffect(() => {
        console.log("Modal: componentDidMount");
    }, []);
    useEffect(() => {
        console.log("Modal: componentDidUpdate: props");
        let { method, modalType} = props;
        checkFormType(method, modalType);
    }, [props]);
    useEffect(() => {
        console.log("Modal: componentDidUpdate: totalFormPages");
    }, [totalFormPages]);
    useEffect(() => {
        // console.log(data);
    }, [data]);

// METHODS
    const checkFormType = (method, modalType) => {
        let count = 0;
        let data = DATA[method][modalType];
        for (let key in data) {
            if (Array.isArray(data[key])) {
                count++
            }
        };
        setTotalFormPages(count);
    };

    // conditionally switch modalClassName based on App.js:modalActive(true);
    let modalClassName = props.modalActive ? "modal modal--active" : "modal";

    return (
        <div className={modalClassName}>
            A modal
            {
                totalFormPages < 1 ?
                    <SinglePageForm 
                        setData={setData}
                        {...props}
                    /> :
                    totalFormPages > 1 ?
                        <MultiPageForm 
                            setData={setData}
                            totalFormPages={totalFormPages}
                            {...props}
                        /> :
                        null
            }
        </div>
    )
};