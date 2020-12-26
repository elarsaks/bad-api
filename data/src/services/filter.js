const cleanAvailabilityData = (rawData) => {
    let flatenedArray = rawData.flat()
    cleanedData = flatenedArray.map(e => {
       return {
            id: e.id,
            stock: cleanXmldata(e.DATAPAYLOAD)
        }
    })
    return cleanedData
}

const cleanXmldata = (rawData) => {
    return rawData.substring(
        rawData.lastIndexOf("<INSTOCKVALUE>") +14, 
        rawData.lastIndexOf("</INSTOCKVALUE>")
      );
}

module.exports = {
    cleanAvailabilityData
}