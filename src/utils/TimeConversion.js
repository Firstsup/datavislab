const timeConversion = (timestamp) => {
    const date = new Date(timestamp * 1000)
    const Y = date.getFullYear() + '-';
    const M = date.getMonth() + 1 + '-';
    const D = date.getDate() + ' ';
    // const h = date.getHours() < 10 ? '0' + date.getHours() + ":" : date.getHours() + ':';
    // const m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ":" : date.getMinutes() + ':';
    // const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return Y + M + D;
}

export default timeConversion