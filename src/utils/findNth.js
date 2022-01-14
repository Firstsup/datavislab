const FindNth = (str, find, num) => {
    let x = str.indexOf(find);
    for (let i = 0; i < num; i++) {
        x = str.indexOf(find, x + 1);
    }
    return x;
}

export default FindNth