const mongoose  = require("mongoose")
const compliantSchema  =  mongoose.Schema({
  title: {type: String, required: true},
  subject: {type: String,
    required: true,
    minlength: [200, 'Description is too short'],
    maxlength: [2000, 'Description is too long'],},
  requesterEmployee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true
  },
  
})
module.exports  = mongoose.model("Compliant", compliantSchema)