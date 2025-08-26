const multer = require('multer')
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'images');
        },
        filename: (req, file, cb) => {
            const imageName = Date.now() + '-' + file.originalname;
            cb(null, imageName);
            req.body.imageName = imageName;
        }
    }),
    limits: { fileSize: process.env.MAX_IMAGE_SIZE },
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Only images are allowed'), false);
        }
        cb(null, true);
    }
});


exports.checkImageErrors = function(req, res, next) {
    upload.single('image')(req, res, function(err) {
        if(err) {
            req.fileValidationError = err.message;
            return next();
        }
        if(!req.file) {
            req.fileValidationError = "Image is required";
        }
        next()
    })
}
