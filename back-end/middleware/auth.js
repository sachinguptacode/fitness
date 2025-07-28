import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  console.log(token);
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }
  try {
    const verifyToken = jwt.verify(token, process.env.RefreshToken);
    if (!verifyToken) {
      res.status(501).json({ message: "varify token not valid" });
    }
    next();
  } catch (error) {
    res.status(404).json({ message: "Invalid token.", error: error });
  }
};

export { userAuth };
