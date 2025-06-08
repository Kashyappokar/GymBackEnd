const User = require("../schema/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    let userData = new User(req.body);

    const salt = await bcrypt.genSalt();
    userData.password = await bcrypt.hash(userData.password, salt);
    const saveUserData = await User(userData).save();
    res.status(200).json(saveUserData);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getUserData = async (req, res) => {
  try {
    let userData = await User.find();

    res.status(200).send(userData);
  } catch (err) {
    res.status(500).send(err);
  }
};

const updateUserData = async (req, res) => {
  try {
    const userData = req.body;

    let userList = await User.findByIdAndUpdate(req.params.id, userData);

    const salt = await bcrypt.genSalt();
    userList.password = await bcrypt.hash(userList.password, salt);

    if (userList) {
      res.status(200).send(userList);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteUserData = async (req, res) => {
  try {
    const userData = req.body;

    let userList = await User.findByIdAndDelete(req.params.id, userData);
    if (userList) {
      res.status(200).send(userList);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const loginUser = async(req , res) =>{
    try{
      const{email , password} = req.body

      if(!email && !password){
        res.status(400).send("Email or Password entered doesn't match!")
      }
      
      let user =await User.findOne({email: email});

      if(user){
        if(bcrypt.compare(user.password , password)){
          const token = jwt.sign({_id: user?._id , email: user?.email},"kbk")

          user = {user ,token};

          res.status(200).send(user)
        }
      }
    }catch(err){
      res.status(400).json("something went wrong!")
    }
}
module.exports = { createUser, getUserData, updateUserData, deleteUserData, loginUser};
