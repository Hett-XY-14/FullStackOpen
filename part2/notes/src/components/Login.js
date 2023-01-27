const Login = ({ username, password, onUsernameChange, onPasswordChange, handleLogin }) => {
    return (
        <form onSubmit={ handleLogin }>
            <div>
                username
                <input
                    type="text"
                    value={username}
                    name='Username'
                    onChange={onUsernameChange}
                />
            </div>
            <div>
                password
                <input
                    type="password"
                    value={password}
                    name='Password'
                    onChange={onPasswordChange}
                />
            </div>
            <button type="submit" id="login-button">login</button>
        </form>
    )
}

export default Login