const Question = require('../models/Question/Question.model')

const questionRepository = {
  saveResponse: async ({ hashedResponses }) => {
    const newResponse = new Question({ questions: hashedResponses })
    const savedResponses = await newResponse.save()

    return savedResponses
  }
}

module.exports = { questionRepository }
