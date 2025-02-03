const Position = require('../models/Position');

exports.createPosition = async (req, res) => {
  try {
    const position = new Position(req.body);
    const savedPosition = await position.save();
    res.status(201).json(savedPosition);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPositions = async (req, res) => {
  try {
    const positions = await Position.find();
    res.json(positions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPositionById = async (req, res) => {
  try {
    const position = await Position.findById(req.params.id);
    if (!position) return res.status(404).json({ message: 'Position not found' });
    res.json(position);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePosition = async (req, res) => {
  try {
    const updatedPosition = await Position.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPosition) return res.status(404).json({ message: 'Position not found' });
    res.json(updatedPosition);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePosition = async (req, res) => {
  try {
    const deletedPosition = await Position.findByIdAndDelete(req.params.id);
    if (!deletedPosition) return res.status(404).json({ message: 'Position not found' });
    res.json({ message: 'Position deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
