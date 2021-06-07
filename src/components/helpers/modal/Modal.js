import { useEffect, useState } from 'react';
import axios from 'axios';

import * as METHODS from '../../../modules/api';

import * as DATA from '../../../constants/data';

export default function Modal(props) {

    /*
        list of params which need to be taken by Modal
        // -   props
        -   modalActive
        -   modalType
        -   methodType
        -   route
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
    const [firstKey, setFirstKey] = useState("");
    const [tempObj, setTempObj] = useState({});

    let tempFields = [];

    // did mount
    useEffect(() => {
        console.log("componentDidMount")
    }, []);

    useEffect(() => {
        console.log("componentDidUpdate")
        for (let key in DATA) {
            if (key == props.modalType.toUpperCase()) {
                setTempObj(DATA[key]);
                for (let subKey in DATA[key]) {
                    tempFields.push(subKey);
                }
            };
        };
        setFirstKey(tempFields[0]);
        setInputFields(tempFields);
    }, [DATA, props]);
    
    useEffect(() => {
        console.log("componentDidUpdate");
        let options = { 
            data, 
            route: "auth/login",
            handleSuccess: props.handleAuth
        };
        if (data[firstKey]) {
            METHODS.postToApi(options);
            props.setModalActive(false);
        }
    }, [data]);

    // API CALLS
    const submitForm = (e) => {
        e.preventDefault();
        setData(tempObj);
    };
    //  POST
    const postToApi = () => {
        axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/login`, { data })
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.log(err);
        });
    };
    //  PUT
    const putToApi = () => {
        axios.put(`${process.env.REACT_APP_SERVER_URL}/something`, { data })
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.log(err);
        });
    };
    
    // classNames and ids
    let modalClassName = props.modalActive ? "modal modal--active" : "modal";
    
    // Create inputs for each subKey
    let inputs = inputFields.map(field => {
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
