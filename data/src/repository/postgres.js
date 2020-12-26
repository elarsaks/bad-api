const getManufacturerList = (db) => {
    return db.select('manufacturer')
        .from('products')
        .distinct()
        .catch(err => console.log(err))
    //    .then(data => console.log(data))
}

const postProduct = (product, db) => {
    return db('products').insert(product)
//    .then(data => console.log(data))
    .catch(err => console.log(err))
}


module.exports = {
    getManufacturerList,
    postProduct,
}