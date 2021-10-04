const Joi = require('joi')
const {
  transformToNumber,
  mapToPercentage,
  mapToArray,
  setUrlImage
} = require('../helper')

const validatorSchemas = {
  newGameSchema: Joi.object({
    title: Joi.string().min(5).max(30).required(),
    description: Joi.string().min(20).max(50).required(),
    discount: Joi.string()
      .regex(/^[0-9][0-9]?$|^100$/)
      .message('discount must be an integer and between 0 and 100')
      .custom(transformToNumber)
      .custom(mapToPercentage)
      .default(0),
    basePrice: Joi.string()
      .regex(/^[0-9]+$/)
      .message('basePrice must be a  number greater than or equal to zero')
      .custom(transformToNumber)
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
      .custom(mapToArray)
      .required(),
    genders: Joi.alternatives()
      .try(
        Joi.string().valid('action', 'adventures', 'survival').lowercase(),
        Joi.array()
          .items(
            Joi.string().valid('action', 'adventures', 'survival').lowercase()
          )
          .unique()
          .min(1)
      )
      .custom(mapToArray)
      .required(),
    thumbnail: Joi.string().custom(setUrlImage).required()
  }).required(),

  updateGameSchema: Joi.object({
    title: Joi.string().min(5).max(30),
    description: Joi.string().min(20).max(50),
    discount: Joi.number().min(0).max(100).custom(mapToPercentage),
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
    .required(),

  idSchema: Joi.object({
    id: Joi.string().required()
  }).required()
}

module.exports = validatorSchemas
