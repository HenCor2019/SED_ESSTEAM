const auth = {
  CLIENT: process.env.PAYMENT_CLIENT,
  SECRET: process.env.PAYMENT_SECRET
}

const generateNewPayment = ({ amount, application_context }) => {
  return {
    netAmount: amount,
    users: [application_context.user.id],
    game: application_context.game.id
  }
}

const updatePayment = (newPayment, payment) => {
  const { netAmount: newAmount } = newPayment
  const { netAmount: currentAmount } = payment

  const { users: newUser } = newPayment

  return {
    id: payment._id,
    netAmount: {
      currencyCode: currentAmount.currencyCode,
      value: newAmount.value + currentAmount.value
    },
    users: [...payment.users, ...newUser],
    sells: payment.sells + 1,
    date: new Date()
  }
}

const generatePayment = (game, user) => {
  return {
    intent: 'CAPTURE',
    amount: {
      currencyCode: 'USD',
      value: (1 - game.discount) * game.basePrice
    },
    application_context: {
      brand_name: 'ESASteam.com',
      landing_page: 'NO_PREFERENCE',
      user_action: 'PAY_NOW',
      user: user,
      game: game,
      return_url: 'http://localhost:3000/execute-payment',
      cancel_url: 'http://localhost:3000/cancel-payment'
    }
  }
}

const usersAreNotEquals = (sessionUser, paymentUser) =>
  sessionUser.id === paymentUser.id

module.exports = {
  auth,
  generateNewPayment,
  generatePayment,
  usersAreNotEquals,
  updatePayment
}
