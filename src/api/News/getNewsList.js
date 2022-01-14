const f = async (currentPage, signal, flag = 0) => {
    return (
        await fetch(flag === 0 ? `getnewslist?page=${currentPage}` : `../getnewslist?page=${currentPage}`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
            },
            signal
        })).json();
}

export default f