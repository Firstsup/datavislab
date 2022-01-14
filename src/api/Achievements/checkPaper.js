const f = async (newTitle, oldTitle, signal, flag = 0) => {
    const params = {
        newTitle: newTitle,
        oldTitle: oldTitle
    }
    return (
        await fetch(flag === 0 ? `checkpaper` : (flag === 1 ? '../checkpaper' : '../../checkpaper'), {
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