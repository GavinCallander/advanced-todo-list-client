import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import { LIST } from '../../../constants/routes';

export default function ListForm(props) {

    const [currentSection, setCurrentSection] = useState("");
    const [currentField, setCurrentField] = useState("");
    const [fields, setFields] = useState([]);
    const [formPage, setFormPage] = useState(1);
    const [listId, setListId] = useState(null);
    const [name, setName] = useState("");
    const [ownerId, setOwnerId] = useState(0);
    const [redirect, setRedirect] = useState(false);
    const [sections, setSections] = useState([]);

    const addField = () => {
        setFields([...fields, currentField]);
        setCurrentField("");
    };
    const addSection = () => {
        setSections([...sections, currentSection]);
        setCurrentSection("");
    };

    const handleNewListSubmit = e => {
        let data = { fields, name, ownerId, sections }
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_SERVER_URL}/new`, { data })
        .then(response => {
            console.log(response);
            setListId(response.data._id)
            setRedirect(true);
        })
        .catch(err => {
            console.log(err);
        });
    };

    useEffect(() => {
        setOwnerId(props.user._id);
    }, []);

    if (redirect) return <Redirect to={`${LIST}/${listId}`} />

    return (
        <form className="list-form" onSubmit={e => handleNewListSubmit(e)}>
            <span className="list-form__field">
                <p className="">
                    Name: 
                </p>
                <input 
                    className="" 
                    onChange={e => setName(e.target.value)}
                    placeholder="Groceries, Chores etc." 
                    type="text" 
                />
            </span>
            <span className="list-form__field">
                <p className="">Section Name:</p>
                <input 
                    className=""
                    onChange={e => setCurrentSection(e.target.value)}
                    value={currentSection}
                />
                <button 
                    className="" 
                    onClick={() => addSection()}
                    type="button"
                >
                    Add
                </button>
            </span>
            <span className="list-form__field">
                <p className="">Field Name:</p>
                <input
                    className=""
                    onChange={e => setCurrentField(e.target.value)}
                    value={currentField}
                />
                <button 
                    className="" 
                    onClick={() => addField()}
                    type="button"
                >
                    Add
                </button>
            </span>
            <input type="submit" value="Add List" />
        </form>
    )
};