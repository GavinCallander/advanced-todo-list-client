export default function ItemDisplay(props) {
    return (
        <div className="">
            <p className="">{props.name}</p>
        </div>
    )
};

/* 
    ToDo:   What is needed from this component?
            *   Styling
                *   decide what information is to be shown and design accordingly
            *   Interactivity with DB
                *   can it be set to complete on click?
                *   can it be selected to be marked as complete with others?
                *   ensure that whatever way it happens, a put route is hit
*/