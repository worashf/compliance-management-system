const mongoose  = require("mongoose")

const compliantSchema  =  mongoose.Schema({
   compliantTitle: {type: String, required: true,  
       minlength: [50, 'compliant title is too short'],
       maxlength: [100, 'compliant title is too long'],
  },
   compliantDescription: {type: String,
    required: true,
    minlength: [100, 'Description is too short'],maxlength: [1000, 'Description is too long'],},
    compliantCategory: { type: String, required: true},
    compliantEventDate: {type:  Date,  required: true},
    wantToBeDone: {type:  String, required: true,
      minlength: [100, 'what you want to be done is too short'],maxlength: [1000, 'what you want to be done is too long'],
    },
    compliantSourceInstitution: {    type: mongoose.Schema.Types.ObjectId,
      ref: "Institution",
      required: true,
    },
    requesterEmployee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true
  },
  status: {type:  String, enum: ['አዲስ', 'አግባብነት ያለው', 'አግባብነት የሌለው'],
    default: 'አዲስ'  },
  compliantAttachment: [
    { 
    fileName: { type: String, required: true },
    fileType: { type: String, required: true },
    }
  ]
  
})
module.exports  = mongoose.model("Compliant", compliantSchema)