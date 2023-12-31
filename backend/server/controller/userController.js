const UserModel = require("../model/userSchema");
const AccountModel = require("../model/accountSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registration = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (user) {
      res.status(409).json({ error:true, success:false, message: "User already exists" });
    } else {
      const hashedPw = await bcrypt.hash(password, 12);
      const registerUser = new UserModel({
        name: name,
        email: email,
        password: hashedPw,
      });
      const user = await registerUser.save();
      let newAccount
      if(user){
        const account = new AccountModel({
          userId: user._id,
          accountId: user.email,
          balance: 0,
        })
        newAccount = await account.save();
      }
      if(user._id && newAccount._id){
        let token = jwt.sign(
          { _id: this._id, role: "user" },
          process.env.SECRET_KEY
        );
        res.cookie("jwtoken", token, {
          expiresIn: "1h",
          httpOnly: true,
        });
        let account = await AccountModel.findOne({accountId: email})
        res
        .status(201)
        .json({ error:false, success:true, message: "User registered successfully", token, user, account });
      }else{
        res
          .status(201)
          .json({ error:true, success:false, message: "User registration failed"});
      }
    }
  } catch (error) {
    res.status(500).json({error:true, success:false, message: error.message});
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        let token = jwt.sign(
          { _id: this._id, role: "user" },
          process.env.SECRET_KEY
        );
        res.cookie("jwtoken", token, {
          expiresIn: "1h",
          httpOnly: true,
        });
        let account = await AccountModel.findOne({accountId: email})
        res
          .status(200)
          .json({ error:false, success:true, message: "Logged in successfully", token, user, account});
      } else {
        res.status(401).json({ error:true, success:false, message: "Invalid login details" });
      }
    } else {
      res.status(401).json({ error:true, success:false, message: "Invalid login details" });
    }
  } catch (error) {
    res.status(500).json({error:true, success:false, message: error.message});
  }
};

module.exports = { registration, login };
