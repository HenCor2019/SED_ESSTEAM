const Joi = require('joi')
const {
  transformToNumber,
  mapToPercentage,
  mapToArray,
  setUrlImage,
  sanitizeHTML
} = require('../helper')

const validatorSchemas = {
  newGameSchema: Joi.object({
    title: Joi.string().trim().custom(sanitizeHTML).min(5).max(30).required(),
    description: Joi.string().trim().custom(sanitizeHTML).min(20).required(),
    discount: Joi.string()
      .regex(/^[0-9][0-9]?$|^100$/)
      .message('discount must be an integer and between 0 and 100')
      .custom(transformToNumber)
      .custom(mapToPercentage)
      .default(0),
    basePrice: Joi.string()
      .regex(/^([0-9]+([.][0-9]*)?|[.][0-9]+)$/)
      .message('basePrice must be a  number greater than or equal to zero')
      .custom(transformToNumber)
      .required()
      .label('price'),
    creator: Joi.string().trim().custom(sanitizeHTML).required(),
    platforms: Joi.alternatives()
      .try(
        Joi.string()
          .trim()
          .custom(sanitizeHTML)
          .valid('pc', 'playstation', 'xbox', 'switch')
          .lowercase(),
        Joi.array()
          .items(
            Joi.string()
              .custom(sanitizeHTML)
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
        Joi.string()
          .trim()
          .custom(sanitizeHTML)
          .valid('action', 'adventures', 'survival', 'terror')
          .lowercase(),
        Joi.array()
          .items(
            Joi.string()
              .custom(sanitizeHTML)
              .valid('action', 'adventures', 'survival', 'terror')
              .lowercase()
          )
          .unique()
          .min(1)
      )
      .custom(mapToArray)
      .required(),
    thumbnail: Joi.string().custom(setUrlImage).required()
  }).required(),

  updateGameSchema: Joi.object({
    title: Joi.string().custom(sanitizeHTML).min(5).max(30),
    description: Joi.string().custom(sanitizeHTML).min(20).max(50),
    discount: Joi.number().min(0).max(100).custom(mapToPercentage),
    basePrice: Joi.number().min(0),
    creator: Joi.string().custom(sanitizeHTML),
    platforms: Joi.array()
      .items(
        Joi.string()
          .custom(sanitizeHTML)
          .valid('pc', 'playstation', 'xbox', 'switch')
          .lowercase()
      )
      .unique()
      .min(1),
    gender: Joi.array()
      .items(
        Joi.string()
          .custom(sanitizeHTML)
          .valid('action', 'adventures', 'survival', 'terror')
          .lowercase()
      )
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
