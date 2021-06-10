import { useEffect } from 'react';

export default function FormNav(props) {

    useEffect(() => {
        // console.log("FormNav: componentDidMount");
    }, []);
    useEffect(() => {
        // console.log("FormNav: componentDidUpdate: props received")
        // console.log(props);
    }, [props])

    return (
        <div className="">

        </div>
    )
};

/* 
    ToDo:   What is needed from this component?
            *   Provides navigation for form where there is a user flow
                *   conditionally render here or in form?
*/