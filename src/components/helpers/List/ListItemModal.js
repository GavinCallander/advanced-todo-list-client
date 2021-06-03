import { useState } from 'react';
import axios from 'axios';

export default function ListItemModal(props) {

    const [name, setName] = useState("");

    const submitNewListItem = e => {
        e.preventDefault();
        axios.put(`${process.env.REACT_APP_SERVER_URL}/lists/item`, 
            { 
                listId: props.listId,
                name,
                sectionId: props.sectionId
            }
        )
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.log(err);
        });
    };

    return (
        <div className={props.className}>
            <h1>Add a new item</h1>
            <form onSubmit={e => submitNewListItem(e)}>
                <span className="">
                    <p className="">Name:</p>
                    <input className="" onChange={e => setName(e.target.value)} type="text" />
                </span>
                <input type="submit" value="submit" />
            </form>
        </div>
    )
};