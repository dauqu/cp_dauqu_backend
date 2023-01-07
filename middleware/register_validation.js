const Register_Models = require("../models/UserSignup");

// middleware for POST  validation

async function resiter_validation(req, res, next) {
  try {
    const { name, username, phone, address, email, password, country } =
      req.body;

    // checking all field is filled or not
    if (
      !name ||
      !username ||
      !phone ||
      !address ||
      !email ||
      !password ||
      !country
    )
      return res.status(400).json({
        message: "Please fill all fields",
        status: "warning",
      });

    // if username already exist
    const check_username = await Register_Models.findOne({ username });
    if (check_username)
      return res
        .status(400)
        .json({ message: "username is already exists", status: "warning" });

    // check username is less than 5 char
    if (username.length < 5)
      return res.status(400).json({
        message: "Please enter username of atleast 5 characters",
        status: "warning",
      });

    // check password is not null
    if (password == null)
      return res.status(400).json({
        message: "Please enter password",
        status: "warning",
      });

    // check password is less than 6 char
    if (password.length < 6)
      return res.status(400).json({
        message: "Please enter password of atleast 6 characters",
        status: "warning",
      });

    // check if email is already exists
    const check_email = await Register_Models.findOne({ email });
    if (check_email)
      return res
        .status(400)
        .json({ message: "email is already exists", status: "warning" });

    // check if phone is already exists
    const check_phone = await Register_Models.findOne({ phone });
    if (check_phone)
      return res
        .status(400)
        .json({ message: "phone is already exists", status: "warning" });

    // check phone is less than 10 char
    if (phone.length != 10)
      return res.status(400).json({
        message: "Please  enter valid phone number ",
        status: "warning",
      });
  } catch (error) {}
}

module.exports = resiter_validation;
