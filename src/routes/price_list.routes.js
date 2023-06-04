module.exports = app => {
    const price_list = require("../controllers/price_list.controller.js");
    const { authJwt } = require("../middleware/index.js");
    var router = require("express").Router();

    router.post("/",[authJwt.verifyToken, authJwt.isAdmin], price_list.create);
    router.get("/",[authJwt.verifyToken], price_list.findAll);
    router.get("/:id", [authJwt.verifyToken], price_list.findOne);
    router.patch("/:id", [authJwt.verifyToken,authJwt.isAdmin], price_list.update);
    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], price_list.delete);
    router.delete("/",[authJwt.verifyToken, authJwt.isAdmin], price_list.deleteAll);
  
    app.use("/api/price_list", router);
  };