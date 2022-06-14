const Notification = ( {message, type} ) => {
    if (message === null) {
        return null
    } else if (type === 1) {
    return (
        <div className="success"> { message } </div>
    )} else if (type === 2) {
        return (
            <div className="error"> { message } </div>
        )
    }
}

export default Notification;
