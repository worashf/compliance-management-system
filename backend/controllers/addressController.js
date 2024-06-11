const Address  = require("../models/Address")
const  ErrorHandler =  require("../utils/errorHandler")
const catchAsyncError = require("../middlewares/catchAsyncError")

// create new address

exports.saveAddress =  catchAsyncError(async(req, res, next)=>{
     const {
        city, subcity, district, kebele
     }  = req.body

     const address  = await Address.create({
       city,
       subcity,
       district,
       kebele

     })

     if (!address) {
        return next( new ErrorHandler("Some thing went wrong, Address does not created",401))
   }

   res.status(200).json({
       success: true, 
       address
   })
})

// update 
exports.updateAddress  = catchAsyncError(async(req, res, next)=>{
    const {id} = req.params
    const {      
        city,
        subcity,
        district,
        kebele} = req.body
    const address  = await Employ.findOne({_id: id});
    if (!address) {
        return next( new ErrorHandler("Some thing went wrong, Address does not find address",401))
   }
   address.city =  city;
   address.subcity =  subcity;
   address.district = district;
   address.kebele =  kebele;
   await address.save();
   res.status(200).json({
    success: true, 
    address
})

})


//get all address
exports.getAllAddress = catchAsyncError(async(req, res, next)=>{
    const addresses = await Address.find({})
    if (!addresses) {
        return  next(new ErrorHandler(`No addresses found`))
    }
    res.status(200).json({
        success: true, 
        addresses
   }) 
})



