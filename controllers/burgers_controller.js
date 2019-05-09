var express = require("express");
var router = express.Router();

// MODEL
var burger = require("../models/burger")

// ROUTES
router.get("/", function(req, res) {
    burger.all(function(data) {
        var hbsObject = {cats: data}
        console.log(hbsObject);
        res.render("index", { burgers: data });
    })
});

router.post("/api/burgers", function(req, res) {
    burger.create(
        ["name", "sleepy"],
        [req.body.name, req.body.sleepy],
        function(result) {
            res.json({ id: result.insertId });
            console.log({ id: result.insertId });
        }
    )
});

router.put("api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
    console.log("condition", condition);

    burger.update({sleepy: req.body.sleepy}, condition, function(result) {
        if(result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    })
});

router.delete("api/burgers/:id", function(req, res){
    var condition = "id = " + req.params.id;
    console.log("condition", condition);

    burger.delete(condition, function(result) {
        if(result.affectedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    })
});

module.exports = router;