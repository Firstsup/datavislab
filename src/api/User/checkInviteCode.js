const f = async (inviteCode, signal) => {
    const params = {
        inviteCode: inviteCode
    }
    return (
        await fetch(`checkInviteCode`, {
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
