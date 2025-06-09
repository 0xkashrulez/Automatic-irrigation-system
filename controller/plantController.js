const Plant = require('../models/plantModel');
const logger = require('../utils/logger');
const handleStatus = require('../utils/handelStatus');

// ✅ تحديث الرطوبة للنبات
const updateHumidity = async (req, res, next) => {
  const { id } = req.params;
  const { humidity } = req.body;

  try {
    const plant = await Plant.findById(id);
    if (!plant) {
      const error = logger.create('Plant not found', 404, handleStatus.ERROR);
      return next(error);
    }

    plant.humidity = humidity;
    await plant.save();

    res.json({ message: 'Humidity updated successfully', humidity: plant.humidity });
  } catch (err) {
    const error = logger.create('Failed to update humidity', 500, handleStatus.ERROR, err.message);
    return next(error);
  }
};

// ✅ جلب الرطوبة للنبات
const getPlantHumidity = async (req, res, next) => {
  const { id } = req.params;

  try {
    const plant = await Plant.findById(id);
    if (!plant) {
      const error = logger.create('Plant not found', 404, handleStatus.ERROR);
      return next(error);
    }

    res.json({ humidity: plant.humidity });
  } catch (err) {
    const error = logger.create('Failed to get humidity', 500, handleStatus.ERROR, err.message);
    return next(error);
  }
};

// ✅ جلب النبات عن طريق systemId (لقراءة بيانات السنسور مثلاً)
const getPlantBySystem = async (req, res, next) => {
  try {
    const { systemId } = req.params;
    const plant = await Plant.findOne({ systemId });

    if (!plant) {
      const error = logger.create('No plant found for this system', 404, handleStatus.ERROR);
      return next(error);
    }

    res.json(plant);
  } catch (err) {
    const error = logger.create('Failed to fetch plant by system', 500, handleStatus.ERROR, err.message);
    return next(error);
  }
};

module.exports = {
  updateHumidity,
  getPlantHumidity,
  getPlantBySystem, // ← ضفنا ده هنا
};
