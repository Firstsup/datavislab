const f = async (teacher, signal, flag = 0) => {
    const params = {
        teacher: teacher
    }
    return (
        await fetch(flag === 0 ? `modifyteacher` : (flag === 1 ? '../modifyteacher' : '../../modifyteacher'), {
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