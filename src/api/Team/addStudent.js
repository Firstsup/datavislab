const f = async (item, signal, flag = 0) => {
    const params = {
        item: item
    }
    return (
        await fetch(flag === 0 ? `addstudent` : (flag === 1 ? '../addstudent' : '../../addstudent'), {
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