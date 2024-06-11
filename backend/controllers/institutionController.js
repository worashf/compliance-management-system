const Institution  = require("../models/Institution")
const  ErrorHandler =  require("../utils/errorHandler")
const catchAsyncError = require("../middlewares/catchAsyncError")

// create new employee 

exports.saveInstitution =  catchAsyncError(async(req, res, next)=>{
     const {
      institutionName, institutionCategory, email, phoneNumber, addressId
     }  = req.body

     const institution  = await Institution.create({
      institutionName, institutionCategory, email, phoneNumber, address: addressId
     })

     if (!institution) {
        return next( new ErrorHandler("Some thing went wrong, Institution does not created",401))
   }

   res.status(200).json({
       success: true, 
       institution
   })
})

// update employee
exports.updateInstitution = catchAsyncError(async(req, res, next)=>{
    const {addressId} = req.params
    const {name,email, phoneNumber} = req.body
    const institution  = await Institution.findOne({_id: addressId});
    if (!institution) {
        return next( new ErrorHandler("Some thing went wrong, Instituion does not find institution",401))
   }
    institution.name =  name;
    institution.email =  email;
    institution.phoneNumber = phoneNumber;
    institution.address =  addressId
   await institution.save();
   res.status(200).json({
    success: true, 
    institution

})

})
// delete institution
exports.deleteInstitution = catchAsyncError(async(req, res, next)=>{
    const institution = await Institution.findById(req.params.institutionId);
    if (!institution) {
      return res.status(404).json({
        success: false,
        message: 'Institution not found',
      });
    }
    await institution.remove();
    res.status(200).json({
      success: true,
      message: 'Institution deleted successfuly',
    });
})

//get all employees
exports.getAllInstitutions = catchAsyncError(async(req, res, next)=>{
    const institutions = await Institution.find({}).select("  institutionName   institutionCategory")
    if (!institutions) {
        return  next(new ErrorHandler(`No institutions found`))
    }
    res.status(200).json({
        success: true, 
       data: institutions
   }) 
})



