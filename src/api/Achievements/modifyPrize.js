const f = async (prize, signal, flag = 0) => {
    const params = {
        prize: prize
    }
    return (
        await fetch(flag === 0 ? `modifyprize` : (flag === 1 ? '../modifyprize' : '../../modifyprize'), {
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