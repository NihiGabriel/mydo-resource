const fs = require('fs');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

exports.uploadImageFile = async(options) => {
    const { file, filename, mimeType} = options;

    const theFile = fs.readFileSync(file);

	const bucketData = {
		Bucket: 'scribrybuckets',
		Key: filename,
		Body: theFile,
        ContentType: mimeType
	}

    const a = await s3.upload(bucketData).promise();
    const resp = {
        url: a.Location,
        // data: a
    }

    return resp;

}

exports.uploadBase64ImageFile = async(options) => {
    const { file, filename, mimeType} = options;

    const buf = Buffer.from(file.replace(/^data:image\/\w+;base64,/, ""),'base64')

	const bucketData = {
		Bucket: 'scribrybuckets',
		Key: filename,
		Body: buf,
        ContentEncoding: 'base64',
        ContentType: mimeType
	}

    const a = await s3.upload(bucketData).promise();
    const resp = {
        url: a.Location,
        // data: a
    }

    return resp;

}