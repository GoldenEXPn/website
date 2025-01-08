const LoginButton = () => {
    const handleLogin = () => {
        window.location.href = "http://localhost:8000/authorize";
    };

    return (
        <button onClick={handleLogin} style={{padding: "10px", fontSize:"16px"}}>
            Login
        </button>
    );
};

export default LoginButton;