import jwt from "jsonwebtoken";

export const authenticateAccessToken = (req, res, next) => {
  let authHeader = req.headers.authorization;
  let token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(400).json({
      status: 400,
      message: "토큰 포맷이 잘못 되었거나 토큰이 보내지지 않았습니다.",
    });
  }
  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      return res.status(403).json({
        status: 403,
        message: "토큰이 만료되었거나 토큰 인증 과정에서 오류가 발생했습니다.",
      });
    }
    req.user = user;
    next();
  });
};
