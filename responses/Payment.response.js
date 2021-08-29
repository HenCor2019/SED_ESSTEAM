const paymentResponse = {
  unapprovedPayment: (res) =>
    res.status(400).json({
      success: false,
      links: {
        rel: 'unapproved',
        href: `localhost:3000/checkoutfailed`
      }
    }),

  approvedPayment: (res, token) =>
    res.status(200).json({
      success: true,
      links: {
        rel: 'approved',
        href: `localhost:3000/checkoutsuccess?token=${token}`
      }
    }),

  successfullySaved: (res) =>
    res
      .status(200)
      .json({ success: true, message: 'Thanks for your purchase' }),

  successfullyReports: (res, payments) =>
    res.status(200).json({ success: true, payments })
}

module.exports = paymentResponse
