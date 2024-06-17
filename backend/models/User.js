const mongoose = require('mongoose');
const bcrpt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  phoneNumber:{
    type: String,
    required: [true, 'Please enter your phone number'],
    },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minLength: [6, 'Your password must be longer than 6 characters'],
    select: false,
  },
  role: {
    type: String,
    enum: ['COMPLIANT', 'COMPLIANCE_TEAM_LEADER', 'HEAD_OF_OFFICE', "ADMIN"],
    default: 'COMPLIANT' 
  },
  status:{ type : Boolean, default: true},
  employee:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required:  true
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

//Encrypting password before saving the user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  this.password = await bcrpt.hash(this.password, 10);
});

// compare user password
userSchema.methods.comparePassword = async function (
  enteredPassword
) {
  return await bcrpt.compare(enteredPassword, this.password)
}
userSchema.methods.JsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

//  Generate password reset token
userSchema.methods.getResetPasswordToken = function () {
  //generate token
  const resetToken = crypto.randomBytes(20).toString("hex");
  // encrypt  and set to resetPasswordToken
  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex") 
// set token expire time 
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;
   return resetToken
}
module.exports = mongoose.model('User', userSchema);