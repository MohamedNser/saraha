import multer from "multer";

export const multerValidation ={
    image:['image/jpeg', 'image/png', 'image/jif'],
    pdf: ['application/pdf'],
}
export const HME = (err, req, res, next) => {
  console.error("🔴 Multer Error:", err); // ✅ يطبع في الترمينال
  res.status(400).json({
    message: 'in-valid error multer',
    error: err.message, // ✅ يوصلك في Postman بدل [object Object]
    stack: err.stack    // اختياري: يوضح مكان الخطأ في الكود
  });
};


export function myMulter( customValidation){
 if (customValidation) {
    customValidation = multerValidation.image
}

    const storage = multer.diskStorage({})
    function fileFilter(req,file,cb){
        if (customValidation.includes(file.mimetype)) {
            cb(null,true)
            
        } else {
           cb(new Error('in-valid format'), false); // بدل cb('in-valid format', false)

            
            
        }
    }
    const upload = multer({dest: 'upload' ,fileFilter, storage})
    return upload
}