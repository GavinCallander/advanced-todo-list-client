import { useEffect, useState } from 'react';

import * as METHODS from '../../../modules/api';

import * as DATA from '../../../constants/data';

export default function Modal(props) {

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
                            *   How to do this?
                                *   Separate component?
                *   PUT
                    *   if PUT, what type of PUT? (start with post and build from there)
    */

    const [data, setData] = useState({});
    const [formPage, setFormPage] = useState(0);
    const [inputFields, setInputFields] = useState([]);
    const [tempKey, setTempKey] = useState("");
    const [tempData, setTempData] = useState({});
    const [tempVal, setTempVal] = useState("");
    
    let options = { 
        data, 
        route: props.route
    };
    let tempFields = [];

    /*
        ToDo: Work out if there's any difference between tempFields in a List vs Auth
    */

    const createInputsAndObject = (method, modal) => {
        setTempData(DATA[method][modal]);
        for (let key in DATA[method][modal]) {
            tempFields.push(key);
        };
    };

    const createListFormFlow = (method, modal) => {
        // console.log(DATA[method][modal]);
        DATA[method][modal].owner = props.user._id;
        setTempData(DATA[method][modal]);
        for (let key in DATA[method][modal]) {
            tempFields.push(key);
        }
    };
    
    // did mount
    useEffect(() => {
        console.log("componentDidMount")
    }, []);

    const handleInputChange = e => {
        // console.log(tempData);
        if (formPage > 1) {
            setTempVal(e.target.value);
            return;
        }
        let name = e.target.getAttribute("name");
        let tempObj = tempData;
        // console.log(tempObj[name]);
        tempObj[name] = e.target.value;
        // console.log(tempObj[name]);
        setTempData(tempObj);
    };

    const addNewFieldOrSection = (type) => {
        let tempObj = tempData;
        tempObj[type].push({ name: tempVal });
        setTempVal("");
        setTempData(tempObj);
    };

    // const handleChange = e => {
    //     let name = e.target.getAttribute("name");
    //     for (let key in props.tempObj) {
    //         if (key == name) {
    //             props.tempObj[key] = e.target.value;
    //         }
    //     }
    //     return;
    // };

    // handles form flow and data storage for specific modal
    useEffect(() => {
        console.log("componentDidUpdate")
        let method = props.methodType;
        let modal = props.modalType;
        switch (method) {
            case 'POST':
                console.log("POST");
                switch (modal) {
                    case 'LIST':
                        setFormPage(1);
                        createListFormFlow(method, modal);
                        // console.log("LIST: We gotta go with the flow now");
                        break;
                    default:
                        createInputsAndObject(method, modal);
                        break;
                }
                break;
            case 'PUT':
                console.log("PUT")
                switch (modal) {
                    default:
                        break;
                }
                break;
            default:
                console.log("Deleting, I take it?");
        };
        setTempKey(tempFields[0]);
        setInputFields(tempFields);
    }, [DATA, props]);
    // posts to API once data is set
    useEffect(() => {
        // this effect hook should hit the api
        console.log(data);
        if (data[tempKey]) {
            METHODS.postRequest(options);
            props.setModalActive(false);
        }
    }, [data]);

    // Form submit
    const submitForm = (e) => {
        e.preventDefault();
        setData(tempData);
    };
    
    // classNames and ids
    let modalClassName = props.modalActive ? "modal modal--active" : "modal";
    let btnClassName = formPage !== 0 ? "modal__nav__btn modal__nav__btn--active" : "modal__nav__btn";
    
    // Create inputs for each type of operation
    let inputs = formPage === 0 ?
        /*
            *   forms without arrays involved in passing data
            *   this part is complete for the time being
        */

        inputFields.map(field => {
            return <FormInput 
                        handleInputChange={handleInputChange}
                        key={field} field={field}
                        setTempData={setTempData}
                        tempData={tempData} 
                    />
        }) :
        formPage === 1 ?
            /*
                *   This needs to be refactored into its own component
            */
            // name page of list form
            <span className="">
                <FormInput 
                    field={inputFields[formPage - 1]} 
                    setTempData={setTempData} 
                    tempData={tempData} 
                    handleInputChange={handleInputChange}
                />
            </span>:
            // sections or fields of list form
            <span className="">
                <FormInput 
                    field={inputFields[formPage - 1]} 
                    handleInputChange={handleInputChange}
                    setTempData={setTempData} 
                    setTempVal={setTempVal}
                    tempData={tempData}
                    value={tempVal}
                />
                <button 
                    className=""
                    onClick={() => addNewFieldOrSection(inputFields[formPage - 1])}
                    type="button"
                >
                    Add
                </button>
            </span>
    
    return (
        <div className={modalClassName}>
            <h1 onClick={() => props.setModalActive(!props.modalActive)}>A modal</h1>
            <form className="modal__form" onSubmit={e => submitForm(e)}>
                {inputs}
                <div className="modal__nav">
                    {/* cancel if pageOne */}
                    <button 
                        className={btnClassName}
                        disabled={formPage === 1}
                        onClick={() => setFormPage(formPage - 1)} 
                        type="button"
                    >
                        Prev
                    </button>
                    <input 
                        className="modal__nav__input modal__nav__input__active"
                        type="submit"
                        value="submit"
                    />
                    <button
                        className={btnClassName}
                        disabled={formPage === inputFields.length}
                        onClick={() => setFormPage(formPage + 1)} 
                        type="button"
                    >
                        Next
                    </button>
                </div>
            </form>
        </div>
    )
};

/* --------------------------------------------------------------------- */

function FormInput(props) {

    // console.log("A NEW FORM INPUT!", props.value)

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

    return (
        <span className="modal__form__field">
            <p className="">{label}:</p>
            <input 
                className="" 
                name={props.field} 
                onChange={e => props.handleInputChange(e)} 
                type=""
            />
        </span>
    )
};

// modal can open and close from anywhere

// labels are being generated dynamically generated 

// all data that needs to be passed is stored in a tempObj
    // Dynamically create these based on modalType?
