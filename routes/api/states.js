const express = require('express');
const router = express.Router();
const statesController = require('../../controllers/statesController');
const path = require('path');



router.route('/')
    .get(statesController.getAllStates)
    .post(statesController.createNewState)
    .put(statesController.updateState)
    .delete(statesController.deleteState);

router.route('/:id')
    .get(statesController.getState);

router.route('/:id/funfact')
    .get(statesController.getFunFact)
    .post(statesController.postFunFact)
    .patch(statesController.patchFunFact)
    .delete(statesController.deleteFunFact);

router.route('/:id/capital')
    .get(statesController.getCapital);

router.route('/:id/nickname')
    .get(statesController.getNickname);

router.route('/:id/population')
    .get(statesController.getPopulation);

router.route('/:id/admission')
    .get(statesController.getAdmission);





module.exports = router;