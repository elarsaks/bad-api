const putStock = (product, db) => {
    console.log(product.id)
    return db('products')
    .where({ id: product.id })
    .update({ instock: product.stock })
    .then(resp => console.log(resp))
    .catch(err => console.log(err))
}

const getManufacturerList = (db) => {
    return db.select('manufacturer')
        .from('products')
        .distinct()
        .catch(err => console.log(err))
}

const postProduct = (product, db) => {
    return db('products').insert(product)
    .catch(err => console.log(err))
}


module.exports = {
    getManufacturerList,
    postProduct,
    putStock,
}