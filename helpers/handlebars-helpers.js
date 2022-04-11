module.exports = {
  compareObjectID: (category, record, options) => {
    return category._id.toString() === record.categoryId.toString() ? options.fn(this) : options.inverse(this)
  },
  setAmount: (amount) => {
    return amount.toLocaleString()
  }
}