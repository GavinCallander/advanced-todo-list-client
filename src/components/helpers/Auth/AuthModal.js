import { useState } from 'react';

export default function AuthModal(props) {

    const [email, setEmail] = useState("");
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    return (
        <div className="auth-modal">

        </div>
    )
};

function SignUpForm() {
    return (
        <form className=""></form>
    )
};
function LogInForm() {
    return (
        <form className=""></form>
    )
};