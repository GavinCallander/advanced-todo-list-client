import { useEffect, useState } from 'react';

import { FormFlow } from '../helpers';

import * as DATA from '../../constants/data';

import * as METHODS from '../../modules/api';

export default function Modal(props) {

    const [data, setData] = useState({});
    const [formFlow, setFormFlow] = useState(false);
    const [formPage, setFormPage] = useState(0);
    const [inputFields, setInputFields] = useState([]);
    const [tempData, setTempData] = useState({});
    const [tempVal, setTempVal] = useState("");
    
    let options = { 
        data,
        route: props.route,
        setUser: props.setUser
    };
    let tempFields = [];

    /*
        ToDo: Work out if there's any difference between tempFields in a List vs Auth
    */

    const createInputsAndObject = (method, modal, userData) => {
        console.log("Dealing with inputs and object");
        let tempObj = {};
        for (let key in DATA[method][modal]) {
            tempObj[key] = DATA[method][modal][key];
            tempFields.push(key);
        };
        if (userData) { 
            tempObj = userData;
            for (let key in userData) {
                if (typeof(userData[key]) !== "string") {
                    userData[key].forEach(datum => {
                        tempFields.push(datum.name);
                    });
                };
            };
        } else {
            console.log(props.userData)
        }
        setTempData(tempObj);
    };

    const createListFormFlow = (method, modal ) => {
        setTempData(DATA[method][modal]);
        DATA[method][modal].owner = props.user._id;
        for (let key in DATA[method][modal]) {
            tempFields.push(key);
        }
        // console.log(DATA);
        // console.log(DATA[method]);
        // console.log(DATA[method][modal]);
    };

    useEffect(() => {
        console.log(tempData);
    }, [tempData]);
    
    // did mount
    useEffect(() => {
        console.log("componentDidMount")
    }, []);

    const handleInputChange = e => {
        // console.log("Changing", e.target.getAttribute("name"));
        console.log(tempData);
        if (formFlow) {
            console.log("temp val being updated")
            setTempVal(e.target.value);
            return;
        }
        // if (formPage > 1) {
        //     setTempVal(e.target.value);
        //     return;
        // }
        let name = e.target.getAttribute("name");
        let tempObj = tempData;
        console.log(tempObj);
        if (tempObj.item_fields) {
            console.log("There are item fields", tempObj.item_fields);
            tempObj.item_fields.forEach(field => {
                if (field.name === name) {
                    console.log(field.name);
                    field.value = e.target.value;
                }
                else {
                    console.log("The field isn't the same");
                    console.log(field.name, name);
                }
            })
        } else {
            tempObj[name] = e.target.value;
        }
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
        // console.log("componentDidUpdate")
        let method = props.methodType;
        let modal = props.modalType;
        switch (method) {
            case 'POST':
                // console.log("POST");
                switch (modal) {
                    case 'LIST':
                        setFormFlow(true);
                        // setFormPage(1);
                        createListFormFlow(method, modal);
                        break;
                    default:
                        createInputsAndObject(method, modal);
                        break;
                }
                break;
            case 'PUT':
                // console.log("PUT")
                switch (modal) {
                    default:
                        createInputsAndObject(method, modal, props.userData);
                        break;
                }
                break;
            default:
                return;
        };
        setInputFields(tempFields);
    }, [DATA, props]);
    // posts to API once data is set
    useEffect(() => {
        // this effect hook should hit the api
        switch (props.methodType) {
            case "PUT":
                console.log("Put")
                METHODS.putRequest(options);
                // props.setModalActive(false);
                break;
            case "POST":
                console.log("Posting")
                METHODS.postRequest(options);
                break;
            default:
                break;
            }
            props.setModalActive(false);
    }, [data]);

    // Form submit
    const submitForm = (e) => {
        e.preventDefault();
        setData(tempData);
    };
    
    // classNames and ids
    let modalClassName = props.modalActive ? "modal modal--active" : "modal";
    let btnClassName = formFlow ? "modal__nav__btn modal__nav__btn--active" : "modal__nav__btn";
    
    /* 
        ToDo:   Handle the form fields situation
                *   if formFlow exists, return FormFlow component
                *   otherwise, create inputs
    */

    let inputs = formFlow ?
        <FormFlow 
            tempData={tempData}
        /> :
        inputFields.map(field => {
            return <FormInput 
                        handleInputChange={handleInputChange}
                        field={field}
                        key={field} 
                        setTempData={setTempData}
                        tempData={tempData} 
                    />
        });

    // // Create inputs for each type of operation
    // let inputs = formFlow ?
    //     /*
    //         *   forms without arrays involved in passing data
    //         *   this part is complete for the time being
    //     */

    //     inputFields.map(field => {
    //         return <FormInput 
    //                     handleInputChange={handleInputChange}
    //                     field={field}
    //                     key={field} 
    //                     setTempData={setTempData}
    //                     tempData={tempData} 
    //                 />
    //     }) :
    //     formFlow ?
    //         /*
    //             *   This needs to be refactored into its own component
    //         */
    //         // name page of list form
    //         <span className="">
    //             <FormInput 
    //                 field={inputFields[formPage - 1]} 
    //                 setTempData={setTempData} 
    //                 tempData={tempData} 
    //                 handleInputChange={handleInputChange}
    //             />
    //         </span> :
    //         // sections or fields of list form
    //         <span className="">
    //             <FormInput 
    //                 field={inputFields[formPage - 1]} 
    //                 handleInputChange={handleInputChange}
    //                 setTempData={setTempData} 
    //                 setTempVal={setTempVal}
    //                 tempData={tempData}
    //                 value={tempVal}
    //             />
    //             <button 
    //                 className=""
    //                 onClick={() => addNewFieldOrSection(inputFields[formPage - 1])}
    //                 type="button"
    //             >
    //                 Add
    //             </button>
    //         </span>
    
    return (
        <div className={modalClassName}>
            <h1 onClick={() => props.setModalActive(!props.modalActive)}>A modal</h1>
            <form className="modal__form" onSubmit={e => submitForm(e)}>
                {inputs}
                <div className="modal__nav">
                    {/* cancel if pageOne */}
                    <button 
                        className={btnClassName}
                        disabled={formPage <= 1}
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
                        disabled={formPage >= inputFields.length - 1}
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
