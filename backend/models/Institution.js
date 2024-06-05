const mongoose =  require("mongoose")

const  institutionSchema  =  mongoose.Schema({
    name: {type:  String},
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
      },
    phone:{
      type: String,
      required: [true, 'Please enter your phone number'],
      },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
        required: true,
    }
})

module.exports =  module.model("Institution", institutionSchema)