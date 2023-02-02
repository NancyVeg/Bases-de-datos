const multer = require('multer');

function uploadFile(){

  const storage = multer.diskStorage({
      destination: function (req, file, cb) {
      cb(null, './storage/images')
      },
      filename: function (req, file, cb) {
        var extension = file.originalname.slice(file.originalname.lastIndexOf('.'));
    //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    //cb(null, file.fieldname + '-' + uniqueSuffix)
    //`${file.fieldname}-${uniqueSuffix}`
       cb(null, Date.now() + extension);
    }
    });

    const upload = multer({storage}).single('file');

    return upload;
};

module.exports = uploadFile;
  