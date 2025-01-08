import multer from "multer";

const storageConfig =  multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/images/'); // null means noo error - we assumed
    },
    filename:(req,file,cb)=>{
        const name = Date.now()+file.originalname; // for differenciation we added timestamp
        cb(null,name);  //null means noo error - we assumed
    }
})

export const uploadFile = multer({storage:storageConfig}); 