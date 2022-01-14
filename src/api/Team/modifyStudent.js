const f = async (student, signal, flag = 0) => {
    const params = {
        student: student
    }
    return (
        await fetch(flag === 0 ? `modifystudent` : (flag === 1 ? '../modifystudent' : '../../modifystudent'), {
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