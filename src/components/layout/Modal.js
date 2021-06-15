import { useEffect, useState } from 'react';

import { SinglePageForm, MultiPageForm } from '../helpers';

import * as METHODS from '../../modules/api';

import * as DATA from '../../constants/data';

export default function Modal(props) {

/*
    ToDo:   How should Modal handle fields like owner on the list model?
        *   if (owner) for fields seems a bit hard-code(ish)? temporary solution, though
*/

//  STATE
    const [data, setData] = useState({});
    const [options, setOptions] = useState({});
    const [totalFormPages, setTotalFormPages] = useState(0);

//  LIFECYCLE EFFECTS
    useEffect(() => {
        console.log(DATA);
        // console.log("Modal: componentDidMount");
    }, []);
    useEffect(() => {
        // console.log("Modal: componentDidUpdate: props");
        let { method, modalType, route, setUser} = props;
        setOptions({ data, route, setUser });
        checkFormType(method, modalType);
    }, [props]);
    useEffect(() => {
        console.log(data, 'in the totalFormPages effect hook');
        // console.log("Modal: componentDidUpdate: totalFormPages");
    }, [totalFormPages]);

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
    const handleFormSubmit = () => {
        switch (props.method) {
            case "POST":
                console.log("Method: POST")
                METHODS.postRequest(options);
                break;
            case "PUT":
                METHODS.putRequest(options);
                console.log("Method: PUT")
                break;
            default:
                return;
        };
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