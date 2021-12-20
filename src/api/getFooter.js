const f = async () => {
    return (await fetch('getfooter', {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
        },
    })).json();
}

export default f