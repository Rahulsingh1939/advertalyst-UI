const JWT = require("jsonwebtoken");
const userModel = require("../models/user");
const cities = ["London", "Mumbai", "Bangalore", "Paris"];

const verifyJWT = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_SECRET
    );
    const { uuid } = decode;
    const exisitingUser = await userModel.findOne({ uuid });
    if (exisitingUser) {
      req.user = decode;
    } else {
      await new userModel({
        uuid,
        city: cities,
      }).save();
    }
    next();
  } catch (error) {
    console.log(error);
    res.json({
      error: "Invalid JWT",
    });
  }
};

module.exports = verifyJWT;
