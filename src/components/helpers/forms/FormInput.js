export default function FormInput(props) {
    return (
        <div>
            {props.name}
            <input placeholder="lame" type="text" />
        </div>
    )
};

/* 
    ToDo:   What is need from this component?
            *   Will generate a label and input based on props passed into it
                *   consider the best way to handle data
                    *   better to be handled here or in a parent component?
*/