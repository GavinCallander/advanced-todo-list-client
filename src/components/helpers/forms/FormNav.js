import { useEffect } from 'react';

export default function FormNav(props) {

    useEffect(() => {
        console.log("FormNav: componentDidMount");
    }, []);
    useEffect(() => {
        console.log("FormNav: componentDidUpdate: props");
        console.log(props);
    }, [props])

    const handleNavigation = e => {
        let name = e.target.getAttribute("name");
        let { currentPage, setCurrentPage, totalFormPages } = props;
        console.log(currentPage, totalFormPages)
        if (name === "prev" && currentPage > 0) {
            setCurrentPage(currentPage - 1);
        };
        if (name === "next" && currentPage < totalFormPages) {
            setCurrentPage(currentPage + 1);
        };
        return;
    };

    return (
        <div className="">
            <button name="prev" onClick={e => handleNavigation(e)}>Prev</button>
            <button name="next" onClick={e => handleNavigation(e)}>Next</button>
        </div>
    )
};

/* 
    ToDo:   What is needed from this component?
            *   Provides navigation for form where there is a user flow
                *   conditionally render here or in form?
*/