const mongoose   = require("mongoose")

const addressSchema  = mongoose.Schema({
    city: {type: String, default: "አዲስ አበባ"},
    subcity: {type: String, default: "ልደታ ክ/ተከማ"},
    district: {type: String, default: ""},
    createdAt: {type:  Date, default: Date.now},
    updatedAt: {type : Date, default:  Date.now}
})
module.exports =  module.model("Address", addressSchema)