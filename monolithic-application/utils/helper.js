const fs = require("fs/promises");
const path = require("path");

function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

const fileUploadMiddleware = async (req, res, next) => {
  try {
    const folderName = process.env.UPLOAD_FOLDER || "uploads";
    await fs.mkdir(path.join(process.cwd(), folderName), { recursive: true });

    if (!req.files || Object.keys(req.files).length === 0) {
      next();
    } else if (!req.files.image) {
      next();
    } else {
      const uploadedFile = req.files.image;

      const allowedExtensions = [".jpg", ".png", ".jpeg"];
      const fileExtension = path.extname(uploadedFile.name);

      if (!allowedExtensions.includes(fileExtension)) {
        return res.status(400).json({
          message:
            "invalid file type, only send images in your profile picture",
        });
      }

      const fileBuffer = uploadedFile.data;
      // generate a unique name
      const uploadedFileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}-${uploadedFile.name}`;

      const destinationPath = path.join(
        process.cwd(),
        folderName,
        uploadedFileName,
      );

      await fs.writeFile(destinationPath, fileBuffer);

      if (req.body) {
        req.body.uploadedFile = uploadedFileName;
      } else {
        req.body = { uploadedFile: uploadedFileName };
      }

      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  generateOTP,
  fileUploadMiddleware,
};
