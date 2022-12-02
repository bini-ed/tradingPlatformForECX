const { default: mongoose } = require("mongoose");

const roleSchema = mongoose.Schema({
  roleName: {
    type: String,
    required: true,
  },
});

const Role = mongoose.model("Role", roleSchema);

module.exports = Role;
