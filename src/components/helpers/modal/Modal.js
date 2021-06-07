import { useEffect, useState } from 'react';
import axios from 'axios';

import * as METHODS from '../../../modules/api';

import * as DATA from '../../../constants/data';

export default function Modal(props) {

    /*
        list of params which need to be taken by Modal
        -   modalActive
        -   modalType
        -   methodType
        -   route
    */

    /*
        Modal order of operations:
            *   Modal is activated
                *   Mounts
            *   Want to confirm what type of modal it is to begin with
                *   DELETE
                    *   if DELETE, just a confirm box
                *   POST
                    *   if POST, what type of POST?
                        *   if Auth, render login or signup
                        *   if List, render list user flow?
                *   PUT
                    *   if PUT, what type of PUT? (start with post and build from there)
    */

    /*
        modal component must accept:
            -   methodType (post, put, get, delete, patch)
            -   route (which backend route are we hitting)
            -   must we update state in the function?
                -   can setState take a function which returns a value?
                -   perform multiple operations during the setState phase?
    */

    const [data, setData] = useState({});
    const [inputFields, setInputFields] = useState([]);
    const [tempKey, setTempKey] = useState("");
    const [tempObj, setTempObj] = useState({});
    
    
    let options = { 
        data, 
        route: props.route
    };
    let tempFields = [];

    // did mount
    useEffect(() => {
        console.log("componentDidMount")
    }, []);

    useEffect(() => {
        /*
            ToDo: Bit verbose and unclean; tidy up
                *   Possible opportunity for helper function which returns a value inside setState
        */
        console.log("componentDidUpdate")
        if (props.methodType === "post") {
            console.log("Yes")
            for (let keyOne in DATA) {
                if (keyOne == props.methodType.toUpperCase()) {
                    console.log(keyOne);
                    for (let keyTwo in DATA[keyOne]) {
                        if (keyTwo === props.modalType.toUpperCase()) {
                            console.log(DATA[keyOne][keyTwo]);
                            setTempObj(DATA[keyOne][keyTwo]);
                            for (let keyThree in DATA[keyOne][keyTwo]) {
                                tempFields.push(keyThree);
                            };
                        };
                    };
                };
            };
        };
        setTempKey(tempFields[0]);
        setInputFields(tempFields);
    }, [DATA, props]);
    
    useEffect(() => {
        // this effect hook should hit the api
        if (data[tempKey]) {
            METHODS.postRequest(options);
            props.setModalActive(false);
        }
    }, [data]);

    // Form submit
    const submitForm = (e) => {
        e.preventDefault();
        console.log("submitting")
        console.log(tempObj);
        setData(tempObj);
    };
    
    // classNames and ids
    let modalClassName = props.modalActive ? "modal modal--active" : "modal";
    
    // Create inputs for each subKey
    let inputs = inputFields.map(field => {
        console.log(field);
        return (
            <FormInput
                key={field}
                field={field}
                setTempObj={setTempObj}
                tempObj={tempObj}
            />
        )        
    });

    return (
        <div className={modalClassName}>
            <h1 onClick={() => props.setModalActive(!props.modalActive)}>A modal</h1>
            <form onSubmit={e => submitForm(e)}>
                {inputs}
                <input 
                    className=""
                    type="submit"
                    value="submit"
                />
            </form>
        </div>
    )
};

function FormInput(props) {

    let label;

    const handleLabel = (name) => {
        let tempArr = name.split("");
        let index;
        for (let i = 0; i < tempArr.length; i++) {
            if (i === 0 || tempArr[i-1] === "_") {
                tempArr[i] = tempArr[i].toUpperCase();
            }
            if (tempArr[i] === "_") {
                index = i;
            }
        }
        tempArr[index] = " ";
        label = tempArr.join("");
    };
    
    handleLabel(props.field);

    const handleChange = e => {
        let name = e.target.getAttribute("name");
        for (let key in props.tempObj) {
            if (key == name) {
                props.tempObj[key] = e.target.value;
            }
        }
        return;
    };

    return (
        <span className="">
            <p className="">{label}:</p>
            <input 
                className="" 
                name={props.field} 
                onChange={e => handleChange(e)} 
                type="" 
            />
        </span>
    )
};

// modal can open and close from anywhere

// labels are being generated dynamically generated 

// all data that needs to be passed is stored in a tempObj
    // Dynamically create these based on modalType?
