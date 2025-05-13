import { v2 as cloudinary } from "cloudinary";

export default function uploadImageToCloudinary(imageFile){
    return new Promise((resolve, reject)=>{
        const uploadStream =cloudinary.uploader.upload_stream(
            {
                folder: "BittuQuestions",
                resource_type: "auto",
                public_id: imageFile.originalname.split(".")[0],
            },(err, res)=>{
                if(err){
                    return reject(err);
                }
                resolve(res.secure_url)
            }
        )
        //End this stream so that cloudinary get knows all data has been sent
        // and it can upload the image
        uploadStream.end(imageFile.buffer)
    })
}
 