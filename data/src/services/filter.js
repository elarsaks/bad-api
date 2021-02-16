const cleanAvailabilityData = (rawData) => {
  let flatenedArray = rawData.flat()
  cleanedData = flatenedArray.map((e) => {
    return {
      id: e.id.toLowerCase(),
      stock: cleanXmldata(e.DATAPAYLOAD),
    }
  })
  return cleanedData
}

const cleanXmldata = (rawData) => {
  return rawData.substring(
    rawData.lastIndexOf('<INSTOCKVALUE>') + 14,
    rawData.lastIndexOf('</INSTOCKVALUE>')
  )
}

const isItArray = (itemToCheck, onItem) => {
  if (Array.isArray(itemToCheck)) {
    return itemToCheck
  } else {
    console.log(
      `Recieved "${itemToCheck}" as a response on: "${onItem}", doing recursive call.`
    )
    return false
  }
}

module.exports = {
  isItArray,
  cleanAvailabilityData,
}
