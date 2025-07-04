import joi from 'joi'

export const message = {

    params:joi.object().required().keys({
        receiverId:joi.string().min(24).max(24).required(),
        
    }),
    body:joi.object().required.keys({
        message:joi.string().required()
    })
}

