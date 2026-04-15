const User = require("../models/User");

// GET profile
exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};

// UPDATE profile
exports.updateProfile = async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // update only allowed fields
  user.name   = req.body.name   || user.name;
  user.email  = req.body.email  || user.email;
  user.phone  = req.body.phone  || user.phone;
  user.gender = req.body.gender || user.gender;
  user.dob    = req.body.dob    || user.dob;
  user.bio    = req.body.bio    || user.bio;

  const updatedUser = await user.save(); // 🔥 important

  res.json(updatedUser);
};

exports.changePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // ✅ now works perfectly

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { currentPassword, newPassword } = req.body;

    let isMatch;

    if (user.password.startsWith("$2a$")) {
      isMatch = await bcrypt.compare(currentPassword, user.password);
    } else {
      isMatch = currentPassword === user.password;
    }

    user.password = newPassword; // pre-save hash will handle
    await user.save();

    res.json({ message: "Password updated successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};