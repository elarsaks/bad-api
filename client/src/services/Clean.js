function cleanAvailability(rawData) {
  return rawData.substring(
    rawData.lastIndexOf("<INSTOCKVALUE>") +14, 
    rawData.lastIndexOf("</INSTOCKVALUE>")
  );
}

module.exports = { cleanAvailability }
  