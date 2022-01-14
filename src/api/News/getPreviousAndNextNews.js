const f = async (id, signal, flag = 0) => {
    return (
        await fetch(flag===0?`getpreviousandnextnews?id=${id}`:`../getpreviousandnextnews?id=${id}`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
            },
            signal
        })).json();
}

export default f