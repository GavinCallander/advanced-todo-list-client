import { AuthButton } from '../../helpers';

export default function Home() {
    return (
        <div className="page">
            <div className="page__section">
                <p className="">Get organized alone</p>
                <p className="">Get organized together</p>
                <p className="">Make life easy</p>
            </div>
            <div className="page__section">
                <AuthButton 
                    text="Sign Up"
                />
                <p className="">or</p>
                <AuthButton 
                    text="Log In"
                />
            </div>
        </div>
    )
};