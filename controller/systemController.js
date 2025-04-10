const System = require('../models/systemModel');
const logger = require('../utils/logger');
const handleStatus = require('../utils/handelStatus');


const fatchAllSystems = async (req, res, next) => {
  try {
    const systems = await System.find();
    res.json(systems);
  } catch (err) {
    const error = logger.create('Failed to fetch systems', 500, handleStatus.ERROR, err.message);
    return next(error);
  }
};


const fatchSystem = async (req, res, next) => {
  const { systemId } = req.params;

  try {
    const system = await System.findById(systemId);
    if (!system) {
      const error = logger.create('System not found', 404, handleStatus.ERROR);
      return next(error);
    }

    res.json(system);
  } catch (err) {
    const error = logger.create('Failed to fetch system', 500, handleStatus.ERROR, err.message);
    return next(error);
  }
};


const addSystem = async (req, res, next) => {
  const { name, description, amountWater, IrrigationEvery, duration, type } = req.body;

  try {
    const newSystem = new System({
      name,
      description,
      amountWater,
      IrrigationEvery,
      duration,
      type,
      userId:req.currentUser.id
    });

    await newSystem.save();
    res.status(201).json({ message: 'System added successfully', system: newSystem });
  } catch (err) {
    const error = logger.create('Failed to add system', 500, handleStatus.ERROR, err.message);
    return next(error);
  }
};


const editSystem = async (req, res, next) => {
  const { systemId } = req.params;
  const updates = req.body;

  try {
    const updatedSystem = await System.findByIdAndUpdate(systemId, updates, { new: true });
    if (!updatedSystem) {
      const error = logger.create('System not found', 404, handleStatus.ERROR);
      return next(error);
    }

    res.json({ message: 'System updated successfully', system: updatedSystem });
  } catch (err) {
    const error = logger.create('Failed to update system', 500, handleStatus.ERROR, err.message);
    return next(error);
  }
};

const deleteSystem = async (req, res, next) => {
  const { systemId } = req.params;

  try {
    const deletedSystem = await System.findByIdAndDelete(systemId);
    if (!deletedSystem) {
      const error = logger.create('System not found', 404, handleStatus.ERROR);
      return next(error);
    }

    res.json({ message: 'System deleted successfully' });
  } catch (err) {
    const error = logger.create('Failed to delete system', 500, handleStatus.ERROR, err.message);
    return next(error);
  }
};

module.exports = {
  fatchAllSystems,
  fatchSystem,
  addSystem,
  editSystem,
  deleteSystem
};
