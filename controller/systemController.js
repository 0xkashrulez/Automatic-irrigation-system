const System = require('../models/systemModel');
const Plant = require('../models/plantModel');
const logger = require('../utils/logger');
const handleStatus = require('../utils/handelStatus');

const fetchAllSystems = async (req, res, next) => {
  try {
    const systems = await System.find().populate('plants'); // ممكن تعمل populate للنباتات لو عايز
    res.json(systems);
  } catch (err) {
    const error = logger.create('Failed to fetch systems', 500, handleStatus.ERROR, err.message);
    return next(error);
  }
};

const fetchSystem = async (req, res, next) => {
  const { systemId } = req.params;

  try {
    const system = await System.findById(systemId).populate('plants');
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
  const { name, description, amountWater, irrigationEvery, duration, type } = req.body;

  try {
    const newSystem = new System({
      name,
      description,
      amountWater,
      irrigationEvery,
      duration,
      type,
      userId: req.currentUser.id,
      plantsCount: 0,
      plants: []
    });

    await newSystem.save();

    // نعمل Plant جديد مربوط بال System ده
    const newPlant = new Plant({
      userId: req.currentUser.id,
      systemId: newSystem._id,
      humidity: '50', // قيمة افتراضية
      status: 'healthy'
    });

    await newPlant.save();

    // نربط النبات في System
    newSystem.plants.push(newPlant._id);
    newSystem.plantsCount = 1;
    await newSystem.save();

    res.status(201).json({
      message: 'System and Plant created successfully',
      system: newSystem,
      plant: newPlant
    });
  } catch (err) {
    const error = logger.create('Failed to add system and plant', 500, handleStatus.ERROR, err.message);
    return next(error);
  }
};

const editSystem = async (req, res, next) => {
  const { systemId } = req.params;
  const updates = { ...req.body };

  // منع تعديل plantsCount و plants يدوياً
  delete updates.plantsCount;
  delete updates.plants;

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

    // ممكن تحذف النباتات المرتبطة بال System لو حابب (مش ضروري)
    await Plant.deleteMany({ systemId: systemId });

    res.json({ message: 'System and its plants deleted successfully' });
  } catch (err) {
    const error = logger.create('Failed to delete system', 500, handleStatus.ERROR, err.message);
    return next(error);
  }
};

module.exports = {
  fetchAllSystems,
  fetchSystem,
  addSystem,
  editSystem,
  deleteSystem,
};
