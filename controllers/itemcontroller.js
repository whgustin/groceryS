var express = require('express')
var router = express.Router()
var sequelize = require('../db');
var Item = sequelize.import('../models/item');
var User = sequelize.import('../models/user');
var validatesession = require('../middleware/validate-session');

//Create New Item
router.post('/create', (req, res) => {
    Item.create({
        name: req.body.item.name,
        category: req.body.item.category,
        price: req.body.item.price,
        quantity: req.body.item.quantity,
        description: req.body.item.description,
        owner: req.user.id
    })
    .then(
        createSuccess = item => {
            res.status(200).json(item)
        },
        createFail = item => {
            res.status(500).json({ error: err })
        }
    )
});

// Delete an Item

router.delete('/delete/:id', function(req, res) {
    var data = req.params.id;
    var userid = req.user.id;

    Item
        .destroy({
            where: { id: data, owner: userid }
        }).then(
            function deleteLogSuccess(data) {
                res.send("Item Removed!")
            }, 
            function deleteLogFailure(err) {
                res.send(500, err.message);
            }
        );
});

// Update Item

router.put('/update/:id', function(req, res){
    var data = req.params.item.id
    var name = req.body.item.name
    var category = req.body.item.category
    var price = req.body.item.price
    var quantity = req.body.item.quantity
    var description = req.body.item.description

    Items
        .update({
            data: data,
            name: name,
            category: category,
            price: price,
            quantity: quantity,
            description: description
        },
        {where: {id: data}} 
        ).then(
            function updateSuccess(updatedLog) {
                res.json({
                    data: data,
                    name: name,
                    category: category,
                    price: price,
                    quantity: quantity,
                    description: description
                });
            }, 
            function updateError(err){
                res.send(500, err.message);
            }
        )
});

//Get All Items
router.get('/allitems', (req, res) => {
    Item.findAll()
        .then(item => res.status(200).json(item))
        .catch(err => res.status(500).json({ error: err }))
})

module.exports = router;