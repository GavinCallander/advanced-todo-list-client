import { useEffect, useState } from 'react';

export default function FormInput(props) {

/*
    ToDo:   How am I handling data? 
        *   Pass down the type from whichever form this is being rendered on?

    ToDo:   Consider a better UI than an add button for array inputs?
        *   could space down be add? 
            *   separates out entries with a semi-colon and stores them in state?
            *   would this need to be its own component?
*/

//  STATE
    const [label, setLabel] = useState("");
    const [value, setValue] = useState(null);

//  LIFECYCLE EVENTS
    useEffect(() => {
        console.log("FormInput: componentDidMount");
    }, []);
    useEffect(() => {
        console.log("FormInput: componentDidUpdate: props")
        // handleLabel(props.name);
        // initializeValue();
    }, [props]);

//  METHODS
    const handleInputChange = e => {
        console.log(e.target.value);
    };
    const handleLabel = name => {
        console.log(typeof(name));
        let tempArr = name.split("");
        let index;
        for (let i = 0; i < tempArr.length; i++) {
            if (i === 0 || tempArr[i-1] === "_") {
                tempArr[i] = tempArr[i].toUpperCase();
            };
            if (tempArr[i] === "_") {
                index = i;
            };
        };
        tempArr[index] = " ";
        setLabel(tempArr.join(""));
    };
    const initializeValue = () => {
        if (typeof(props.formData[props.name] != "string")) {
            setValue([]);
        }
        else {
            setValue("");
        };
    };

    return (
        <>
            {
                label ?
                    <span className="">
                        <p className="">{label}:</p>
                        <input 
                            className="" 
                            onChange={e => handleInputChange(e)} 
                            placeholder={label} type="" 
                            />
                    </span>:
                    null
            }
        </>
    )
};

/* 
    ToDo:   What is need from this component?
            *   Will generate a label and input based on props passed into it
                *   consider the best way to handle data
                    *   better to be handled here or in a parent component?
*/