import { useEffect, useState } from 'react';

import FormInput from './FormInput';

import * as DATA from '../../../constants/data';

export default function SinglePageForm(props) {

    /*
        ToDo:   Prevent SinglePageForm mounting before Modal...
            *   Probably based on content?
            *   Ensure componentLifeCycle integrity
    */

    const [formData, setFormData] = useState({});
    const [inputFieldNames, setInputFieldNames] = useState([]);

    useEffect(() => {
        console.log("SinglePageForm: componentDidMount");
    }, []);
    useEffect(() => {
        console.log("SinglePageForm: componentDidUpdate: props");
        setDataAndInputs();
    }, [props]);

    const setDataAndInputs = () => {
        let { method, modalType } = props;
        let tempObj = DATA[method][modalType];
        let tempArr = [];
        for (let key in DATA[method][modalType]) {
            if (!Array.isArray(DATA[method][modalType][key])) {
                if (!tempArr.length) {
                    tempArr.push([key]);
                }
                else {
                    tempArr[0].push(key);
                }
            }
            else {
                tempArr.push(key);
            }
        };
        tempObj.owner = props.userId;
        setFormData(tempObj);
        setInputFieldNames(tempArr);
    };

    return (
        <form className="">
            A single page form
            {
                inputFieldNames.length ? 
                    inputFieldNames[0].map(name => 
                        <FormInput 
                            formData={formData}
                            key={name} 
                            name={name} />) :
                        null
            }
        </form>
    )
};