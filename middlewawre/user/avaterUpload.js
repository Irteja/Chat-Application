const uploader=require("../../utilities/singleUploader");
function avatarUpload(req,res,next){
    const upload=uploader(
        "avaters",
        ["image/jpeg", "image/jpg", "image/png"],
        1000000,
        "Only .jpg, jpeg or .png format allowed!"
    );
    
    upload.any()(req,res,(err)=>{   
        if(err){
            res.status(500).json({
                errors:{
                    avater:{
                        msg:err.message,
                    },
                },
            });
        }else{
            // console.log("ok");
            next();
        }
    })
}


module.exports=avatarUpload;