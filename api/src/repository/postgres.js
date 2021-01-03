const getProductsByCategory = (category, db) => {
  return db.select('*').from('products').where({ type: category })
}

module.exports = {
  getProductsByCategory,
}
