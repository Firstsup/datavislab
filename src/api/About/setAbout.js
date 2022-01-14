const f = async (labInformation, signal, flag = 0) => {
    const params = {
        labInformation: labInformation
    }
    return (
        await fetch(flag === 0 ? 'setabout' : '../setabout', {
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