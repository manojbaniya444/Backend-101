const jwt = require("jsonwebtoken");

const TOKEN_SECRET = "secret";

const authenticate = (req, res, next) => {
  // get the token from the request cookie
  // console.log(req);
  // [
  //   'access-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE3MzYwOTc5MDR9.4gAGrED0CMA0p0ayEExySfdPedIVxGaHnoS7Id3PVE8',
  //   ' refresh=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE3MzYwOTc5MDR9.4gAGrED0CMA0p0ayEExySfdPedIVxGaHnoS7Id3PVE8',
  //   ' username=test'
  // ]
  const cookies = req.headers.cookie;
  if (!cookies) {
    return res.status(400).json({message: "Unauthorized no cookie given"})
  }
  const allCookies = cookies.split(";")

  console.log(allCookies)

  const tokenCookie = allCookies.find((cookie) => {
    return cookie.trim().startsWith("access-token=")
  })

  console.log(tokenCookie)
  if (!tokenCookie) {
    return res.status(400).json({message: "Unauthorized no access token provided."})
  }


  const accessToken = tokenCookie.split("=")[1]
  console.log(accessToken)

  if (!accessToken) {
    return res.status(400).json({message: "Unauthorized no access token"})
  }

  // verify the token
  jwt.verify(accessToken, TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send("Invalid token.");
    }
    console.log("Authorized user go")
    console.log(user)
    req.user = user;
    next();
  });
};

module.exports = { authenticate };
