const Address = require("../models/Address");

// GET all addresses
exports.getAddresses = async (req, res) => {
  const addresses = await Address.find({ user: req.user.id });
  res.json(addresses);
};

// ADD address
exports.addAddress = async (req, res) => {
  const address = await Address.create({
    ...req.body,
    user: req.user.id,
  });

  res.status(201).json(address);
};

// DELETE address
exports.deleteAddress = async (req, res) => {
  await Address.findByIdAndDelete(req.params.id);
  res.json({ message: "Address deleted" });
};

// SET DEFAULT
exports.setDefaultAddress = async (req, res) => {
  await Address.updateMany(
    { user: req.user.id },
    { isDefault: false }
  );

  const updated = await Address.findByIdAndUpdate(
    req.params.id,
    { isDefault: true },
    { new: true }
  );

  res.json(updated);
};