const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const UserModal = require("../models/UserModal");

const JoiValSchema = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().min(6).pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  name: Joi.string(),
});

const secret = process.env.JWT_SECRET;

const regsiterUser = async (req, res) => {
  const user = req.body;

  if (!user) return res.status(402);


  const saveUsertoDB = (email, hashPwd, name) => {
    var userToDB = {
      email,
      password: hashPwd,
      name,
    };

    const UserData = new UserModal(userToDB);

    UserData.save()
      .then(({ id, name }) => {
        const token = jwt.sign({ id: id }, secret, { expiresIn: '24h' });
        res.json({ token, name });
      })
      .catch((err) => {
        if (err.code === 11000)
          res.json({
            error_code: err.code,
            err: "This Account already taken.",
          });
      });
  };


  try {
    await JoiValSchema.validateAsync({
      email: user.email,
      password: user.password,
      name: user.name,
    });

    bcrypt.hash(user.password, 10, function (err, hash) {
      // Store hash in your password DB.
      if (err) return res.send("Error while hashing password", err);
      saveUsertoDB(user.email, hash, user.name);
    });
  } catch (err) {
    res.json({ err: err.details[0].message });
    res.end();
  }

};


const loginUser = async (req, res) => {


  try {
    if (!req.body || !req.body.email || !req.body.password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const { email, password } = req.body;

    const user = await UserModal.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const secret = process.env.JWT_SECRET || "panoca_secret";

    // Create token with email in the payload
    const token = jwt.sign({ id: user.id }, secret, { expiresIn: '24h' });

    const { name, email: userEmail, _id } = user;

    res.status(200).json({
      message: "Successfully logged in",
      token,
      user: {
        name,
        email: userEmail,
        _id
      },
    });
    console.log(token);

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { loginUser, regsiterUser }
