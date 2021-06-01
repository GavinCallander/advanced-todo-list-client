export function LogInForm(props) {
    return (
        <form className="auth-form" onSubmit={props.handleAuthSubmit}>
            <span className="auth-form__field">
                <p className="">Email:</p>
                <input className="" onChange={e => {props.setEmail(e.target.value)}} type="text" />
            </span>
            <span className="auth-form__field">
                <p className="">Password:</p>
                <input className="" onChange={e => {props.setPassword(e.target.value)}} type="password" />
            </span>
            <span className="auth-form__field--submit">
                <input className="" type="submit" value="Log In" />
            </span> 
            <p className="">{props.errorMessage}</p>
        </form>
    );
};

export function SignUpForm(props) {
    return (
        <form className="auth-form" onSubmit={props.handleAuthSubmit}>
            <span className="auth-form__field">
                <p className="">First Name:</p>
                <input className="" onChange={e => props.setFirst_name(e.target.value)} type="text" />
            </span>
            <span className="auth-form__field">
                <p className="">Last Name:</p>
                <input className="" onChange={e => props.setLast_name(e.target.value)} type="text" />
            </span>
            <span className="auth-form__field">
                <p className="">Email:</p>
                <input className="" onChange={e => props.setEmail(e.target.value)} type="text" />
            </span>
            <span className="auth-form__field">
                <p className="">Password:</p>
                <input className="" onChange={e => props.setPassword(e.target.value)} type="password" />
            </span>
            <span className="auth-form__field">
                <p className="">Confirm Password:</p>
                <input className="" onChange={e => props.setPasswordConfirm(e.target.value)} type="password" />
            </span>
            <span className="auth-form__field--submit">
                <input className="" type="submit" value="Sign Up" />
            </span>
            <p className="">{props.errorMessage}</p>
        </form>
    );
};
