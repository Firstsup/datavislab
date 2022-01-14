const f = async (id, name, signal, flag = 0) => {
    const params = {
        id: id,
        name: name
    }
    return (
        await fetch(flag === 0 ? 'setcarouselimage' : (flag === 1 ? '../setcarouselimage' : '../../setcarouselimage'), {
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