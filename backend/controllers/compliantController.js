const Compliant  = require("../models/Compliant")
const  ErrorHandler =  require("../utils/errorHandler")
const catchAsyncError = require("../middlewares/catchAsyncError")

exports.createCompliant = catchAsyncError(async (req, res, next) => {
  const {
    employeeId,
    compliantCategory,
    compliantTitle,
    compliantDescription,
    compliantEventDate,
    compliantSourceInstitution,
     wantToBeDone,
    employeeInstitution
  } = req.body;

  console.log(req.body, "body");
  
  const attachmentDocuments = req.files.map(attachment => ({
    fileName: attachment.filename,
    fileType: attachment.mimetype,
  }));
 console.log(attachmentDocuments, "documents")
  try {
    const compliant = await Compliant.create({
      compliantTitle,
      compliantCategory,
      compliantDescription,
      compliantEventDate,
      compliantSourceInstitution,
      requesterEmployee: employeeId,
      wantToBeDone,
      compliantAttachment: attachmentDocuments,
    });

    if (!compliant) {
      throw new ErrorHandler("Something went wrong, Compliant was not created", 401);
    }

    res.json({
      success: true,
      compliant
    });
  } catch (error) {
    return next(error);
  }
});


//get all compliants
exports.getAllCompliants = catchAsyncError(async(req, res, next)=>{
  
  const employeeId = req.params.employeeId;
  if(!employeeId){
    res.status(400).json({
      success: true, 
     message: "employee id is required"
 }) 
 return ;
  }
  const compliants = await Compliant.find({requesterEmployee: employeeId}).populate({
    path: "compliantSourceInstitution"
  })
  .populate({
    path: "requesterEmployee"
  });
  if (!compliants) {
      return  next(new ErrorHandler(`No compliants found`))
  }
  res.status(200).json({
      success: true, 
     data: compliants
 }) 
})