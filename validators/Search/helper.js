const Joi = require('joi')
const { mapToArray, transformToNumber } = require('../helper')

const searchSchemas = {
  filtersSchema: Joi.object({
    q: Joi.string().label('title').required(),
    mn: Joi.string()
      .regex(/^[0-9]+$/)
      .custom(transformToNumber)
      .message('minprice must be a number')
      .default(0),
    mx: Joi.string()
      .regex(/^[0-9]+$/)
      .custom(transformToNumber)
      .message(' maxprice must be a number')
      .default(100),
    pt: Joi.alternatives()
      .try(
        Joi.string().valid('pc', 'playstation', 'xbox', 'switch').lowercase(),
        Joi.array()
          .items(
            Joi.string()
              .valid('pc', 'playstation', 'xbox', 'switch')
              .lowercase()
          )
          .min(1)
          .unique()
      )
      .label('platforms')
      .custom(mapToArray)
      .default(['pc', 'playstation', 'xbox', 'switch']),
    gd: Joi.alternatives()
      .try(
        Joi.string().valid('fear', 'single-player').lowercase(),
        Joi.array()
          .items(Joi.string().valid('fear', 'single-player').lowercase())
          .min(1)
          .unique()
      )
      .label('genders')
      .custom(mapToArray)
      .default(['fear', 'single-player']),
    limit: Joi.string()
      .regex(/^[0-9]+$/)
      .custom(transformToNumber)
      .message(' limit must be a number')
      .default(5)
  }).min(1)
}

module.exports = searchSchemas
