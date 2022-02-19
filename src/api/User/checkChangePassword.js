const f = async (user, signal) => {
    const params = {
        user: user
    }
    return (
        await fetch(`checkchangepassword`, {
            method: 'post',
            body: JSON.stringify(params),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
            },
            signal
        })).json();
}

export default f
