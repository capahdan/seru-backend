const db = require("../models");
const PriceList = db.price_list;
const Op = db.Sequelize.Op;

// Create and Save a new PriceList
exports.create = (req, res) => {
  // Validate request
  if (!req.body.price && !req.body.currency) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a PriceList
  const price_list = {
    price: req.body.price,
    currency: req.body.currency,
    year_id: req.body.year_id,
    model_id: req.body.model_id    
  };

  // Save PriceList in the database
  PriceList.create(price_list)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the PriceList."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const year = req.query.year;
  const type_id = req.query.type_id;
  let condition = null

  if (year) {
    condition = { year: { [Op.iLike]: `%${year}%` } };
  } 

  PriceList.findAll({ where: condition })
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

// Find a single PriceList with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  PriceList.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving PriceList with id=" + id
      });
    });
};

// Update a PriceList by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  PriceList.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "PriceList was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update PriceList with id=${id}. Maybe PriceList was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating PriceList with id=" + id
      });
    });
};

// Delete a PriceList with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  PriceList.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "PriceList was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete PriceList with id=${id}. Maybe PriceList was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete PriceList with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  PriceList.destroy({
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
