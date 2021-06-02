import { useEffect, useState } from 'react';
import axios from 'axios';

export default function List({ match }) {

    const [listId, setListId] = useState(null);

    useEffect(() => {
        setListId(match.params.id)
    }, []);

    const fetchListData = () => {
        console.log(listId);
        axios.get(`${process.env.REACT_APP_SERVER_URL}/lists/${listId}`)
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.log(err);
        });
    };

    return (
        <div className="page">
            
        </div>
    )
};

// Hardest part so far is modeling data, drawing out a form to see what it will look like
// Is this an opportunity to use cool UI for drawing in data?
// Data flow would be something like
    // Name of list
    // Sections (with a what is this drop down for those who don't understand)
    // Labels (with a what is this drop down for those who don't understand)
    // ListItems
// The above will be created from the dashboard page