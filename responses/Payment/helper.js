const createReports = (reports, payment) => {
  const { game } = payment

  if (!existGame(reports, game)) {
    reports.push(createNewReport(payment))
    return reports
  }

  const { position, updatedReport } = updatePaymentReport(reports, payment)
  reports[position] = updatedReport

  return reports
}

const existGame = (reports, newGame) =>
  reports.find((report) => report.id === newGame.id)

const updatePaymentReport = (reports, payment) => {
  const { date, game } = payment
  const index = reports.findIndex((report) => report.id === game.id)

  if (index < 0) return

  const { sells, lastPurchase: newDate, earnings, ...remains } = reports[index]
  const lowerDate = date.getTime() < newDate.getTime() ? newDate : date
  const newEarnings = earnings + game.basePrice * (1 - game.discount)

  return {
    position: index,
    updatedReport: {
      ...remains,
      sells: sells + 1,
      lastPurchase: lowerDate,
      earnings: newEarnings.toFixed(2) * 1
    }
  }
}

const createNewReport = ({ game, date, discountPrice: earnings }) => {
  const { id, title, creator } = game

  const newReport = {
    id,
    title,
    creator,
    sells: 1,
    lastPurchase: date,
    earnings: earnings.toFixed(2) * 1
  }
  return newReport
}

const transformDates = ({ lastPurchase, ...rest }) => ({
  lastPurchase: lastPurchase.toString().substring(0, 15),
  ...rest
})

module.exports = { createReports, transformDates }
