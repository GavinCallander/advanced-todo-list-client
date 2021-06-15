import { useEffect, useState } from 'react';

import FormInput from './FormInput';
import FormNav from './FormNav';

import * as DATA from '../../../constants/data';

import * as METHODS from '../../../modules/api';

export default function MultiPageForm(props) {

/* 
ToDo:   How is data being handled between form pages and inputs?
        *   this is specifically true when compared to SingPageForm

ToDo:   Order of operations for MultiPageForm:
        *   component mounts
        *   component updates as it receives props, which triggers following functions
            *   storing input field names
*/

// STATE
    const [currentPage, setCurrentPage] = useState(0);
    const [formData, setFormData] = useState({});
    const [inputFieldNames, setInputFieldNames] = useState([]);

//  LIFECYCLE EVENTS
    useEffect(() => {
        // console.log("MultiPageForm: componentDidMount");
    }, []);
    useEffect(() => {
        // console.log("MultiPageForm: componentDidUpdate: props");
        setDataAndInputs();
    }, [props]);
    useEffect(() => {
        // console.log("MultiPageForm: componentDidUpdate: formData");
    }, [formData]);

// METHODS
    const setDataAndInputs = () => {
        let { method, modalType } = props;
        let tempObj = DATA[method][modalType];
        let tempArr = [];
        for (let key in DATA[method][modalType]) {
            // check every key related to data
            if (!Array.isArray(DATA[method][modalType][key])) {
                // if it isn't of type array
                if (!tempArr.length) {
                    // if the array has no length
                        // push the key as an array
                    tempArr.push([key]);
                }
                else {
                    // if the key isn't owner, push it to the array at index of 0
                    if (!key === "owner") {
                        tempArr[0].push(key);
                    }
                }
            }
            else {
                // else just push that shit
                tempArr.push(key);
            }
        };
        tempObj.owner = props.userId;
        setFormData(tempObj);
        setInputFieldNames(tempArr);
    };

// CONTENT
/*
    ToDo:   Render form content based upon the current page...
            *   For the time being, make it janky
*/
let content = 
    inputFieldNames.length ?
        currentPage === 0 ?
            inputFieldNames[0].map(name => 
                <FormInput 
                    formData={formData} 
                    key={name} 
                    name={name} 
                    setFormData={setFormData}
                />):
                <FormInput 
                    name={inputFieldNames[currentPage]} 
                    formData={formData} 
                    setFormData={setFormData}
                />:
                null;

    return (
        <div className="">
            A multi page form
            {content}
            <FormNav 
                currentPage={currentPage} 
                setCurrentPage={setCurrentPage}
                {...props} 
            />
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