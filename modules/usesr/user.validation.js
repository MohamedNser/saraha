import joi from 'joi'

export const tokenURL = {

    headers:joi.object().required().keys({
        receiverId:joi.string().required(),
        
    }).options({allowUnknown: true})


}

