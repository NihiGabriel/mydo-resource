const moment = require('moment');
const https = require('https');

exports.isObject = (arg) => {
    const ty = typeof arg;
    return ty === 'object' ? true : false;
};

exports.isString = (arg) => {
    const ty = typeof arg;
    return ty === 'string' ? true : false;
};

exports.isArray = (arg) => {
    if (Array.isArray) {
        return Array.isArray(arg);
    }
};

exports.strToArray = (arg, split) => {
    return arg.split(split);
};

exports.strToArrayEs6 = (arg, split) => {
    return arg.split(split);
};

exports.strIncludes = (arg, inc) => {
    return arg.indexOf(inc) ? true : false;
};

exports.strIncludesEs6 = (arg, inc) => {
    return arg.includes(inc) ? true : false;
}

exports.arrayIncludes = (arr, inc) => {
    return arr.includes(inc) ? true : false;
}

exports.dateToWord = (date) => {
    const theDate = moment(date).format('DD_MM_YYYY');
    return theDate;
};

exports.dateToWordRaw = () => {
    const theDate = moment();
    return theDate;
};

exports.isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0;
}

exports.convertUrlToBase64 = async (url) => {

    return new Promise((resolve, reject) => {

        https.get(url, (resp) => {

            resp.setEncoding('base64');
            body = "data:" + resp.headers["content-type"] + ";base64,";
            resp.on('data', (data) => { body += data});
            resp.on('end', () => {
                try {
                    resolve(body);
                } catch (e) {
                    reject(e.message);
                }
            });
    
        }).on('error', (e) => {
            reject(`Got error: ${e.message}`);
        });

    });

}

exports.writeToFile = (filepath, data) => {

    // To Do: if file does not exist, create it

    const n = JSON.parse(
        fs.readFileSync(filepath, 'utf-8')
    );

    n.push(data);

    fs.writeFileSync(filepath , JSON.stringify(n));

}


