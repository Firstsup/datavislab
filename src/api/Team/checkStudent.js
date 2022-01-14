const f = async (newName, oldName, signal, flag = 0) => {
    const params = {
        newName: newName,
        oldName: oldName
    }
    return (
        await fetch(flag === 0 ? `checkstudent` : (flag === 1 ? '../checkstudent' : '../../checkstudent'), {
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