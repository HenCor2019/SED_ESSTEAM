const { SENGRID_MAIL, BASE_URL_CLIENT } = process.env

const skeletons = {
  register: ({ fullname, email, token }) => ({
    to: email,
    from: SENGRID_MAIL,
    subject: 'Welcome to the future of games',
    html: `<h1>Let´s start ${fullname}!!</h1>
     <h2>Thank you for signing up for ESASteam. We're so excited for you!</h2>

     <p>To complete your subscription please enter the following link</p>

     <a href="${BASE_URL_CLIENT}register-handler/${token}" target="_blank">Register</a>
    `
  }),

  requestPassword: ({ username, email, token }) => ({
    to: email,
    from: SENGRID_MAIL,
    subject: 'Recovery password',
    html: `<h1>Hi, ${username} ${token} ${BASE_URL_CLIENT}</h1>
     <h2>For recover your password, please go to the next link</h2>

     <a href="${BASE_URL_CLIENT}${token}" target="_blank">Change my password</a>
    `
  })
}

module.exports = { skeletons }
