const State = require('../model/State');

const getAllStates = async (req, res) => {
    if (req.query.contig != null)
    {
        const states = await State.find({contig: req.query.contig});
        if (!states) return res.status(204).json({ 'message': 'No states found.' });
        res.json(states);
    }
    else
    {
        const states = await State.find();
        if (!states) return res.status(204).json({ 'message': 'No states found.' });
        res.json(states);
    }
}

const createNewState = async (req, res) => {
    if (!req?.body?.stateCode || !req?.body?.stateName) {
        return res.status(400).json({ 'message': 'State Code and Name are required.' });
    }

    try {
        const result = await State.create({
            stateCode: req.body.stateCode,
            stateName: req.body.stateName,
            funfact: req.body.funfact,
            capital: req.body.capital,
            nickname: req.body.nickname,
            population: req.body.population,
            admission: req.body.admission,
            contig: req.body.contig
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

const updateState = async (req, res) => {
    if (!req?.body?.id ) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }

    const state = await State.findOne({ _id: req.body.id }).exec();
    if (!state) {
        return res.status(204).json({ "message": `No state matches provided ID ${req.body.id}.` });
    }
    if (req.body?.stateCode) state.stateCode = req.body.stateCode;
    if (req.body?.stateName) state.stateName = req.body.stateName;
    if (req.body?.funfact) state.funfact = req.body.funfact;
    if (req.body?.capital) state.capital = req.body.capital;
    if (req.body?.nickname) state.nickname = req.body.nickname;
    if (req.body?.population) state.population = req.body.population;
    if (req.body?.admission) state.admission = req.body.admission;
    if (req.body?.contig) state.contig = req.body.contig;
    const result = await state.save();
    res.json(result);
}

const postFunFact = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }
    const state = await State.findOne({ _id: req.body.id }).exec();
    if (!state) {
        return res.status(204).json({ "message": `No state matches provided ID ${req.body.id}.` });
    }
    if (req.body?.funfact && Array.isArray(req.body.funfact)) {
      state.funfact.push(...req.body.funfact); // Add multiple fun facts at once
    } else {
        return res.status(400).json({ 'message': 'A funfacts array is required.' });
    }
    const result = await state.save();
    res.json(result);
};

const patchFunFact = async (req, res) => {
    if (!req?.body?.id || !req?.body?.index) {
        return res.status(400).json({ 'message': 'ID parameter or Index is required.' });
    }
    const state = await State.findOne({ _id: req.body.id }).exec();
    if (!state) {
        return res.status(204).json({ "message": `No state matches provided ID ${req.body.id}.` });
    }
    if (req.body?.funfact) state.funfact[req?.body?.index-1]= req.body.funfact;
    const result = await state.save();
    res.json(result);
};

const deleteFunFact = async (req, res) => {
    if (!req?.body?.id || !req?.body?.index) {
        return res.status(400).json({ 'message': 'ID parameter or Index is required.' });
    }
    const state = await State.findOne({ stateCode: req.params.id }).exec();
    const actualIndex = req?.body?.index - 1;
    if (state.funfact && state.funfact.length > actualIndex) {
        const funFactToDelete = state.funfact[actualIndex];
        state.funfact.splice(actualIndex, 1); // Remove the fun fact from the array
        state.save()
        .then(result => {
            res.status(200).json({ result });
        })
        .catch(error => {
            res.status(500).json({ error });
        });

        console.log(funFactToDelete);
    } else {
        res.status(400).json({ 'message': 'Invalid index provided.' });
    }
};

const deleteState = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'State ID required.' });

    const state = await State.findOne({ _id: req.body.id }).exec();
    if (!state) {
        return res.status(204).json({ "message": `No state matches ID ${req.body.id}.` });
    }
    const result = await state.deleteOne(); //{ _id: req.body.id }
    res.json(result);
};

const getState = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'State Code required.' });

    const state = await State.findOne({ stateCode: req.params.id }).exec();
    if (!state) {
        return res.status(204).json({ "message": `No state matches State Code ${req.params.id}.` });
    }
    res.json(state);
};

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
};

const getFunFact = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'State Code required.' });

    const state = await State.findOne({ stateCode: req.params.id }).exec();
    if (!state) {
        return res.status(204).json({ "message": `No state matches ID ${req.params.id}.` });
    }
    var randInt = getRandomInt(state.funfact.length);
    res.json(state.funfact[randInt]);
};

const getCapital = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'State Code required.' });

    const state = await State.findOne({ stateCode: req.params.id }).exec();
    if (!state) {
        return res.status(204).json({ "message": `No state matches ID ${req.params.id}.` });
    }
    return res.json({
        state: state.stateName, capital: state.capital
    });
};

const getNickname = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'State Code required.' });

    const state = await State.findOne({ stateCode: req.params.id }).exec();
    if (!state) {
        return res.status(204).json({ "message": `No state matches ID ${req.params.id}.` });
    }
    return res.json({
        state: state.stateName, nickname: state.nickname
    });
};

const getPopulation = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'State Code required.' });

    const state = await State.findOne({ stateCode: req.params.id }).exec();
    if (!state) {
        return res.status(204).json({ "message": `No state matches ID ${req.params.id}.` });
    }
    return res.json({
        state: state.stateName, population: state.population
    });
};

const getAdmission = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'State Code required.' });

    const state = await State.findOne({ stateCode: req.params.id }).exec();
    if (!state) {
        return res.status(204).json({ "message": `No state matches ID ${req.params.id}.` });
    }
    return res.json({
        state: state.stateName, admitted: state.admission
    });
};

module.exports = {
    getAllStates,
    createNewState,
    updateState,
    deleteState,
    getState,
    getFunFact,
    getCapital,
    getNickname,
    getPopulation,
    getAdmission,
    patchFunFact,
    postFunFact,
    deleteFunFact
}