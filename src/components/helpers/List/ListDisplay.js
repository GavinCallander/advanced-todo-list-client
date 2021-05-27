export default function ListDisplay(props) {

    return (
        <div className="list-display">
            <p className="">{props.name}</p>
            <p className="">{props.progress}</p>
        </div>
    )
};