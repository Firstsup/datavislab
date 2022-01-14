const f = async (id, signal, flag = 0) => {
    const params = {
        id: id
    }
    return (
        await fetch(flag === 0 ? `patentdown` : (flag === 1 ? '../patentdown' : '../../patentdown'), {
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