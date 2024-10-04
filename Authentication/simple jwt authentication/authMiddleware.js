const jwt = require("jsonwebtoken");

const TOKEN_SECRET = "secret";

const authenticate = (req, res, next) => {
  // get the token from the request cookie
  // console.log(req);
  // cookie: 'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluMiIsImlhdCI6MTcyODA2NTI2OH0.DrP7IJuFEiS9_izU_ARpt8ifzZDbPf2zgDWBKHJReBw; username=admin2'
  const cookies = req.headers.cookie;
  const tokenCookie = cookies.split(";")[0];
  const token = tokenCookie.split("=")[1];
  if (!token) {
    return res
      .status(401)
      .send("Access denied. No token present in the cookie.");
  }

  // verify the token
  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send("Invalid token.");
    }
    req.user = user;
    next();
  });
};

module.exports = { authenticate };
