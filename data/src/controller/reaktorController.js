const reaktor = require('../repository/reaktor.js')
const filter = require('../services/filter.js')

const getAvailabilityData = (manufacturerList) => {
  let availabilityData = manufacturerList.map((manufacturer) =>
    reaktor.fetchAvailability(manufacturer.manufacturer)
  )
  return Promise.all(availabilityData).then((data) =>
    filter.cleanAvailabilityData(data)
  )
}

const getProductsByCategories = (categories) => {
  return Promise.all(
    categories.map((category) => reaktor.fetchProducts(category))
  )
}

/// TEST THOS 2 FUNCTIONS!!!

module.exports = {
  getAvailabilityData,
  getProductsByCategories,
}
