const WaterTank = require('../models/WaterTank');
const logger = require('../utils/logger');
const handleStatus = require('../utils/handelStatus');



const createWaterTank = async (req, res) => {
  try {
      const { nameTank, amountTank, maxTank, minTank } = req.body;

      // Make sure the user is authenticated and attached to req.user
      const userId = req.currentUser.id; // Assuming you're using something like JWT middleware

      const newTank = new WaterTank({
          userId,
          nameTank,
          amountTank,
          maxTank,
          minTank
      });

      const savedTank = await newTank.save();
      res.status(201).json(savedTank);
  } catch (error) {
      console.error('Error creating water tank:', error);
      res.status(500).json({ message: 'Server error while creating tank' });
  }
};


// Fetch water tank by ID

const fetchWaterTank = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const waterTanks = await WaterTank.find({ userId }); // Corrected this line

    if (!waterTanks || waterTanks.length === 0) {
      const error = logger.create('Water Tank not found', 404, handleStatus.ERROR);
      return next(error);
    }

    res.status(200).json({
      message: "Fetched Water Tanks successfully",
      data: waterTanks
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Edit an existing water tank

const editWaterTank = async (req, res, next) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    // ✅ Validate the input data
    if (updates.amountTank !== undefined && updates.amountTank < 0) {
      const error = logger.create('AmountTank must be a positive number', 400, handleStatus.ERROR);
      return next(error);
    }
    if (updates.maxTank !== undefined && updates.maxTank < 0) {
      const error = logger.create('MaxTank must be a positive number', 400, handleStatus.ERROR);
      return next(error);
    }
    if (updates.minTank !== undefined && updates.minTank < 0) {
      const error = logger.create('MinTank must be a positive number', 400, handleStatus.ERROR);
      return next(error);
    }

    // ✅ Update the water tank
    const updatedWaterTank = await WaterTank.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedWaterTank) {
      const error = logger.create('Water Tank not found', 404, handleStatus.ERROR);
      return next(error);
    }

    res.status(200).json({
      message: 'Water tank updated successfully',
      waterTank: updatedWaterTank
    });
  } catch (err) {
    const error = logger.create('Failed to update water tank', 500, handleStatus.ERROR, err.message);
    return next(error);
  }
};

module.exports = {
  fetchWaterTank,
  editWaterTank,
  createWaterTank
};
