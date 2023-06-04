module.exports = app => {
    const vehicle_brands = require("../controllers/vehicle_brands.controller.js");
    const { authJwt } = require("../middleware");
    var router = require("express").Router();

    router.post("/",[authJwt.verifyToken, authJwt.isAdmin], vehicle_brands.create);
    router.get("/",[authJwt.verifyToken], vehicle_brands.findAll);
    router.get("/:id", [authJwt.verifyToken], vehicle_brands.findOne);
    router.patch("/:id", [authJwt.verifyToken,authJwt.isAdmin], vehicle_brands.update);
    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], vehicle_brands.delete);
    router.delete("/",[authJwt.verifyToken, authJwt.isAdmin], vehicle_brands.deleteAll);
  
    app.use("/api/vehicle_brands", router);
  };