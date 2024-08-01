const Notification = ({ message, isError = false }) => {
    const classMessage = (isError === true) ? 'error' : 'success'
    console.log('ERROR', isError, 'CLASS', classMessage)

    if (message === null) {
        return null;
    }
    return (
        <div className={classMessage}>
            {message}
        </div>
    )
}
export default Notification