const mongoose = require("mongoose")
const CompliantResponse  = require("../models/CompliantResponse")
const Compliant = require("../models/Compliant")
const  ErrorHandler =  require("../utils/errorHandler")
const catchAsyncError = require("../middlewares/catchAsyncError")

exports.createComplianceResponse = catchAsyncError(async (req, res, next) => {
    const {
        requesterId,
        investigatorId,
        complianceId,
        summaryAnswer,
        complianceInvestigated,
        investigationFindings,
        correctiveAction,
        noneValidExplanation,
    } = req.body;
  console.log(req.body, "req body comp response")
    const compliant = await Compliant.findOne({ _id: complianceId });
  
    if (!compliant) {
      return next(new ErrorHandler("Compliant not found", 404));
    }
  
    if (summaryAnswer == "ቅሬታው ትክክለኛ ነው") {
      compliant.status = "አግባብነት ያለው";
    } else if (summaryAnswer == "ቅሬታው ትክክለኛ አይደለም") {
      compliant.status = "አግባብነት የሌለው";
    }
  
    await compliant.save();
  
    try {
      const compliantResponse = await CompliantResponse.create({
        compliantRequester: requesterId,
        compliance: complianceId,
        complianceInvestigater: investigatorId,
        complianceInvestigated,
        investigationFindings: investigationFindings,
        summaryAnswer,
        correctiveAction,
        noneValidExplanation: noneValidExplanation,
      });
  
      if (!compliantResponse) {
        throw new ErrorHandler("Something went wrong, Compliance Response was not created", 401);
      }
  
      res.json({
        success: true,
        compliantResponse
      });
    } catch (error) {
      return next(error);
    }
  });
  

//get all compliant responses
exports.getAllCompliantResponses = catchAsyncError(async(req, res, next)=>{
  const query = {}

  const compliantResponses = await CompliantResponse.find({}).populate({
    path: "compliance"
  }).
  populate({path: "complianceInvestigater"})
  .populate({
    path: "compliantRequester"
  });
  if (!compliantResponses) {
      return  next(new ErrorHandler(`No compliant responses found`))
  }
  res.status(200).json({
      success: true, 
     data: compliantResponses
 }) 
})



exports.getSingleCompliantResponse = catchAsyncError(async (req, res, next) => {
  const { compliantId } = req.params;

  if (!compliantId) {
    return res.status(400).json({
      success: false,
      message: "Compliant ID is required",
    });
  }

  try {
    const compliantResponse = await CompliantResponse.findOne({ compliance: compliantId })
      .populate({ path: "compliantRequester" })
      .populate({ path: "compliance"}).
      populate({path: "complianceInvestigater"});

    if (!compliantResponse) {
      res.status(200).json({
        success: true,
        data: []
      });
      return ;
    }

   
    res.status(200).json({
      success: true,
      data: compliantResponse
    });
  } catch (error) {
    next(error);
  }
});


exports.getAllEmployeeCompliantsResponses = catchAsyncError(async(req, res, next)=>{
  const query = {}
  const employeeId = req.query.employeeId;
  if(employeeId){
    query.compliantRequester  =  employeeId
  }
  const compliantResponses = await CompliantResponse.find(query).populate({
    path: "compliance"
  }).
  populate({path: "complianceInvestigater"})
  .populate({
    path: "compliantRequester"
  });
  if (!compliantResponses) {
      return  next(new ErrorHandler(`No compliant responses found`))
  }
  res.status(200).json({
      success: true, 
     data: compliantResponses
 }) 
})