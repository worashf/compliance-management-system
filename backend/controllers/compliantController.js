const mongoose = require("mongoose")
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const Compliant  = require("../models/Compliant")
const  ErrorHandler =  require("../utils/errorHandler")
const catchAsyncError = require("../middlewares/catchAsyncError");


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

  const images = req.files;
  console.log(images, "uploaded files");

  let attachmentDocuments = [];

  const uploadToCloudinary = (fileBuffer) => {
      return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream((error, result) => {
              if (error) {
                  return reject(error);
              }
              resolve(result);
          });

          streamifier.createReadStream(fileBuffer).pipe(stream);
      });
  };

  for (let i = 0; i < images.length; i++) {
      const result = await uploadToCloudinary(images[i].buffer);
      attachmentDocuments.push({
          fileUrl: result.secure_url,
          fileType: images[i].mimetype,
      });
  }

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
   let query  ={}
  const employeeId = req.query.employeeId;
  if(employeeId){
    query.requesterEmployee  =  employeeId
  }

  const compliants = await Compliant.find(query).populate({
    path: "compliantSourceInstitution"
  })
  .populate({
    path: "requesterEmployee"
  }).sort({_id: -1})
  if (!compliants) {
      return  next(new ErrorHandler(`No compliants found`))
  }
  res.status(200).json({
      success: true, 
     data: compliants
 }) 
})


//get all  InValid compliants
exports.getAllInValidCompliants = catchAsyncError(async(req, res, next)=>{
  let query  ={}
 const status = "አግባብነት የሌለው";
 if(status){
   query.status  =  status
 }

 const compliants = await Compliant.find(query).populate({
   path: "compliantSourceInstitution"
 })
 .populate({
   path: "requesterEmployee"
 }).sort({_id: -1})
 if (!compliants) {
     return  next(new ErrorHandler(`No compliants found`))
 }
 res.status(200).json({
     success: true, 
    data: compliants
}) 
})


//get all Valid compliants
exports.getValidAllCompliants = catchAsyncError(async(req, res, next)=>{
  let query  ={}
 const status = req.query.employeeId;

   query.status =  "አግባብነት ያለው"
 

 const compliants = await Compliant.find(query).populate({
   path: "compliantSourceInstitution"
 })
 .populate({
   path: "requesterEmployee"
 }).sort({_id: -1})
 if (!compliants) {
     return  next(new ErrorHandler(`No compliants found`))
 }
 res.status(200).json({
     success: true, 
    data: compliants
}) 
})



exports.getSingleCompliant = catchAsyncError(async (req, res, next) => {
  const { compliantId } = req.params;

  if (!compliantId) {
    return res.status(400).json({
      success: false,
      message: "Compliant ID is required",
    });
  }

  try {
    const compliant = await Compliant.findOne({ _id: compliantId })
      .populate({ path: "compliantSourceInstitution" })
      .populate({ path: "requesterEmployee" , populate: { path: "institution" }});

    if (!compliant) {
      return next(new ErrorHandler(`No compliant found with ID: ${compliantId}`));
    }

    // Ensure compliantAttachment is an array before mapping
    if (compliant.compliantAttachment?.length > 0) {
      compliant.compliantAttachment = compliant.compliantAttachment.map(attachment => 
        `${process.env.APP_URL}attachments/${attachment.fileUrl}`
      );
    } else {
      compliant.compliantAttachment = [];
    }
 console.log(compliant, "compliant")
    res.status(200).json({
      success: true,
      data: compliant,
    });
  } catch (error) {
    next(error);
  }
});
