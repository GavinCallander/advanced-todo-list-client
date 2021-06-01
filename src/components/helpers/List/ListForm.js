import { useState } from 'react';

export default function ListForm(props) {

    const [currentSection, setCurrentSection] = useState("");
    const [currentField, setCurrentField] = useState("");
    const [fields, setFields] = useState([]);
    const [formPage, setFormPage] = useState(1);
    const [name, setName] = useState("");
    const [ownerId, setOwnerId] = useState(0);
    const [sections, setSections] = useState([]);

    return (
        <form className="list-form" onSubmit={e => props.handleNewListSubmit(e)}>
            <span className="list-form__field">
                <p className="">
                    Name: 
                </p>
                <input 
                    className="" 
                    onChange={(e) => props.setName(e.target.value)}
                    placeholder="Groceries, Chores etc." 
                    type="text" 
                />
            </span>
            <span className="list-form__field">
                <p className="">Section Name:</p>
                <input 
                    className=""
                    onChange={e => {setCurrentSection(e.target.value)}}
                />
                <button className="" onClick={() => {props.setSections(...props.sections, currentSection)}}>
                    Add
                </button>
            </span>
            <span className="list-form__field">
                <p className="">Field Name:</p>
                <input
                    className=""
                    onChange={e => {setCurrentField(e.target.value)}}
                />
                <button className="" onClick={() => props.setFields(...props.fields, currentField)}>
                    Add
                </button>
            </span>
            <input type="submit" value="Add List" />
        </form>
    )
};