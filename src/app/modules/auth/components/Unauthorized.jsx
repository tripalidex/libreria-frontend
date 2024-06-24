import { useNavigate } from "react-router-dom";

function Unauthorized() {
    const navigate = useNavigate();

    const goLogin = () => navigate('/');

    return (
            <>
                <h1>Unauthorized</h1>
                <br />
                <p>You do not have access to the requested page.</p>
                <div>
                    <button onClick={goLogin}>Go Back</button>
                </div>
            </>
    )
}

export default Unauthorized;