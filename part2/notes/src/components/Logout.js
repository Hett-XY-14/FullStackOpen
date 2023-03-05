const Logout = ({ username, handleLogout }) => {
    return (
        <p>
            {username} logged-in
            <button onClick={handleLogout}>
                Logout
            </button>
        </p>
    )
}

export default Logout
