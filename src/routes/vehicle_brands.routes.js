module.exports = app => {
    const vehicle_brands = require("../controllers/vehicle_brands.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Vehicles Brand
    router.post("/", vehicle_brands.create);
  
    // Retrieve all Vehicles Brands
    router.get("/", vehicle_brands.findAll);
  
    // Retrieve all published Vehicles Brands
    router.get("/published", vehicle_brands.findAllPublished);
  
    // Retrieve a single Vehicles Brand with id
    router.get("/:id", vehicle_brands.findOne);
  
    // Update a Vehicles Brand with id
    router.patch("/:id", vehicle_brands.update);
  
    // Delete a Vehicles Brand with id
    router.delete("/:id", vehicle_brands.delete);
  
    // Delete all Vehicles Brands
    router.delete("/", vehicle_brands.deleteAll);
  
    app.use("/api/vehicle_brands", router);
  };