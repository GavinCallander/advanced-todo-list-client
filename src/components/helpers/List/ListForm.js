import { useState } from 'react';
import axios from 'axios';

export default function ListForm(props) {

    const [currentSection, setCurrentSection] = useState("");
    const [currentField, setCurrentField] = useState("");
    const [itemFields, setItemFields] = useState([]);
    // const [formPage, setFormPage] = useState(1);
    const [name, setName] = useState("");
    const [owner, setOwner] = useState(null);
    const [sections, setSections] = useState([]);

    const addField = () => {
        let fieldObj = { name: currentField, value: "" }
        setItemFields([...itemFields, fieldObj]);
        setCurrentField("");
    };
    const addSection = () => {
        let sectionObj = {name: currentSection, listItems: []}
        setSections([...sections, sectionObj]);
        setCurrentSection("");
    };

    const handleNewListSubmit = e => {
        if (!sections) {
            setSections([...sections, "Section"])
        };
        let data = { itemFields, name, owner, sections }
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_SERVER_URL}/list/new`, { data })
        .then(response => {
            props.setRoute(response.data.createdList._id)
            props.setRedirect(true);
        })
        .catch(err => {
            console.log(err);
        });
    };

    // useEffect(() => {
    //     setOwner(props.user._id)
    // })

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