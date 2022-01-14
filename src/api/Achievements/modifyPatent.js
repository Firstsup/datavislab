const f = async (patent, signal, flag = 0) => {
    const params = {
        patent: patent
    }
    return (
        await fetch(flag === 0 ? `modifypatent` : (flag === 1 ? '../modifypatent' : '../../modifypatent'), {
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