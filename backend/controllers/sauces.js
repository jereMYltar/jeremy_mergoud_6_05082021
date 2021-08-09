const Sauce = require('../models/sauces');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
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
    // const sauce = new Sauce({
    //     _id: req.params.id,
    //     name: req.body.name,
    //     manufacturer: req.body.manufacturer,
    //     description: req.body.description,
    //     mainPepper: req.body.mainPepper,
    //     imageUrl: req.body.imageUrl,
    //     heat: req.body.heat,
    //     likes: req.body.likes,                      //changements à faire
    //     dislikes: req.body.dislikes,                //changements à faire
    //     usersLiked: [],                             //changements à faire
    //     usersDisliked: []                           //changements à faire
    // });
    const sauceObject = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        }
        :
        {...req.body}
    Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
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
    Sauce.findOne({_id: req.params.id})
    .then(
        (sauce) => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`./images/${filename}`, () => {
                Sauce.deleteOne({_id: req.params.id})
                    .then(
                        res.status(200).json({
                            message : 'Deleted.'
                        })
                    )
                    .catch(
                        (error) => {
                            res.status(400).json({
                                error : error
                            })
                        }
                    );
            })
        }
    )
    .catch(
        (error) => {
            res.status(500).json({
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