const mongoose  = require("mongoose")

const compliantSchema  =  mongoose.Schema({
   compliantTitle: {type: String, required: true,  
  },
   compliantDescription: {type: String,
    required: true,
   },
    compliantCategory: { type: String, required: true},
    compliantEventDate: {type:  Date,  required: true},
    wantToBeDone: {type:  String, required: true,
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
     fileUrl: { type: String, required: true },
    fileType: { type: String, required: true },
    }
  ],
  comlianceRecieptDate: {type: Date, default: Date.now},
  createdAt : {type: Date, default: Date.now},
  updatedAt : {type: Date, default: null}
  
})
module.exports  = mongoose.model("Compliant", compliantSchema)