
const crypto = require('crypto');
const querystring = require('querystring');

const duration = 3600;

function getSignedUrl(r) {
    const
        bucket = getVariable(r, 's3_bucket'),
        host = getVariable(r, 's3_host'),
        accessKeyId = getVariable(r, 's3_accessKey'),
        secretAccessKey = getVariable(r, 's3_secretAccessKey'),
        key = getVariable(r, 's3_key').substring(1),
        dateObj = new Date,
        expiration = Math.round((new Date(dateObj.getTime() + duration * 1000)).getTime() / 1000),
        policy = 'GET\n\n\n' + expiration + '\n'
            + '/' + bucket + '/' + key,
        signature = crypto
            .createHmac("sha1", secretAccessKey)
            .update(policy)
            .digest("base64");
    ;
    return [
        `https://${host}/${bucket}/${key}?`,
        querystring.stringify({
            AWSAccessKeyId: accessKeyId,
            Expires: expiration,
            Signature: signature
        })
    ].join('');
}

export default { getSignedUrl };


function getVariable(r, name) {
    try {
        return r.variables[name];
    } catch (e) {
        throw 'Variable ' + name + ' not found';
    }
}
