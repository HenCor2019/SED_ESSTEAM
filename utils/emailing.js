const sgMail = require('@sendgrid/mail')
const { skeletons } = require('./emailing.skeletons')

const { SENDGRID_API_KEY } = process.env
sgMail.setApiKey(SENDGRID_API_KEY)

const emailing = {
  sendRegisterEmail: async ({ email, username }) => {
    const registerEmail = skeletons.register({ email, username })
    sgMail.send(registerEmail)
  },

  sendRequestPasswordEmail: async (payload) => {
    const requestPasswordEmail = skeletons.requestPassword(payload)
    sgMail.send(requestPasswordEmail)
  }
}

module.exports = { emailing }
