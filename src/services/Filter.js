function getManufacturersList(products) {
  return new Promise(function (resolve){
      let manuList = []
    
      products.forEach(product => {
        if(!(manuList.find(m => m == product.manufacturer))){
          manuList.push(product.manufacturer)
        }
      })
      resolve(manuList)
    })
  }
  
module.exports = { getManufacturersList }