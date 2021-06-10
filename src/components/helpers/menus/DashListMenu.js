export default function DashListMenu(props) {

    let className = props.menuActive ? "menu-list-dash menu-list-dash--active" : "menu-list-dash";

    return (
        <ul className={className}>
            <li className="">A menu item</li>
            <li className="">And another</li>
        </ul>
    )
};

/*
    ToDo:   What is needed from this component?
            *   Consider operations which may be required at the list level
                *   e.g. delete/archive list; go to list; invite collaborator
*/