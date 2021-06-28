const S3 = require('aws-sdk/clients/s3');
const fs = require('fs')

const bucketName="uploadnotes";
const region="us-east-2";
const accessKeyId="XXXXXXXXXXXXXXX";
const secretAccessKey="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
})

//Upload file
function uploadFile(file){
    const fileStream = fs.createReadStream(file.path)

    const uploadParams={
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    }

    return s3.upload(uploadParams).promise()
}

exports.uploadFile = uploadFile

//Download file
function getFileStream(fileKey){
    
    const downloadParams={
        Key: fileKey,
        Bucket: bucketName
    }

    return s3.getObject(downloadParams).createReadStream()
}

exports.getFileStream = getFileStream
