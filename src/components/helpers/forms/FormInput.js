import { useEffect, useState } from 'react';

export default function FormInput(props) {

/*
    ToDo:   Handle type of password being type="text"
        *   can probably just do by passing down a variable called inputType or something

    ToDo:   Consider a better UI than an add button for array inputs?
        *   could space down be add? 
            *   separates out entries with a semi-colon and stores them in state?
            *   would this need to be its own component?
*/

//  STATE
    const [label, setLabel] = useState("");

//  COMPONENT LIFECYCLE
    useEffect(() => {
        // console.log("FormInput: componentDidMount");
    }, []);
    useEffect(() => {
        // console.log("FormInput: componentDidUpdate: props")
        handleInputLabel(props.name);
    }, [props]);

//  METHODS
    const handleInputLabel = name => {
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

    return (
        <>
            {
                label ?
                    <span className="">
                        <p className="">{label}:</p>
                        <input 
                            className="" 
                            name={props.name}
                            onChange={e => props.handleInputChange(e)} 
                            placeholder={label} 
                            type=""
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