const Joi = require('joi')

const gameValidator = {
  validateNewGame: (data) => {
    const schema = Joi.object({
      title: Joi.string().min(5).max(30).required(),
      thumbnail: Joi.string().uri().required(),
      description: Joi.string().min(20).max(50).required(),
      discount: Joi.number().min(0).max(1),
      basePrice: Joi.number().min(0).required(),
      creator: Joi.string(),
      platforms: Joi.array()
        .items(Joi.string().valid('pc', 'playstation', 'xbox', 'switch'))
        .unique()
        .min(1)
        .required(),
      genders: Joi.array()
        .items(Joi.string().valid('fear', 'single-player'))
        .unique()
        .min(1)
        .required()
    })

    return schema.validateAsync(data)
  },

  validateFormData: (data) => {
    const schema = Joi.object({
      information: Joi.string().required()
    })

    return schema.validateAsync(data)
  },

  validateUpdate: (data) => {
    const schema = Joi.object({
      id: Joi.string().required(),
      title: Joi.string().min(5).max(30),
      thumbnail: Joi.string().required(),
      description: Joi.string().min(20).max(50),
      discount: Joi.number().min(0).max(1),
      basePrice: Joi.number().min(0),
      creator: Joi.string(),
      platforms: Joi.array()
        .items(Joi.string().valid('pc', 'playstation', 'xbox', 'switch'))
        .unique()
        .min(1),
      genders: Joi.array()
        .items(Joi.string().valid('fear', 'single-player'))
        .unique()
        .min(1)
    })

    return schema.validateAsync(data)
  }
}

module.exports = gameValidator
