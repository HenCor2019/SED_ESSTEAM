const Joi = require('joi')
const { mapToArray, transformToNumber } = require('../helper')

const searchSchemas = {
  filtersSchema: Joi.object({
    q: Joi.string().trim().label('title').required(),
    mn: Joi.string()
      .trim()
      .regex(/^[0-9]+$/)
      .message('min price must be a number')
      .custom(transformToNumber)
      .default(0),
    mx: Joi.string()
      .regex(/^[0-9]+$/)
      .message('max price must be a number')
      .custom(transformToNumber)
      .default(100),
    pt: Joi.alternatives()
      .try(
        Joi.string()
          .trim()
          .valid('pc', 'playstation', 'xbox', 'switch')
          .lowercase(),
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
        Joi.string().trim().valid('action', 'survival').lowercase(),
        Joi.array()
          .items(Joi.string().valid('action', 'survival').lowercase())
          .min(1)
          .unique()
      )
      .label('genders')
      .custom(mapToArray)
      .default(['action', 'survival']),
    limit: Joi.string()
      .regex(/^[0-9]+$/)
      .custom(transformToNumber)
      .message(' limit must be a number')
      .default(5)
  }).min(1)
}

module.exports = searchSchemas
