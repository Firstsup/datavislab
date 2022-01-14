const f = async (direction, signal, flag = 0) => {
    const params = {
        direction: direction
    }
    return (
        await fetch(flag === 0 ? `modifydirection` : '../modifydirection', {
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