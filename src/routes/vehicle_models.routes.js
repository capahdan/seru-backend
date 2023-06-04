module.exports = app => {
    const vehicle_models = require("../controllers/vehicle_models.controller.js");
    const { authJwt } = require("../middleware/index.js");
    var router = require("express").Router();

    router.post("/",[authJwt.verifyToken, authJwt.isAdmin], vehicle_models.create);
    router.get("/",[authJwt.verifyToken], vehicle_models.findAll);
    router.get("/:id", [authJwt.verifyToken], vehicle_models.findOne);
    router.patch("/:id", [authJwt.verifyToken,authJwt.isAdmin], vehicle_models.update);
    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], vehicle_models.delete);
    router.delete("/",[authJwt.verifyToken, authJwt.isAdmin], vehicle_models.deleteAll);
  
    app.use("/api/vehicle_models", router);
  };