const { body } = require("express-validator");

exports.createUserValidator = [
  body("name")
    .trim()
    .notEmpty().withMessage("Name is required")
    .isLength({ min: 2 }).withMessage("Name must be at least 2 characters")
    .matches(/^[A-Za-z ]+$/).withMessage("Name can contain only letters and spaces"),

  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format"),

  body("phoneNo")
    .trim()
    .notEmpty().withMessage("Phone number is required")
    .matches(/^\d{10}$/).withMessage("Phone number must be 10 digits"),

  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),

  body("dob")
    .notEmpty().withMessage("Date of birth is required")
    .matches(/^\d{2}-\d{2}-\d{4}$/).withMessage("DOB must be in DD-MM-YYYY format"),
];