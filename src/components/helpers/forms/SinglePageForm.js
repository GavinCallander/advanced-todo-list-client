import { useEffect, useState } from 'react';

import * as DATA from '../../../constants/data';

export default function SinglePageForm(props) {

    const [inputFieldNames, setInputFieldNames] = useState([]);

    useEffect(() => {
        console.log("SinglePageForm: componentDidMount");
    }, []);
    useEffect(() => {
        console.log("SinglePageForm: componentDidUpdate: props");
        console.log(props);
        setInputs();
    }, [props]);

    const setInputs = () => {
        let { method, modalType } = props;
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
        setInputFieldNames(tempArr);
    };

    return (
        <form className="">
            A single page form
        </form>
    )
};