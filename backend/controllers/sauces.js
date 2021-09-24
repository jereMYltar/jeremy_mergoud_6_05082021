const Sauce = require('../models/sauces');
const fs = require('fs');
const { POINT_CONVERSION_COMPRESSED } = require('constants');

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
                res.status(410).json({
                    error : error
                });
            }
        );
};

exports.modifySauce = (req, res, next) => {  //reprendre la suppression de l'image
//     const sauceObject = hasFile ?
//         {
//             ...JSON.parse(req.body.sauce),
//             imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
//         }
//         :
//         {...req.body}
//     console.log(!!req.file);
//     //mise à jour de la base de donnée lors d'une modification de sauce avec suppression de l'ancienne image

//     Sauce.findOne({_id: req.params.id})
//     .then(
//         (sauce) => {
//             const filename = sauce.imageUrl.split('/images/')[1];
//             fs.unlink(`./images/${filename}`, () => {
//                 Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
//                 .then(
//                     () => {
//                         res.status(201).json({
//                             message : 'Sauce updated successfully;'
//                         });
//                     }
//                 )
//                 .catch(
//                     (error) => {
//                         res.status(400).json({
//                             error : error
//                         });
//                     }
//                 );
//             })
//         }
//     )
//     .catch(
//         (error) => {
//             res.status(500).json({
//                 error : error
//             });
//         }
//     );   
// };
    const hasFile = !!req.file;
    let sauceObject;
    if (hasFile) {
        sauceObject = {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        };
        Sauce.findOne({_id: req.params.id})
        .then(
            (sauce) => {
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`./images/${filename}`, () => {
                    
                })
            }    
        )
        .catch(
            (error) => {
                res.status(410).json({ error : error });
            }
        );
    } else {
        sauceObject = {...req.body}
    };
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
            res.status(410).json({
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

exports.likeSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then(
        (sauce) => {
            let userId = req.body.userId;
            let userHasAlreadyLiked = !!(sauce.usersLiked.includes(userId));
            let userHasAlreadyDisLiked = !!(sauce.usersDisliked.includes(userId));
            let userHasAlreadyReacted = userHasAlreadyLiked || userHasAlreadyDisLiked;
            let userWantsToLike = !!(req.body.like == 1);
            let userWantsToCancel = !!(req.body.like == 0);
            let userWantsToDislike = !!(req.body.like == -1);
            
            if (userWantsToLike && !userHasAlreadyReacted) {
                sauce.usersLiked.push(userId);
            } else if (userWantsToCancel && userHasAlreadyLiked) {
                let index = sauce.usersLiked.indexOf(userId);
                sauce.usersLiked.splice(index, 1);
            } else if (userWantsToCancel && userHasAlreadyDisLiked) {
                let index = sauce.usersDisliked.indexOf(userId);
                sauce.usersDisliked.splice(index, 1);
            } else if (userWantsToDislike && !userHasAlreadyReacted) {
                sauce.usersDisliked.push(userId);
            }
            sauce.likes = sauce.usersLiked.length;
            sauce.dislikes = sauce.usersDisliked.length;

            Sauce.updateOne({_id: sauce._id}, sauce)
            .then(
                () => {
                    res.status(200).json({
                        message : 'Sauce like/dislike status updated successfully;'
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
        }
    )
    .catch(
        (error) => {
            res.status(410).json({
                error : error
            });
        }
    );
};