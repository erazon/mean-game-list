const express = require('express');
const controllers = require('../controllers/games.controller');
const routers = express.Router();

routers.route('/games').get(controllers.getAllGames)
    .post(controllers.createGame);

routers.route('/games/:gameId')
    .get(controllers.getOneGame)
    .put(controllers.fullGameUpdateOne)
    .patch(controllers.partialGameUpdateOne)
    .delete(controllers.deleteGame);

module.exports = routers;