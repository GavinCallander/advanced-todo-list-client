export default function AuthButton(props) {

    function openModal() {
        props.setModalActive(true);
        props.setModalType(props.text);
    }

    return (
        <div className="auth-btn" onClick={openModal}>
            <p className="">{props.text}</p>
        </div>
    );
};