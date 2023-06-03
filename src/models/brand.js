const db = require("../helpers/db")

exports.ReadBrand = (cb) => {
    db.query("SELECT * FROM vehicle_brands", (err, result) => {
        if  (err) throw err
        cb(result)
    })
}

exports.searchBrand = (brand_id, cb) => {
    db.query("SELECT * FROM vehicle_brands WHERE id=?", [brand_id], (err, res) => {
      if (err) throw err
      cb(res)
    })
  }
  
  exports.createBrand = (data,cb) => {
    db.query("INSERT INTO brand SET ?",[data], (err, res) => {
      if (err) throw err
      cb(res)
    })
  }
  
  exports.updateBrand = ( data, brand_id, cb) => {
    db.query("UPDATE vehicle_brands SET ? WHERE id=?", [data, brand_id], (err, res) => {
      if (err) throw err
      cb(res)
    })
  }
  
  exports.deleteBrand = (brand_id, cb) => {
    db.query("DELETE FROM vehicle_brands WHERE id=?", [brand_id], (err, res) => {
      if (err) throw err
      cb(res)
    })
  }