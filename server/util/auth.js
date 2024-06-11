const { verify, sign } = require("jsonwebtoken");

const isAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }
      req.userId = decoded.Id;
      next();
    });
  } else {
    return res.status(401).json({ message: "Not provided a token" });
  }
};

const generateToken = (Id, Emri, Mbiemri, Email, Roli, isRefresh) => {
  const token = sign(
    { Id, Emri, Mbiemri, Email, Roli },
    isRefresh ? process.env.JWT_REFRESH_TOKEN : process.env.JWT_SECRET_KEY,
    { expiresIn: isRefresh ? "1d" : "1h" }
  );
  return token;
};

const handleRefreshToken = async (req, res, next) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken)
    return res.status(401).json({ message: "No refresh token" });

  verify(refreshToken, process.env.JWT_REFRESH_TOKEN, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });

    const accessToken = generateToken(
      decoded.Id,
      decoded.Emri,
      decoded.Mbiemri,
      decoded.Email,
      decoded.Roli,
      false
    );
    res.status(200).json({ token: accessToken });
  });
};

const logoutAction = async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(204).json({ message: "No cookies" });
  res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
  return res.status(200).json({ message: "Logged out" });
};

module.exports = { isAuth, generateToken, handleRefreshToken, logoutAction };
