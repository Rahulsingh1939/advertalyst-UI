const jwt = require('jsonwebtoken');

const JWTController = (req, res) => {
  try {
    const { uuid } = req.body;
    if (!uuid) {
      return res.status(400).json({
        status: "Error",
        Message: "UUID is required",
      });
    }
    const token = jwt.sign({ uuid },  process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).send({
      status: "OK",
      Message: "JWT signed successfully",
      token:token
    });
  } catch (err) {
    res.status(500).json({
      status: "ERROR",
      Message: "Error Getting JWT",
    });
  }
};

module.exports = {JWTController};
