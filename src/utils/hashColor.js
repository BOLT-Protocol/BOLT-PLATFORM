function hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i += 1) {
        // eslint-disable-next-line no-bitwise
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
}

function intToRGB(i) {
    // eslint-disable-next-line no-bitwise
    let c = (i & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

    return '00000'.substring(0, 6 - c.length) + c;
}

function patch(str) {
    if (str.indexOf('F') > 1) {
        return str.replace(new RegExp('F', 'g'), 0);
    }
    else {
        return str;
    }
}

const toHashColor = (str) => {
    const hash = hashCode(str);
    return `#${patch(intToRGB(hash))}`;
};


export default toHashColor;
