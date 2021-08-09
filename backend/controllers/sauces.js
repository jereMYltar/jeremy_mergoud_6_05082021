const Sauce = require('../models/sauces');

exports.createSauce = (req, res, next) => {
    const sauce = new Sauce({
        userId: req.body.userId,
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        description: req.body.description,
        mainPepper: req.body.mainPepper,
        imageUrl: req.body.imageUrl,
        heat: req.body.heat,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    });
    sauce.save()
        .then(
            () => {
                res.status(201).json({
                    message : 'Sauce created successfully.'
                });
            }
        )
        .catch(
            (error) => {
                res.status(400).json({
                    error : error
                });
            }
        );
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({
        _id: req.params.id
    })
        .then(
            (sauce) => {
                res.status(200).json(sauce);
            }
        )
        .catch(
            (error) => {
                res.status(404).json({
                    error : error
                });
            }
        );
};

exports.modifySauce = (req, res, next) => {
    const sauce = new Sauce({
        _id: req.params.id,
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        description: req.body.description,
        mainPepper: req.body.mainPepper,
        imageUrl: req.body.imageUrl,
        heat: req.body.heat,
        likes: req.body.likes,                      //changements à faire
        dislikes: req.body.dislikes,                //changements à faire
        usersLiked: [],                             //changements à faire
        usersDisliked: []                           //changements à faire
    });
    Sauce.updateOne({_id: req.params.id}, sauce)
        .then(
            () => {
                res.status(201).json({
                    message : 'Sauce updated successfully;'
                });
            }
        )
        .catch(
            (error) => {
                res.status(400).json({
                    error : error
                });
            }
        );
};

exports.deleteSauce = (req, res, next) => {
    Sauce.deleteOne({_id: req.params.id})
    .then(
        () => {
            res.status(200).json({
                message : 'Deleted.'
            });
        }
    )
    .catch(
        (error) => {
            res.status(400).json({
                error : error
            });
        }
    );   
};

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
    .then(
        (things) => {
            res.status(200).json(things);
        }
    )
    .catch(
        (error) => {
            res.status(400).json({
                error : error
            });
        }
    );  
};