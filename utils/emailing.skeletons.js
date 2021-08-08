const { SENGRID_MAIL } = process.env

const skeletons = {
  register: ({ username, email }) => ({
    to: email,
    from: SENGRID_MAIL,
    subject: 'Welcome to our team!',
    html: `<h1>Let´s start ${username}!!</h1>
     <h2>Thank you for signing up for HenCor corp We're so excited for you!</h2>
    `
  })
}

module.exports = { skeletons }
