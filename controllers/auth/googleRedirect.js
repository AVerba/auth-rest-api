const queryString = require("query-string");
const axios = require("axios");
const { User } = require(`../../models/user`);

const jwt = require("jsonwebtoken");

const googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  const urlObj = new URL(fullUrl);
  const urlParams = queryString.parse(urlObj.search);
  const code = urlParams.code;
  const tokenData = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: "post",
    data: {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.BASE_URL}/api/auth/google-redirect`,
      grant_type: "authorization_code",
      code,
    },
  });
  const userData = await axios({
    url: "https://www.googleapis.com/oauth2/v2/userinfo",
    method: "get",
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });

  const email = userData.data.email;
  const user = await User.findOne({ email });

  if (user) {
    const { SECRET_KEY } = process.env;
    const { _id } = user;
    const payload = {
      _id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "12h" });
    await User.findByIdAndUpdate(user._id, { token });

    return res.redirect(`${process.env.FRONTEND_URL}/google-redirect/?token=${token}`);
  }
  const newUser = await User.create({ email });

  const { SECRET_KEY } = process.env;
  const { _id } = newUser;
  const payload = {
    _id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "12h" });
  await User.findByIdAndUpdate(_id, { token });

  return res.redirect(
    `${process.env.FRONTEND_URL}/google-redirect/?token=${token}`
  );
};

module.exports = googleRedirect;
