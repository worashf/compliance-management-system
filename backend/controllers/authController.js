const User  = require("../models/User");
const Employee = require("../models/Employee")
const  ErrorHandler =  require("../utils/errorHandler")
const catchAsyncError = require("../middlewares/catchAsyncError")

exports.signup  =  catchAsyncError(async(req,res, next)=>{
 const { 
   email,
   password,
   role,
   firstName,
   middleName, 
   lastName, 
   phoneNumber, 
   institutionId
  } = req.body;

  const employee  = await Employee.create({
    firstName,
    middleName,
    lastName,
    phoneNumber, 
    institution: institutionId
 })

 if (!employee) {
    return next( new ErrorHandler("Some thing went wrong, Employee does not created",401))
}
if(employee){
  const user  =  await User.create({
    email,
    password,
    role,
    employee: employee._id
  });
  if (!user) {
    return next( new ErrorHandler("Some thing went wrong, User does not created",401))
}

res.status(200).json({
   success: true, 
   user
})
}


})

exports.login  =  catchAsyncError(async(req,res, next)=>{
    const { email, password } = req.body
   // check if email and password entered by user
   if (!email || !password) {
     return next(new ErrorHandler("Please enter email & password",400))
   }
   // find user in database
   const user = await User.findOne({ email }).select("+password").populate({
    path: 'employee',
    populate: {
        path: 'institution',
        model: 'Institution'
    }
});
   if (!user) {
     return next(new ErrorHandler("Invalid Email or Password",401))
   }
  // checks if password is correct or not 
   const isPasswordMatched = await user.comparePassword(password)
   if (!isPasswordMatched) {
     return next(new ErrorHandler("Invalid email or password",401))
   }


   const token = user.JsonWebToken()
   const options = {
       expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000),
       httpOnly: true
   }
   res.status(200).cookie("token", token, options).json({
       success: true,
       token,
       user
    })

})

//get all users
exports.getAllUsers = catchAsyncError(async(req, res, next)=>{
  const users = await User.find({}).populate({path:"employee", select:["firstName","lastName"]});
  if (!users) {
      return  next(new ErrorHandler(`No users found`))
  }
  res.status(200).json({
      success: true, 
     data: users
 }) 
})
