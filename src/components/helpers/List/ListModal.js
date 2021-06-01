import { useEffect, useState } from 'react';
import axios from 'axios';

import ListForm from './ListForm';

export default function ListModal(props) {

    const [fields, setFields] = useState([]);
    const [formPage, setFormPage] = useState(1);
    const [name, setName] = useState("");
    const [ownerId, setOwnerId] = useState(props.user._id);
    const [sections, setSections] = useState([]);

    function handleModalClose() {
        props.setModalActive(false);
    };
    
    let className = props.modalActive ? "list-modal list-modal--active" : "list-modal";
    let content;

    const handleNewListSubmit = e => {
        let data = { name: name }
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_SERVER_URL}/new`, { data })
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.log(err);
        });
    };

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
    //             handleFormClose={handleModalClose}
    //             setFormPage={setFormPage}
    //             setName={setName}
    //         /> : 
    //         formPage === 2 ?
    //         <PageTwo 
    //             sections={sections}
    //             setSections={setSections}
    //         /> :
    //         <PageThree 
    //             fields={fields}
    //             setFields={setFields}
    //         />


    return (
        <div className={className}>
            <span className="list-modal__header">
                {/* ToDo: Add header title and align with form */}
                <p className="" onClick={handleModalClose}>X</p>
            </span>
            <ListForm 
                setName={setName}
                handleNewListSubmit={handleNewListSubmit}
            />
            {/* {content} */}
            {/* <ModalNav
                handleNewListSubmit={handleNewListSubmit}
                formPage={formPage}
                setFormPage={setFormPage}
            /> */}
        </div>
    )
};

// think about possible first time user tutorial; keep hints in for after but maybe a more conversational
// approach would be beneficial for first time users?

// function ModalNav(props) {

//     let button = 
//         props.formPage === 3 ?
//         <input
//             className=""
//             type="submit"
//             value="Submit"
//         /> :
//         <button 
//             className=""
//             onClick={() => props.setFormPage(props.formPage + 1)}
//         >
//             Next
//         </button>
    
//     return (
//         <span className="">
//             <button className="" onClick={() => props.setFormPage(props.formPage - 1)}>Prev</button>
//             <button className="">Cancel</button>
//             {button}
//         </span>
//     )
// };