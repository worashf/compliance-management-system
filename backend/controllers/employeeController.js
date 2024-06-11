const Employee  = require("../models/Employee")
const  ErrorHandler =  require("../utils/errorHandler")
const catchAsyncError = require("../middlewares/catchAsyncError")

// create new employee 

exports.saveEmployee =  catchAsyncError(async(req, res, next)=>{
     const {
        firstName, middleName, lastName, phoneNumber, jobPosition, institution 
     }  = req.body

     const employee  = await Employee.create({
        firstName,
        middleName,
        lastName,
        phoneNumber,
        jobPosition, 
        institution
     })

     if (!employee) {
        return next( new ErrorHandler("Some thing went wrong, Employee does not created",401))
   }
  

   res.status(200).json({
       success: true, 
       employee
   })
})

// update employee
exports.updateEmployee  = catchAsyncError(async(req, res, next)=>{
    const {id} = req.params
    const {firstName, lastName, middleName, jobPosition, institution} = req.body
    const employee  = await Employee.findOne({_id: id});
    if (!employee) {
        return next( new ErrorHandler("Some thing went wrong, Employee does not find employee",401))
   }
   employee.firstName =  firstName;
   employee.lastName =  lastName;
   employee.middleName = middleName;
   employee.jobPosition =  jobPosition;
   employee.institution = institution;
   await employee.save();
   res.status(200).json({
    success: true, 
    employee

})

})
// delete employee
exports.deleteEmployee = catchAsyncError(async(req, res, next)=>{
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found',
      });
    }
    await employee.remove();
    res.status(200).json({
      success: true,
      message: 'Employee deleted successfuly',
    });
})

//get all employees
exports.getAllEmployees = catchAsyncError(async(req, res, next)=>{
    const employees = await Employee.find({})
    if (!employees) {
        return  next(new ErrorHandler(`No employees found`))
    }
    res.status(200).json({
        success: true, 
        employees
   }) 
})
//get single employee
exports.getSingleEmployee = catchAsyncError(async(req, res, next)=>{
    const employee = await Employee.findById(req.params.id)
    if (!employee) {
        return  next(new ErrorHandler(`No employee found, employee not found  with this id: ${req.params.id}`))
    }
    res.status(200).json({
        success: true, 
        employee
   }) 
})
//search employee by institution
exports.getEmployeeByInstitution = catchAsyncError(async(req, res, next)=>{
    const employees = await Employee.find({institution: req.params.institutionId})
    if (!employees) {
        return  next(new ErrorHandler(`No employee found, employee not found  with this institution id: ${req.params.institutionId}`))
    }
    res.status(200).json({
        success: true, 
        employees
   })  
})


