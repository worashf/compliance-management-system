const mongoose =  require("mongoose")

const  institutionSchema  =  mongoose.Schema({
    institutionCategory: {type:  String, default: ""},
    institutionName: {type:  String},
    email: {
        type: String,
      },
    phoneNumber:{
      type: String,
      },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
    }
})

module.exports = mongoose.model("Institution", institutionSchema);