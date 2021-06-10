import { useEffect, useState } from 'react';

import { SinglePageForm, MultiPageForm } from '../helpers';

import * as DATA from '../../constants/data';

export default function Modal(props) {
//  COMPONENT STATE
    const [totalFormPages, setTotalFormPages] = useState(null);

//  LIFECYCLE EFFECTS
    useEffect(() => {
        console.log("Modal: componentDidMount");
    }, []);
    useEffect(() => {
        console.log("Modal: componentDidUpdate: props");
        let { methodType, modalType} = props;
        if (methodType && modalType) {
            checkFormType(methodType, modalType);
        }
    }, [props]);
    useEffect(() => {
        console.log("Modal: componentDidUpdate: totalFormPages");
    }, [totalFormPages]);

// METHODS
    const checkFormType = (methodType, modalType) => {
        let count = 1;
        let data = DATA[methodType][modalType];
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
                    null :
                        totalFormPages > 1 ?
                            <MultiPageForm 

                            /> :
                            <SinglePageForm 

                            />
            }
        </div>
    )
};