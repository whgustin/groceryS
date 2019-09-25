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

//Update Item
router.put('/:id', (req,res) => {
    Item.update(req.body.item,{
        where:{id: req.params.id, owner: req.user.id}
    })
        .then(item => res.status(200).json(item))
        .catch(err => res.json({error: err}));
})
    
//Get All Items
router.get('/allitems', (req, res) => {
    Item.findAll()
        .then(item => res.status(200).json(item))
        .catch(err => res.status(500).json({ error: err }))
})


module.exports = router;