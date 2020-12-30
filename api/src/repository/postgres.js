const getProductsByCategory = (category, db) => {
    return db.select('*')
        .from('products')
        .where({type: category})
    // ToDO: remove debug
    .then(data => data.slice(1-3))
}

module.exports = {
    getProductsByCategory,
}