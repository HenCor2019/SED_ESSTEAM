const { createReports } = require('./helper')

const paymentResponse = {
  unapprovedPayment: (res) =>
    res.status(400).json({
      success: false,
      links: {
        rel: 'unapproved',
        href: '/checkoutfailed'
      }
    }),

  approvedPayment: (res, token) =>
    res.status(200).json({
      success: true,
      links: {
        rel: 'approved',
        href: `/checkoutsuccess?token=${token}`
      }
    }),

  successfullySaved: (res) =>
    res
      .status(200)
      .json({ success: true, message: 'Thanks for your purchase' }),

  successfullyReports: (res, payments) => {
    const reports = payments.reduce(createReports, [])

    return res.status(200).json({ success: true, reports })
  }
}

module.exports = paymentResponse
