export default function AuthButton(props) {

    function openModal() {
        if (!props.modalActive) {
            props.setFormType(0);
            props.setMethodType("POST")
            props.setModalActive(true);
            props.setModalType(props.text.toUpperCase());
            props.setRoute(props.route);
        }
        return;
    };

    return (
        <div className="auth-btn" onClick={openModal}>
            <p className="">{props.text}</p>
        </div>
    );
};