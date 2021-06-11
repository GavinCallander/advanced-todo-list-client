import { useEffect, useState } from 'react';

import FormNav from './FormNav';

import * as DATA from '../../../constants/data';

import * as METHODS from '../../../modules/api';

export default function MultiPageForm(props) {

/* 
ToDo:   Order of operations for MultiPageForm:
        *   component mounts
        *   component updates as it receives props, which triggers following functions
            *   storing input field names
*/

// STATE VARIABLES
    const [inputFieldNames, setInputFieldNames] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

//  LIFE CYCLE EVENTS
    useEffect(() => {
        console.log("MultiPageForm: componentDidMount");
    }, []);
    // STORING INPUT FIELDS PASSED IN AS PROPS
    useEffect(() => {
        console.log("MultiPageForm: componentDidUpdate: props");
        setInputs();
    }, [props]);

// METHODS
    const setInputs = () => {
        let { method, modalType } = props;
        let tempArr = [[]];
        for (let key in DATA[method][modalType]) {
            if (!Array.isArray(DATA[method][modalType][key])) {
                tempArr[0].push(key);
            }
            else {
                tempArr.push(key);
            }
        };
        setInputFieldNames(tempArr);
    };

    return (
        <div className="">
            A multi page form
            <p className="">{currentPage}</p>
        </div>
    )
};

/*
    ToDo:   What is needed from this component?
            *   implement MultiPageForm user flow
                *   displays previous input data
                    *   e.g.    pageOne:   name: input
                    *           pageTwo:   name;   sections: input | add (better UI at some point)
                    *           pageThree: name;   sections: dairy, meat, fruit and veg; fields: input | add
                    *           pageFour:  name; secions; fields; confirm 
*/