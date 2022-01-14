const f = async (news, signal, flag = 0) => {
    const params = {
        news: news
    }
    return (
        await fetch(flag === 0 ? `modifynews` : '../modifynews', {
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