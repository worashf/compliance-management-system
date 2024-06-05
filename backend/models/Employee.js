const mongoose = require("mongoose")

const employeeSchema  =  mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please Enter your  first name'],
        maxLength: [30, 'Your name cannot bet exceed 30 characters'],
      },
      middleName:{
        type: String,
        required: [true, 'Please Enter your middle  name'],
      },
      lastName:{
        type: String,
        required: [true, 'Please Enter your last  name'],
      },
      jobPosition: {type: String},
      phone:{
        type: String,
        required: [true, 'Please enter your phone number'],
        },
        institution: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Institution",
            required: true,
        },
      createdAt: { type:Date, default:  Date.now},
})
module.exports = mongoose.model("Employee", employeeSchema)