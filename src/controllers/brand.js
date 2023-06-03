const brandModel = require('../models/brand');

const readBrand = (req, res) => {
  brandModel.ReadBrand((result) => res.status(200).json({
    success: true,
    message: 'List of Brand',
    data: result,
  }));
};

const searchBrand = (req, res) => {
    const {
        brandId
    } = req.params;
    brandModel.searchBrand(brandId, result => {
        if (result.length) {
            return res.status(200).json({
                success: true,
                message: 'Detail Brand',
                data: result,
            });
        }
        return res.status(404).json({
            success: false,
            message: 'Brand Not Found',
        });
    })
}

const createBrand = (req, res) => {
    const newData = {
        ...req.body
    }
    brandModel.createBrand(newData, result => {
        if (result) {
            return res.status(200).json({
                success: true,
                message: 'Brand Created',
                data: result,
            });
        }
        return res.status(201).json({
            success: false,
            message: 'Failed Insert Brand',
        });
    })
}

const updateBrand = (req, res) => {
    const update = {
        ...req.body
    }
    const {brandId} = req.params;
    brandModel.updateBrand(update, brandId, result => { 
      if (result.changedRows) {
        return res.status(200).json({
          success: true,
          message: 'Brand Updated',
          data: result,
        });
      } else {
        return res.status(400).json({
          success: false,
          message: 'Brand Not Found',
        });
      }
    })
}

const deleteBrand = (req, res) => {
    const {brandId} = req.params;
    brandModel.deleteBrand(brandId, result => {
        if (result.affectedRows) {
            return res.status(200).json({
            success: true,
            message: 'Brand Deleted',
            data: result,
            });
        } else {
            return res.status(400).json({
            success: false,
            message: 'Brand Not Found',
            });
        }
    })
}

module.exports = {
    readBrand,
    searchBrand,
    createBrand,
    updateBrand,
    deleteBrand,
    createBrand
}