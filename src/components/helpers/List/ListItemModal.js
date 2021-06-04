import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ListItemModal(props) {

    /*
        ToDo: Okay, so this is an absolute mess and hardcoding was a quick fix
            *   Need to dynamically generate tempObj in order to make work at scale
            *   Need to consider multiple useEffects to ensure component lifecycle integrity
    */

    // naming all over the place, please change
    const [name, setName] = useState("");
    const [itemFields, setItemFields] = useState([]);

    /*
        final array should look like so
        itemFields = [
            {name: Size, value: 'whatever'},
            {name: Quantity, value: 'whatever'}
        ]
    */

    /*
        ToDo:   *   
    */
    let tempObj = {
        Size: "",
        Quantity: "",
    };

    useEffect(() => {
        setItemFields(props.itemFields);

    }, [props.itemFields]);

    const submitNewListItem = e => {
        e.preventDefault();
        console.log("hitting function")
        for (let key in tempObj) {
            console.log("checking keys")
            let tempArr = itemFields;
            tempArr.forEach(field => {
                if (field.name == key) {
                    console.log("Yay")
                    console.log(tempObj)
                    console.log(tempObj[`${key}`]);
                    field.value = tempObj[`${key}`];
                    setItemFields(tempArr);
                }
            })
        }
        axios.put(`${process.env.REACT_APP_SERVER_URL}/lists/item`,
            { itemFields, listId: props.listId, name, sectionId: props.sectionId }
        )
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.log(err);
        })
    };

    const handleInputChange = e => {
        for (let key in tempObj) {
            if (e.target.getAttribute("name") == key) {
                tempObj[key] = e.target.value;
            }
        }
    }

    let inputFields = props.itemFields && props.itemFields.length ?
        props.itemFields.map((field, i) => {
            return (
                <span className="" key={i}>
                    <p className="">
                        {field.name}
                    </p>
                    <input 
                        className="" 
                        name={field.name}
                        onChange={e => handleInputChange(e)}
                    />
                </span>
            )
        }):
        ""

    return (
        <div className={props.className}>
            <h1>Add a new item</h1>
            <form onSubmit={e => submitNewListItem(e)}>
                <span className="">
                    <p className="">Name:</p>
                    <input className="" onChange={e => setName(e.target.value)} type="text" />
                </span>
                {inputFields}
                <input type="submit" value="submit" />
                {/* <button type="button" onClick={() => test()}>Click Me</button> */}
            </form>
        </div>
    )
};