import { useEffect, useState } from 'react';

import FormInput from './FormInput';

import * as DATA from '../../../constants/data';

// export default function SinglePageForm forwardRef(props, ref) {
export default function SinglePageForm(props) {

    /*
        ToDo:   Prevent SinglePageForm mounting before Modal...
            *   Probably based on content?
            *   Ensure componentLifeCycle integrity
    */

// STATE
    const [formData, setFormData] = useState({});
    const [inputFieldNames, setInputFieldNames] = useState([]);

// LIFECYCLE EVENTS
    useEffect(() => {
        // console.log("SinglePageForm: componentDidMount");
    }, []);
    useEffect(() => {
        // console.log("SinglePageForm: componentDidUpdate: props");
        setDataAndInputs();
    }, [props]);
    useEffect(() => {
        // console.log("SinglePageForm: componentDidUpdate: formData");
    }, [formData]);

// METHODS
    const handleFormSubmit = e => {
        e.preventDefault();
        props.setData(formData);
    };
    const setDataAndInputs = () => {
        let { method, modalType } = props;
        let tempObj = DATA[method][modalType];
        let tempArr = [];
        for (let key in DATA[method][modalType]) {
            console.log(key);
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
        tempObj.email = "Testing";
        tempObj.owner = props.userId;
        setFormData(tempObj);
        setInputFieldNames(tempArr);
    };
    const handleInputChange = e => {
        let name = e.target.getAttribute("name");
        setFormData({...formData, [name]: e.target.value});
    };

// CONTENT
    let content = inputFieldNames.length ? 
                    inputFieldNames[0].map(name => 
                        <FormInput 
                            formData={formData}
                            handleInputChange={handleInputChange}
                            key={name} 
                            name={name}
                        />) :
                        null;

    return (
        <form className="" onSubmit={e => handleFormSubmit(e)}>
            A single page form
            { content }
            <input className="" type="submit" value="Submit" />
        </form>
    )
};