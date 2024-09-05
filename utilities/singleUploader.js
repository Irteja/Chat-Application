const multer=require("multer");
const path=require("path");
const createError=require("http-errors");

function uploader(subfolder_path,allowed_file_types,max_file_size,error_msg){
    const upload_folder=`${__dirname}/../public/uploads/${subfolder_path}`;


    const storage=multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,upload_folder);
        },
        filename:(req,file,cb)=>{
            const fileext=path.extname(file.originalname);
            const fileName=file.originalname.replace(fileext,"").toLowerCase().split(" ").join("-")+"-"+Date.now();
            cb(null,fileName+fileext);
        },
    });

    const up=multer({
        storage:storage,
        limits:{
            fileSize:max_file_size,
        },
        fileFilter:(req,file,cb)=>{
            if(allowed_file_types.includes(file.mimetype)){
                cb(null,true);
            }else{
                cb(createError(error_msg));
            }
        },
    });
 
    return up;
}

module.exports=uploader;