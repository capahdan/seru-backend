module.exports = app => {
    const vehicle_brands = require("../controllers/vehicle_brands.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", vehicle_brands.create);
  
    // Retrieve all Tutorials
    router.get("/", vehicle_brands.findAll);
  
    // Retrieve all published Tutorials
    router.get("/published", vehicle_brands.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", vehicle_brands.findOne);
  
    // Update a Tutorial with id
    router.patch("/:id", vehicle_brands.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", vehicle_brands.delete);
  
    // Delete all Tutorials
    router.delete("/", vehicle_brands.deleteAll);
  
    app.use("/api/vehicle_brands", router);
  };