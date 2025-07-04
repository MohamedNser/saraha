const dataMethd = ['body' , 'params' , 'headers']


export const validation = (schema)=>{

    return (req,res,next)=>{
        const validationArry =[]
        dataMethd.forEach(key => {
            if (schema[key]) {
                console.log(key);
                const validationResult = schema[key].validate(req[key]);
                if (validationResult?.error?.details) {
                    validationArry.push(validationResult.error.details)
                }
            }
        });

        if (validationArry.length) {
            res.json({message: "validationResulr error" , err : validationArry})
        } else {
            next()
        }
    }
}