const db = require("../models");
const VehicleYears = db.vehicle_years;
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

// Create and Save a new VehicleYears
exports.create = (req, res) => {
  // Validate request
  if (!req.body.year) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a VehicleYears
  const vehicle_year = {
    year: req.body.year,
  };

  // Save VehicleYears in the database
  VehicleYears.create(vehicle_year)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the VehicleYears."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const year = req.query.year;
  const { page, size } = req.query;

  const {limit, offset} = getPagination(page, size);
  let condition = null

  if (year) {
    condition = { year: { [Op.iLike]: `%${year}%` } };
  } 

  VehicleYears.findAndCountAll({ where: condition, limit, offset })
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

// Find a single VehicleYears with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  VehicleYears.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving VehicleYears with id=" + id
      });
    });
};

// Update a VehicleYears by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  VehicleYears.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "VehicleYears was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update VehicleYears with id=${id}. Maybe VehicleYears was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating VehicleYears with id=" + id
      });
    });
};

// Delete a VehicleYears with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  VehicleYears.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "VehicleYears was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete VehicleYears with id=${id}. Maybe VehicleYears was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete VehicleYears with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  VehicleYears.destroy({
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
