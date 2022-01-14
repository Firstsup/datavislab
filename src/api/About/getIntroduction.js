const f = async (signal, flag = 0) => {
    return (
        await fetch(flag === 0 ? 'getintroduction' : (flag === 1 ? '../getintroduction' : '../../getintroduction'), {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
            },
            signal
        })).json();
}

export default f