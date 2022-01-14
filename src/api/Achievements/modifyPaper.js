const f = async (paper, signal, flag = 0) => {
    const params = {
        paper: paper
    }
    return (
        await fetch(flag === 0 ? `modifypaper` : (flag === 1 ? '../modifypaper' : '../../modifypaper'), {
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