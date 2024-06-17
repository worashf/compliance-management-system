 const mongoose  = require("mongoose")

const compliantResponseSchema  = mongoose.Schema({
 compliantRequester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true
 },
 compliance: { type:  mongoose.Schema.Types.ObjectId,
     ref: "Compliant",
     required:  true
 },
 complianceInvestigated: {type: String, default: null},
 investigationFindings : {type:  String, default:  null},
 summaryAnswer: {type:  String, enum: ['ቅሬታው ትክክለኛ አይደለም', 'ቅሬታው ትክክለኛ ነው'] },
 correctiveAction: {type: String, default: null}, // for አግባብነት ያለው ቅሬታ
 noneValidExplanation: { type : String, default: null}, // for አግባብነት የሌለው 
 complianceInvestigater: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true
 },
 createdAt: {type: Date, default: Date.now},
 updatedAt: {type: Date, default: null}
})
module.exports   = mongoose.model("compliantResponse", compliantResponseSchema)