const Plant = require('../models/plantModel');


exports.updateHumidity = async (req, res) => {
  try {
    const { humidity } = req.body;
    const plant = await Plant.findByIdAndUpdate(
      req.params.id,
      { humidity },
      { new: true }
    );

    if (!plant) {
      return res.status(404).json({ message: 'Plant not found' });
    }

    res.status(200).json({
      message: 'Humidity updated',
      humidity: plant.humidity
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPlantHumidity = async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);
    if (!plant) {
      return res.status(404).json({ message: 'Plant not found' });
    }

    res.status(200).json({
      humidity: plant.humidity,
      status: plant.status
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
