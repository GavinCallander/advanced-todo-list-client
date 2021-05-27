export default function AuthButton(props) {
    return (
        <div className="auth-btn" onClick={() => {props.setModalType(props.text)}}>
            <p className="">{props.text}</p>
        </div>
    )
}