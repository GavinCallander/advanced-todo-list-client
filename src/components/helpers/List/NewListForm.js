import { useEffect, useState } from 'react';

export default function NewListForm(props) {

    const [formPage, setFormPage] = useState(1);
    const [name, setName] = useState("");
    const [ownerId, setOwnerId] = useState(null);
    const [sections, setSections] = useState([]);


    useEffect(() => {
        setOwnerId(props.user._id);
    }, []);
    
    /*
        ToDo: 
            * Make the form pages appear and disappear to begin with but can make it almost a carousel if it works stylistically
            * Should be able to use objects to create these?
    */

    return (
        <form className="">

        </form>
    )
};