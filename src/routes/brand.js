const brand = require('express').Router();
const cors = require('cors');

const {
    readBrand,
    searchBrand,
    updateBrand,
    deleteBrand,
    createBrand,
}= require('../controllers/brand');

brand.get('/', cors(), readBrand);
brand.get('/:brandId', cors(), searchBrand);
brand.patch('/:brandId', cors(), updateBrand);
brand.delete('/:brandId', cors(), deleteBrand);
brand.post('/', cors(), createBrand);
brand.put('/:brandId', cors(), updateBrand);


module.exports = brand;