const db = require("../models");
const VehicleModels = db.vehicle_models;
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

// Create and Save a new VehicleModels
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a VehicleModels
  const vehicle_types = {
    name: req.body.name,
    type_id: req.body.type_id,
  };

  // Save VehicleModels in the database
  VehicleModels.create(vehicle_types)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the VehicleModels."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  const type_id = req.query.type_id;
  const { page, size } = req.query;

  const {limit, offset} = getPagination(page, size);
  let condition = null

  if (name && type_id) {
    condition = { 
      name: { [Op.iLike]: `%${name}%` },
      type_id: { [Op.eq]: `${type_id}` }
    };
  } else if (name) {
    condition = { name: { [Op.iLike]: `%${name}%` } };
  } else if (type_id) {
    condition = { type_id: { [Op.eq]: `${type_id}` } };
  }

  VehicleModels.findAndCountAll({ where: condition, limit, offset })
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

// Find a single VehicleModels with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  VehicleModels.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving VehicleModels with id=" + id
      });
    });
};

// Update a VehicleModels by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  VehicleModels.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "VehicleModels was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update VehicleModels with id=${id}. Maybe VehicleModels was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating VehicleModels with id=" + id
      });
    });
};

// Delete a VehicleModels with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  VehicleModels.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "VehicleModels was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete VehicleModels with id=${id}. Maybe VehicleModels was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete VehicleModels with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  VehicleModels.destroy({
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
