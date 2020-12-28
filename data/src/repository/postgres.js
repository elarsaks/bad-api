const deleteAllProducts = (db) => {
    return db('products').del()
        .then(resp => {
            console.log(`Deleted "${resp}" products from postgres.`)
            return resp
        })
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

const putStock = (product, db) => {
    return db('products')
    .where({ id: product.id })
    .update({ instock: product.stock })
    .then(resp => {
        if(resp == 0){
            console.log(`Product "${product.id}" is not in database.`)
        } else {
            console.log(`${product.id} stock value updated ${product.stock}.`)
        }
        return resp
    })
    .catch(err => console.log(err))
}

module.exports = {
    deleteAllProducts,
    getManufacturerList,
    getProductsByCategory,
    postProduct,
    putStock,
}