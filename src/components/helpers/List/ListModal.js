import { useEffect, useState } from 'react';

export default function ListCreateForm(props) {

    const [formPage, setFormPage] = useState(1);
    const [name, setName] = useState("");

    function handleFormClose() {
        props.setModalActive(false);
        setFormPage(1);
    };

    let className = props.modalActive ? "list-modal list-modal--active" : "list-modal";
    let content;

    content = 
        formPage === 1 ? 
            <PageOne 
                formPage={formPage}
                handleFormClose={handleFormClose}
                setFormPage={setFormPage}
                setName={setName}
            /> : 
            <PageTwo />

    return (
        <div className={className}>
            <span className="list-modal__header">
                {/* ToDo: Add header title and align with form */}
                <p className="" onClick={handleFormClose}>X</p>
            </span>
            {content}
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
    return(
        <form className="list-form">
            <p>World</p>
        </form>
    )
};