const multer = require('multer') ;
const multerS3 = require('multer-s3') ;
const aws =require('aws-sdk') ;
const shortid = require("shortid");

const s3 =new aws.S3({
    accessKeyId:"XXXXXXXXXXXXXXX",
    secretAccessKey:"XXXXXXXXXXXXXXXXXXXXXXXXXXX",
})


 const uploadS3 = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'uploadnotes',
      acl: 'public-read',
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, shortid.generate() + "-" + file.originalname);
      }
    })
    ,limits:{fileSize: 1000000*5}}).single('notepath');


  export default uploadS3;
