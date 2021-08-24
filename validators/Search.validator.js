const Joi = require('joi')

const searchValidator = {
  validateFilters: (data) => {
    const schema = Joi.object({
      q: Joi.string().required(),
      mn: Joi.string()
        .regex(/^[0-9]+$/)
        .message('minprice must be a number'),
      mx: Joi.string()
        .regex(/^[0-9]+$/)
        .message(' maxprice must be a number'),
      pt: Joi.alternatives().try(
        Joi.string().valid('pc', 'playstation', 'xbox', 'switch').lowercase(),
        Joi.array()
          .items(
            Joi.string()
              .valid('pc', 'playstation', 'xbox', 'switch')
              .lowercase()
          )
          .min(1)
          .unique()
      ),
      gd: Joi.alternatives().try(
        Joi.string().valid('fear', 'single-player').lowercase(),
        Joi.array()
          .items(Joi.string().valid('fear', 'single-player').lowercase())
          .min(1)
          .unique()
      ),
      limit: Joi.string()
        .regex(/^[0-9]+$/)
        .message(' limit must be a number')
    }).min(1)

    return schema.validateAsync(data)
  }
}

module.exports = searchValidator
