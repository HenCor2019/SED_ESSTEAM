const { SENGRID_MAIL, BASE_URL_CLIENT } = process.env

const skeletons = {
  register: ({ username, email }) => ({
    to: email,
    from: SENGRID_MAIL,
    subject: 'Welcome to our team!',
    html: `<h1>Let´s start ${username}!!</h1>
     <h2>Thank you for signing up for HenCor corp We're so excited for you!</h2>
    `
  }),

  requestPassword: ({ username, email, token }) => ({
    to: email,
    from: SENGRID_MAIL,
    subject: 'Recovery password',
    html: `<h1>Hi, ${username} ${token} ${BASE_URL_CLIENT}</h1>
     <h2>For recover your password, please go to the next link</h2>

     <a href="${BASE_URL_CLIENT}${token}">Change my password</a>
    `
  })
}

module.exports = { skeletons }
