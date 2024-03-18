const JWT = require("jsonwebtoken");

const verifyJWT = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization.split(' ')[1],
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    res.json({
        error:"Invalid JWT"
    })
  }
};

module.exports = verifyJWT;
