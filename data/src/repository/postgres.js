const putStock = (product, db) => {
    return db('products')
    .where({ id: product.id })
    .update({ instock: product.stock })
    .then(resp => resp == 0 
        ? console.log('Product is not in Database')
        : console.log(`${product.id} stock value updated ${product.stock} .`))
    .catch(err => console.log(err))
}

const getManufacturerList = (db) => {
    return db.select('manufacturer')
        .from('products')
        .distinct()
        .catch(err => console.log(err))
}

const getProductsByCategory = (category, db) => {
    return db.select('*')
        .from('products')
        .where({type: category})
    .then(data => data.slice(1-3))
}

const postProduct = (product, db) => {
    return db('products').insert(product)
    .catch(err => console.log(err))
}


module.exports = {
    getManufacturerList,
    getProductsByCategory,
    postProduct,
    putStock,
}