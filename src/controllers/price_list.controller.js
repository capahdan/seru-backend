const db = require("../models");
const PriceList = db.price_list;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? (limit*(page-1) + 1) - 1 : 0;
  
  return { limit, offset };
};

const getPagingData = (data,limit,offset) => {
  const { count: totalItems, rows: price_list } = data;
  
  return { total:totalItems, data:{price_list}, limit, skip:offset };
};

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
    .then(price_list => {
      res.send(
        {
          message: "PriceList was Created successfully!" ,data:{price_list}
        }
      );
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
  const currency = req.query.currency; // this is string
  const model_id = req.query.model_id;
  const year_id = req.query.year_id;
  
  const pmin = req.query.pmin;
  const pmax = req.query.pmax;
  const { page, size } = req.query;

  const {limit, offset} = getPagination(page, size);
  let condition = {}

  if (pmin && pmax) {
    condition.price = { [Op.gte]: `${pmin}` };
    condition.price = { ...condition.price, [Op.lte]: `${pmax}` };
  }else if (pmin) {
    condition.price = { [Op.gte]: `${pmin}` };
  }else if (pmax) {
    condition.price = { [Op.lte]: `${pmax}` };
  }
  if (currency) {
    condition.currency = { [Op.iLike]: `%${currency}%` };
  }

  if (model_id) {
    condition.model_id = { [Op.eq]: `${model_id}` } ;
  }

  if (year_id) {
    condition.year_id =  { [Op.eq]: `${year_id}` } ;
  }


  PriceList.findAndCountAll({ where: condition, limit, offset })
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
