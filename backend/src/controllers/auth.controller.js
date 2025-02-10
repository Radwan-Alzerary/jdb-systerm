const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET || "thaerfaez777"; // Use env variable in production

exports.register = async (req, res) => {
  try {
    const { name, email, password, role, entityId } = req.body;
    // Check if admin exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) return res.status(400).json({ message: "Admin already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ name, email, password: hashedPassword, role, entityId });
    const savedAdmin = await admin.save();
    res.status(201).json({ message: "Admin created", admin: savedAdmin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Create JWT token
    const token = jwt.sign(
      { id: admin._id, role: admin.role, entityId: admin.entityId },
      secretKey,
      { expiresIn: '1d' }
    );
    res.json({ token, admin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
