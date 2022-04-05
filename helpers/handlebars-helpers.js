module.exports = {
  compareObjectID: (category, record, options) => {
    return category._id.toString() === record.categoryId.toString() ? options.fn(this) : options.inverse(this)
  },
  monthlyFilter: (date) => {
    return date.slice(0, 7)
  }
}