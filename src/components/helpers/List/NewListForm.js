import { useEffect, useState } from 'react';

export default function NewListForm(props) {

    const [name, setName] = useState("");
    const [ownerId, setOwnerId] = useState(null);
    const [sections, setSections] = useState([]);


    useEffect(() => {
        setOwnerId(props.user._id);
    }, []);

    /*
        ToDo: 
            Make the form pages appear and disappear to begin with but can make it almost a carousel if it works stylistically
    */

    return (
        <form className="">
            
        </form>
    )
};