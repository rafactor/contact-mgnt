var express = require('express');

var router = express.Router();

var burger = require('../models/burger');

router.get("/",function(req,res){
    console.log('trying to get')
    burger.all(function(data) {
        var hbsObject = {
          burger: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
      });
})

router.post("/api/burger",function(req,res){
    
    burger.create(["burger_name"],[req.body.burger_name],function(result){
        res.json({ id: result.insertId });
    });
})

router.put("/api/burger/:id",function(req,res){
    var condition = "burger_id = " + req.params.id;

    burger.update({devoured: true},condition,function(result){
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
          } else {
            res.status(200).end();
          }
    });
})

router.delete("/api/burger/:id",function(req,res){
    var condition = "burger_id = " + req.params.id;

    burger.delete(condition,function(result){
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
          } else {
            res.status(200).end();
          }
    });
})

module.exports = router;
