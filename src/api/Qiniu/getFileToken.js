const f = async (name, signal, flag = 0) => {
    return (
        await fetch(flag === 0 ? `getfiletoken?name=${name}` : (flag === 1 ? `../getfiletoken?name=${name}` : `../../getfiletoken?name=${name}`), {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
            },
            signal
        })).json();
}

export default f