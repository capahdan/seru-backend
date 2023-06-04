module.exports = app => {
    const vehicle_types = require("../controllers/vehicle_types.controller.js");
    const { authJwt } = require("../middleware/index.js");
    var router = require("express").Router();

    router.post("/",[authJwt.verifyToken, authJwt.isAdmin], vehicle_types.create);
    router.get("/",[authJwt.verifyToken], vehicle_types.findAll);
    router.get("/:id", [authJwt.verifyToken], vehicle_types.findOne);
    router.patch("/:id", [authJwt.verifyToken,authJwt.isAdmin], vehicle_types.update);
    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], vehicle_types.delete);
    router.delete("/",[authJwt.verifyToken, authJwt.isAdmin], vehicle_types.deleteAll);
  
    app.use("/api/vehicle_types", router);
  };