const Joi = require('joi')

const gameValidator = {
  validateNewGame: (data) => {
    const schema = Joi.object({
      title: Joi.string().min(5).max(30).required(),
      description: Joi.string().min(20).max(50).required(),
      discount: Joi.string()
        .regex(/^[0-9]+$/)
        .message('discount must be a number')
        .min(0)
        .max(1),
      basePrice: Joi.string()
        .regex(/^[0-9]+$/)
        .message('basePrice must be a number')
        .min(0)
        .required(),
      creator: Joi.string().required(),
      platforms: Joi.alternatives()
        .try(
          Joi.string().valid('pc', 'playstation', 'xbox', 'switch').lowercase(),
          Joi.array()
            .items(
              Joi.string()
                .valid('pc', 'playstation', 'xbox', 'switch')
                .lowercase()
            )
            .unique()
            .min(1)
        )
        .required(),
      genders: Joi.alternatives()
        .try(
          Joi.string().valid('fear', 'single-player').lowercase(),
          Joi.array()
            .items(Joi.string().valid('fear', 'single-player').lowercase())
            .unique()
            .min(1)
        )
        .required()
    }).required()

    return schema.validateAsync(data)
  },

  validateUpdate: (data) => {
    const schema = Joi.object({
      title: Joi.string().min(5).max(30),
      description: Joi.string().min(20).max(50),
      discount: Joi.number().min(0).max(1),
      basePrice: Joi.number().min(0),
      creator: Joi.string(),
      platforms: Joi.array()
        .items(
          Joi.string().valid('pc', 'playstation', 'xbox', 'switch').lowercase()
        )
        .unique()
        .min(1),
      gender: Joi.array()
        .items(Joi.string().valid('fear', 'single-player').lowercase())
        .unique()
        .min(1)
    })
      .min(1)
      .required()

    return schema.validateAsync(data)
  },

  validateId: (data) => {
    const schema = Joi.object({
      id: Joi.string().required()
    }).required()

    return schema.validateAsync(data)
  }
}

module.exports = gameValidator
