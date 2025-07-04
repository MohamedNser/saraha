import joi from 'joi'


export const singup = {

    body:joi.object().required().keys({
        name:joi.string().min(2).max(20).required(),
        email:joi.string().email().required(),
        password:joi.string().pattern(new RegExp (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/)).required(),
        cpassword:joi.string().valid(joi.ref('password')).required()
    })
}


export const singin = {

    body:joi.object().required().keys({
        email:joi.string().email().required(),
        password:joi.string().pattern(new RegExp (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/)).required(),
        
    })
}
export const checkToken = {

    body:joi.object().required().keys({
        token:joi.string().required(),
        
    })
}

