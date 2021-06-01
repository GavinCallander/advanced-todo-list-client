import ListForm from './ListForm';

export default function ListModal(props) {

    function handleModalClose() {
        props.setModalActive(false);
    };
    
    let className = props.modalActive ? "list-modal list-modal--active" : "list-modal";

    /*
        ToDo: 
            Finalize form user flow:
                *   On modal opening, the current userId is stored in state
                *   Next field to appear is Name; user should input and then hit next
                *   Next are sections; each will display once created, with the option to delete; next
                *   Next are fields for the list items; they will work the same as sections; next
                *   Next is a summary of inputs for confirmation; redirects to specific list page
    */

    return (
        <div className={className}>
            <span className="list-modal__header">
                {/* ToDo: Add header title and align with form */}
                <p className="" onClick={handleModalClose}>X</p>
            </span>
            <ListForm 
                setRedirect={props.setRedirect}
                setRoute={props.setRoute}
                user={props.user} 
            />
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