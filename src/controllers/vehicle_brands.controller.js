const db = require("../models");
const VehicleBrands = db.vehicle_brands;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? (limit*(page-1) + 1) - 1 : 0;
  
  return { limit, offset };
};

const getPagingData = (data,limit,offset) => {
  const { count: totalItems, rows: vehicle_brands } = data;
  
  return { total:totalItems, data:{vehicle_brands}, limit, skip:offset };
};


// Retrieve all VehicleBrand from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  const country = req.query.country;
  const { page, size } = req.query;

  const {limit, offset} = getPagination(page, size);
  let condition = null

  if (name && country) {
    condition = { 
      name: { [Op.iLike]: `%${name}%` },
      country: { [Op.iLike]: `%${country}%` }
    };
  } else if (name) {
    condition = { name: { [Op.iLike]: `%${name}%` } };
  } else if (country) {
    condition = { country: { [Op.iLike]: `%${country}%` } };
  }

  VehicleBrands.findAndCountAll({ where: condition, limit, offset })
    .then(data => {
      const response = getPagingData(data, limit, offset);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Create and Save a new VehicleBrands
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a VehicleBrands
  const tutorial = {
    name: req.body.name,
    country: req.body.country,
  };

  // Save VehicleBrands in the database
  VehicleBrands.create(tutorial)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the VehicleBrands."
      });
    });
};

// Find a single VehicleBrands with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  VehicleBrands.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving VehicleBrands with id=" + id
      });
    });
};

// Update a VehicleBrands by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  VehicleBrands.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "VehicleBrands was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update VehicleBrands with id=${id}. Maybe VehicleBrands was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating VehicleBrands with id=" + id
      });
    });
};

// Delete a VehicleBrands with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  VehicleBrands.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "VehicleBrands was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete VehicleBrands with id=${id}. Maybe VehicleBrands was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete VehicleBrands with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  VehicleBrands.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};
