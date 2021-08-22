function uniqueFields(items, item) {
  if (!items.length) return true

  const itemsId = items.map(({ id }) => id).filter((id) => id != item.id)
  return itemsId.length === 0
}

module.exports = { uniqueFields }
