const f = async (name, signal, flag = 0) => {
    return (
        (await fetch(flag === 0 ? `getimageurl?image=${name}` : (flag === 1 ? `../getimageurl?image=${name}` : `../../getimageurl?image=${name}`), {
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