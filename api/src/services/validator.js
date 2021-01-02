const validatePostgresData = (data) => {
    if (data.length < 1){ 
        throw new Error('Postgres returned empty array!') 
    } else {
        return data
    }
}

module.exports = {
    validatePostgresData
}