export default function AuthButton(props) {

    function openModal() {
        if (!props.modalActive) {
            props.setMethodType("post")
            props.setModalActive(true);
            props.setModalType(props.text);
        }
        return;
    };

    return (
        <div className="auth-btn" onClick={openModal}>
            <p className="">{props.text}</p>
        </div>
    );
};