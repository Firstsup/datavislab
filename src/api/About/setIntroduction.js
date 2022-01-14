const f = async (introduction, signal, flag = 0) => {
    const params = {
        introduction: introduction
    }
    return (
        await fetch(flag === 0 ? 'setintroduction' : (flag === 1 ? '../setintroduction' : '../../setintroduction'), {
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