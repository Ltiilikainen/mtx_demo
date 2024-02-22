import multer from "multer";
import path from "path";
import errorLogger from "./logger.js";

//create multer instance
const upload = multer({
  storage: multer.diskStorage({
    destination: (
      req,
      _file,
      callback: (error: Error | null, destination: string) => void
    ) => {
      callback(null, "./media/");
    },
    filename: (
      req,
      file,
      callback: (error: Error | null, destination: string) => void
    ) => {
      const fileType = req.query.filetype;
      const fileExtension = path.extname(file.originalname);
      const filename =
        path.parse(file.originalname).name + "-" + Date.now() + fileExtension;

      req.body.path = `/media/${filename}`;

      if (
        fileType === "img" &&
        !checkFiletype(fileExtension, [".jpg", ".jpeg", ".png", ".gif", ".svg"])
      )
        return callback(new Error("Invalid file type"), fileType);

      callback(null, filename);
    }
  }),
  limits: { fileSize: 3000000 }
});

//create multer upload function
const img = upload.single("img");

function checkFiletype(filetype: string, checklist: string[]) {
  if (checklist.indexOf(filetype) < 0) {
    errorLogger.log("warn", `Multer upload: Filetype ${filetype} is invalid.`);
    return false;
  } else return true;
}

export default { img };
