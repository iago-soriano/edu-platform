import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./tmp/files");
  },
  filename: function (req, file, cb) {
    // console.log({ file });
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      `${file.fieldname}-${uniqueSuffix}.${file.mimetype.split("/")[1]}`
    );
  },
});

export const AcceptFileMiddleware = multer({ storage }).fields([
  { name: "image", maxCount: 1 },
]);
