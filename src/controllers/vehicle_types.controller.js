const db = require("../models");
const VehicleTypes = db.vehicle_types;
const Op = db.Sequelize.Op;

// Create and Save a new VehicleTypes
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a VehicleTypes
  const vehicle_types = {
    name: req.body.name,
    brand_id: req.body.brand_id,
  };

  // Save VehicleTypes in the database
  VehicleTypes.create(vehicle_types)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the VehicleTypes."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  const brand_id = req.query.brand_id;
  let condition = null

  if (name && brand_id) {
    condition = { 
      name: { [Op.iLike]: `%${name}%` },
      brand_id: { [Op.eq]: `${brand_id}` }
    };
  } else if (name) {
    condition = { name: { [Op.iLike]: `%${name}%` } };
  } else if (brand_id) {
    condition = { brand_id: { [Op.eq]: `${brand_id}` } };
  }

  VehicleTypes.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find a single VehicleTypes with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  VehicleTypes.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving VehicleTypes with id=" + id
      });
    });
};

// Update a VehicleTypes by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  VehicleTypes.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "VehicleTypes was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update VehicleTypes with id=${id}. Maybe VehicleTypes was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating VehicleTypes with id=" + id
      });
    });
};

// Delete a VehicleTypes with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  VehicleTypes.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "VehicleTypes was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete VehicleTypes with id=${id}. Maybe VehicleTypes was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete VehicleTypes with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  VehicleTypes.destroy({
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
