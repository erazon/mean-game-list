const mongoose = require('mongoose');
const Game = mongoose.model('Game');

const createGame = function(req, res){
    const newGame = {
        title: req.body.title,
        year: req.body.year,
        rate: req.body.rate,
        price: req.body.price,
        minPlayers: req.body.minPlayers,
        maxPlayers: req.body.maxPlayers,
        minAge: req.body.minAge,
        publisher: {
            name: 'No name',
            country: 'Not set'
        },
        reviews: [],
        designers: []
    };

    Game.create(newGame, function(err, game){
        const response = {
            status: parseInt(process.env.STATUS_CREATED),
            message: game
        }
        if(err){
            console.log('Insertion error', err);
            response.status = parseInt(process.env.STATUS_INTERNAL_SERVER_ERROR, process.env.BASE_NUMBER);
            response.message = err;
        }
        res.status(response.status).json(response.message);
    });
}

const deleteGame = function(req, res){
    if(!mongoose.isValidObjectId(req.params.gameId)){
        res.status(parseInt(process.env.STATUS_USER_ERROR)).json({message: process.env.MSG_INVALID_MOVIE_ID});
        return;
    }

    Game.findByIdAndDelete(req.params.gameId, function(err, deletedGame){
        const response = {
            status: parseInt(process.env.STATUS_OK),
            message: deletedGame
        }
        if(err){
            response.status = parseInt(process.env.STATUS_INTERNAL_SERVER_ERROR);
            response.message = err;
        }
        else if(!deletedGame){
            console.log('Game ID not found');
            response.status = parseInt(process.env.STATUS_NOT_FOUND);
            response.message = {message: process.env.MSG_GAME_NOT_FOUND};
        }
        res.status(response.status).json(response.message);
    });
}

const getAllGames = function(req, res){
    let count = parseInt(process.env.DEFAULT_COUNT);
    let offset = parseInt(process.env.DEFAULT_OFFSET);

    if(req.query.count){
        count = parseInt(req.query.count);
    }
    if(req.query.offset){
        offset = parseInt(req.query.offset);
    }

    if(count > process.env.MAX_COUNT){
        res.status(parseInt(process.env.STATUS_USER_ERROR)).json({message: process.env.MSG_USER_ERROR});
        return;
    }

    Game.find().skip(offset).limit(count).exec(function(err, games){
        const response = {};
    
        if(err){
            response.status = parseInt(process.env.STATUS_SERVER_ERROR);
            response.message = err;
        }
        else{
            response.status = parseInt(process.env.STATUS_OK);
            response.message = games;
        }
    
        res.status(response.status).json(response.message);
    });
}

const getOneGame = function(req, res){
    if(!mongoose.isValidObjectId(req.params.gameId)){
        res.status(parseInt(process.env.STATUS_USER_ERROR)).json({message: process.env.MSG_INVALID_GAME_ID});
        return;
    }
    Game.findById(req.params.gameId, function(err, game){
        const response = {
            status: parseInt(process.env.STATUS_OK),
            message: game
        };
    
        if(err){
            response.status = parseInt(process.env.STATUS_SERVER_ERROR);
            response.message = err;
        }
        else if(!game){
            console.log('Game ID not found');
            response.status = parseInt(process.env.STATUS_NOT_FOUND);
            response.message = {message: process.env.MSG_GAME_NOT_FOUND};
        }
    
        res.status(response.status).json(response.message);
    });
}

const fullGameUpdateOne = function(req, res){
    console.log('fullGameUpdateOne called');
    _updateGameOne(req, res, _fullGameUpdateOne);
}

const partialGameUpdateOne = function(req, res){
    console.log('partialGameUpdateOne called');
    _updateGameOne(req, res, _partialGameUpdateOne);
}

const _fullGameUpdateOne = function(req, res, game){
    game.title = req.body.title;
    game.year = req.body.year;
    game.rate = req.body.rate;
    game.price = req.body.price;
    game.minPlayers = req.body.minPlayers;
    game.maxPlayers = req.body.maxPlayers;
    game.minAge = req.body.minAge;
    _updateGameResponse(res, game);
}

const _partialGameUpdateOne = function(req, res, game){
    if(req.body.title){
        game.title = req.body.title;
    }
    if(req.body.year){
        game.year = req.body.year;
    }
    if(req.body.rate){
        game.rate = req.body.rate;
    }
    if(req.body.price){
        game.price = req.body.price;
    }
    if(req.body.minPlayers){
        game.minPlayers = req.body.minPlayers;
    }
    if(req.body.maxPlayers){
        game.maxPlayers = req.body.maxPlayers;
    }
    if(req.body.minAge){
        game.minAge = req.body.minAge;
    }
    
    _updateGameResponse(res, game);
}

const _updateGameOne = function(req, res, gameUpdateCallback){
    if(!mongoose.isValidObjectId(req.params.gameId)){
        res.status(parseInt(process.env.STATUS_USER_ERROR)).json({message: process.env.MSG_INVALID_MOVIE_ID});
        return;
    }

    Game.findById(req.params.gameId, function(err, game){
        const response = {
            status: parseInt(process.env.STATUS_OK),
            message: game
        };
        if(err){
            res.status(parseInt(process.env.STATUS_SERVER_ERROR)).json(err);
        }
        else if(!game){
            console.log('Game ID not found');
            res.status(parseInt(process.env.STATUS_NOT_FOUND)).json({message: process.env.MSG_GAME_NOT_FOUND});
        }
        else{
            gameUpdateCallback(req, res, game);
        }
    });
}

const _updateGameResponse = function(res, game){
    game.save(function(err, game){
        const response = {
            status: parseInt(process.env.STATUS_OK),
            message: game
        }
        if(err){
            console.log('Update error', err);
            response.status = parseInt(process.env.STATUS_SERVER_ERROR);
            response.message = err;
        }
        res.status(response.status).json(response.message);
    });
}

module.exports = {createGame, deleteGame, getAllGames, getOneGame, fullGameUpdateOne, partialGameUpdateOne};