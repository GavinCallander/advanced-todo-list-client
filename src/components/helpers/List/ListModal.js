import { useEffect, useState } from 'react';

import NewListForm from './NewListForm';

export default function ListModal(props) {

    const [formPage, setFormPage] = useState(1);
    const [name, setName] = useState("");
    const [ownerId, setOwnerId] = useState(null);
    const [sections, setSections] = useState([]);

    function handleFormClose() {
        props.setModalActive(false);
        setFormPage(1);
    };
    
    let className = props.modalActive ? "list-modal list-modal--active" : "list-modal";
    let content;

    /*
        ToDo: 
            Finalize form user flow:
                *   On modal opening, the current userId is stored in state
                *   Next field to appear is Name; user should input and then hit next
                *   Next are sections; each will display once created, with the option to delete; next
                *   Next are fields for the list items; they will work the same as sections; next
                *   Next is a summary of inputs for confirmation; redirects to specific list page
    */

    // content = 
    //     formPage === 1 ? 
    //         <PageOne 
    //             formPage={formPage}
    //             handleFormClose={handleFormClose}
    //             setFormPage={setFormPage}
    //             setName={setName}
    //         /> : 
    //         formPage === 2 ?
    //         <PageTwo 
    //             sections={sections}
    //             setSections={setSections}
    //         /> :
    //         <PageThree />


    return (
        <div className={className}>
            <span className="list-modal__header">
                {/* ToDo: Add header title and align with form */}
                <p className="" onClick={handleFormClose}>X</p>
            </span>
            {/* {content} */}
            <NewListForm 
                user={props.user}
            />
        </div>
    )
};

// think about possible first time user tutorial; keep hints in for after but maybe a more conversational
// approach would be beneficial for first time users?


// Should be changed into reuseable component that takes input as props?

function PageOne(props) {
    return (
        <form className="list-form">
            <span className="list-form__field">
                <p className="">Name:</p>
                <input 
                    className="" 
                    onChange={(e) => props.setName(e.target.value)}
                    placeholder="Groceries, Chores etc." 
                    type="text" 
                />
            </span>
            <span className="list-form__field">
                <button className="" onClick={props.handleFormClose}>Cancel</button>
                <button className="" onClick={() => props.setFormPage(props.formPage + 1)}>Next</button>
            </span>
        </form>
    )
};
function PageTwo(props) {

    const [currentSection, setCurrentSection] = useState("");

    let content = props.sections.length ? 
        props.sections.map(section => {
        return <li>{section}</li>
        }) :
        <p>Womp Womp! No content yet</p>

    return(
        <form className="list-form">
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
            <ul className="">
                {content}
            </ul>
        </form>
    )
};

function PageThree() {
    return (
        <div></div>
    )
}