const f = async (name, signal, flag = 0) => {
    return (
        (await fetch(flag === 0 ? `getfileurl?file=${name}` : (flag === 1 ? `../getfileurl?file=${name}` : `../../getfileurl?file=${name}`), {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
            },
            signal
        })).json()
    )
}

export default f