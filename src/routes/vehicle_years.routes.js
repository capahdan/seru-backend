module.exports = app => {
    const vehicle_years = require("../controllers/vehicle_years.controller.js");
    const { authJwt } = require("../middleware/index.js");
    var router = require("express").Router();

    router.post("/",[authJwt.verifyToken, authJwt.isAdmin], vehicle_years.create);
    router.get("/",[authJwt.verifyToken], vehicle_years.findAll);
    router.get("/:id", [authJwt.verifyToken], vehicle_years.findOne);
    router.patch("/:id", [authJwt.verifyToken,authJwt.isAdmin], vehicle_years.update);
    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], vehicle_years.delete);
    router.delete("/",[authJwt.verifyToken, authJwt.isAdmin], vehicle_years.deleteAll);
  
    app.use("/api/vehicle_years", router);
  };